import React, { useState } from 'react'
import {
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {
  Icon,
  Left,
  Text,
  View,
  Right,
  Header,
  Spinner,
  Container,
  Thumbnail,
  Button
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'

import { colors } from '../utils/colors'
import PhotoInterface from '../interfaces/PhotoInterface'
import PhotoCard from '../components/PhotoCard'
import useFavoritePhotos from '../hooks/useFavoritePhotos'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function PublicModelProfileScreen() {
  const navigation = useNavigation()
  const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
  const {
    loading,
    error,
    data,
    loadMorePhotos,
    hasMorePhotos,
    refetch
  } = useFavoritePhotos()
  const [currentPhoto, setCurrentPhoto] = useState<PhotoInterface | null>()

  const goBack = () => {
    navigation.goBack()
  }

  const goToPhoto = (photo: PhotoInterface) => {
    setCurrentPhoto(photo)
  }

  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}>
        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={goBack}>
            <Icon name='arrow-back' style={{ color: colors.white }} />
          </Button>

          <Text style={{
            fontWeight: 'bold', color: colors.white
          }}>Your Favorites</Text>
        </Left>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={() => alert('pressed more')}>
            <Icon name='more' style={{ color: colors.white }} />
          </Button>
        </Right>
      </Header>

      {loading ? (
        <Spinner color={colors.pink} />
      ) : error ? (
        <Text>An error occurred</Text>
      ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <>
                  {currentPhoto && (
                    <Modal
                      isVisible
                      useNativeDriver
                      onBackButtonPress={() => setCurrentPhoto(null)}
                      onBackdropPress={() => setCurrentPhoto(null)}
                    >
                      <View style={{ borderRadius: 15, overflow: 'hidden' }}>
                        <PhotoCard photo={currentPhoto} />
                      </View>
                    </Modal>
                  )}
                </>

              )}
              numColumns={3}
              onLayout={event => setThumbWidth(event.nativeEvent.layout.width)}
              ListEmptyComponent={() => (
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingTop: 12
                }}>
                  <Text>That model has no photos yet.</Text>
                </View>
              )}
              data={data.favoritePhotos.data}
              keyExtractor={(photo) => photo.hash}
              renderItem={({ item: photo }: { item: PhotoInterface }) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.pink
                  }}
                  onPress={() => goToPhoto(photo)}>
                  <Image
                    source={{ uri: photo.url }}
                    style={{
                      width: thumbWidth / 3,
                      height: thumbWidth / 3
                    }}
                    resizeMode='cover' />
                </TouchableOpacity>
              )}
              onRefresh={refetch}
              refreshing={loading}
              onEndReached={loadMorePhotos}
              onEndReachedThreshold={0.9}
            />
          )}

    </Container >
  )
}