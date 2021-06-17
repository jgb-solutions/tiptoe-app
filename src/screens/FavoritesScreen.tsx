import React, { useEffect, useState } from 'react'
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
  Button
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'

import { colors } from '../utils/colors'
import PhotoInterface from '../interfaces/PhotoInterface'
import PhotoCard from '../components/PhotoCard'
import useFavoritePhotos from '../hooks/useFavoritePhotos'
import { PHOTO_UPDATES_SUBSCRIPTION } from '../graphql/subscriptions'
import { SUBSCRIPTION_TOPICS } from '../utils/constants'

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
    refetch,
    subscribeToMore
  } = useFavoritePhotos(3)
  const [currentPhoto, setCurrentPhoto] = useState<PhotoInterface | null>()

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: PHOTO_UPDATES_SUBSCRIPTION,
      variables: { topic: SUBSCRIPTION_TOPICS.PHOTO_UNLIKED },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev 

        const { favoritePhotos: { data, ...otherInfo } } = prev

        const unlikedPhoto: PhotoInterface = subscriptionData.data.photoUpdates

        const filteredData = data.filter((photo: PhotoInterface) => photo.id !== unlikedPhoto.id)

        setCurrentPhoto(null)

        return {
          favoritePhotos: {
            ...otherInfo,
            data: filteredData
          }
        }
      }
    })

    return () => unsubscribe()
  }, [])


  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      refetch()
    })

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setCurrentPhoto(null)
    })

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation])

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
                  <Text>You have no favorite photos yet.</Text>
                </View>
              )}
              data={data.favoritePhoto}
              keyExtractor={(photo) => photo.id} 
              renderItem={({ item: photo }: { item: PhotoInterface }) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.pink
                  }}  
                  onPress={() => goToPhoto(photo)}>
                  <Image
                    source={{ uri: photo.uri }}
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