import React, { useState } from 'react'
import {
  Image,
  FlatList,
  Dimensions,
  ViewStyle,
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
import { useRoute } from '@react-navigation/native'
import { RouteProp, useNavigation, useScrollToTop } from '@react-navigation/native'

import { colors } from '../utils/colors'
import useModel from '../hooks/useModel'
import usePhotos from '../hooks/usePhotos'
import { formatToUnits } from '../utils/formatNumber'
import PhotoInterface from '../interfaces/PhotoInterface'
import ModelInterface from '../interfaces/ModelInterface'
import { screenNames } from '../utils/screens'
import PhotoCard from '../components/PhotoCard'

type RouteParamsProps = RouteProp<{
  params: {
    photo: PhotoInterface
  }
}, 'params'>

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function PhotoScreen() {
  const navigation = useNavigation()
  const route = useRoute<RouteParamsProps>()
  const { photo } = route.params
  const ref = React.useRef(null)
  const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
  const {
    loading: photosLoading,
    error: photosError, data: photosData,
    loadMorePhotos, hasMorePhotos
  } = usePhotos()

  const goBack = () => {
    navigation.goBack()
  }

  const goToPhoto = (photo: PhotoInterface) => {
    navigation.navigate(screenNames.PhotoScreen, {
      photo
    })
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
          }}>{photo.model.stageName}</Text>
        </Left>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={() => alert('pressed more')}>
            <Icon name='more' style={{ color: colors.white }} />
          </Button>
        </Right>
      </Header>

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <PhotoCard photo={photo} />
            <View style={{
              marginTop: 24,
              paddingLeft: 12,
              paddingBottom: 8
            }}>
              <Text style={{
                fontSize: 18,
                textTransform: 'uppercase',
                color: colors.blackB
              }}>You might also like</Text>
            </View>
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
        data={photosData?.photos?.data}
        keyExtractor={(photo) => photo.hash}
        renderItem={({ item: photo }: { item: PhotoInterface }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.pink
            }}
            onPress={() => goToPhoto(photo)}
          >
            <Image
              source={{ uri: photo.url }}
              style={{
                width: thumbWidth / 3,
                height: thumbWidth / 3
              }}
              resizeMode='cover' />
          </TouchableOpacity>
        )} />
    </Container >
  )
}