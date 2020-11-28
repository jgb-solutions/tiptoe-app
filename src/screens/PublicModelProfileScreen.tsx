import React, { useState } from 'react'
import {
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ViewStyle
} from 'react-native'
import {
  Container,
  Header,
  Icon,
  Left,
  Right,
  Thumbnail,
  Text,
  View,
  Spinner,
} from 'native-base'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import { colors } from '../utils/colors'
import PhotoInterface from '../interfaces/PhotoInterface'
import usePhotos from '../hooks/usePhotos'
import useModel from '../hooks/useModel'
import ModelInterface from '../interfaces/ModelInterface'

type StatsProps = {
  number: string
  title: string
}

const Stats = ({ number, title }: StatsProps) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontWeight: 'bold' }}>{number}</Text>
    <Text>{title}</Text>
  </View>
)

type ButtonProps = {
  style?: ViewStyle
  children: React.ReactNode
  onPress?: () => void
  transparent?: boolean
}

const Button = ({ children, style, onPress, transparent }: ButtonProps) => (
  <TouchableOpacity style={[{
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: transparent ? 'transparent' : undefined,
    ...style
  }]}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
)

type RouteParamsProps = RouteProp<{
  params: {
    hash: string
  }
}, 'params'>

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function PublicModelProfileScreen() {
  const navigation = useNavigation()
  const route = useRoute<RouteParamsProps>()
  const modelHash = route.params.hash
  const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
  const { data: modelData, loading: modelLoading, error: modelError } = useModel(modelHash)
  const {
    loading: photosLoading,
    error: photosError, data: photosData,
    loadMorePhotos, hasMorePhotos
  } = usePhotos(modelHash)
  const [model, setModel] = useState<ModelInterface | undefined>()

  React.useEffect(() => {
    if (modelData) {
      setModel(modelData.model)
    }
  }, [modelData])

  const goBack = () => {
    navigation.goBack()
  }

  const goToPhoto = (photo: PhotoInterface) => {
    // TO DO
    // navigation.navigate(index)
    alert(photo)
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
          }}>{model?.stageName}</Text>
        </Left>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={() => alert('pressed more')}>
            <Icon name='more' style={{ color: colors.white }} />
          </Button>
        </Right>
      </Header>

      {modelLoading || photosLoading ? (
        <Spinner color={colors.pink} />
      ) : modelError || photosError ? (
        <Text>An error occurred</Text>
      ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <>
                  {
                    modelLoading ? (
                      <Spinner color={colors.pink} />
                    ) : modelError ? (
                      <Text>An error occurred</Text>
                    ) : (
                          <View style={{ padding: 12, }}>
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: "center",
                              marginBottom: 8
                            }}>
                              <Thumbnail
                                large
                                source={{ uri: modelData.model.posterUrl }}
                                style={{}}
                              />

                              <View style={{
                                flex: 1,
                                marginLeft: 48,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                alignItems: "center"
                              }}>
                                <Stats title="Posts" number="1,098" />
                                <Stats title="Followers" number="2.1M" />
                                <Stats title="Following" number="130" />
                              </View>
                            </View>

                            <View style={{ marginBottom: 24 }}>
                              <Text>{modelData.model.stageName}</Text>
                              <Text>{modelData.model.bio}</Text>
                              {/* <Text>Followed by <Text>joerckman</Text>, {' '}
                                <Text>mc_chris_haiti509</Text> {' '} and <Text>2 others</Text>
                              </Text> */}
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
                              <Button style={{
                                flex: 1,
                                backgroundColor: colors.pink
                              }}>
                                <Text style={{ color: colors.white }}>Follow</Text>
                              </Button>
                              <Button style={{
                                flex: 1,
                                backgroundColor: colors.white,
                                borderWidth: 1,
                                borderColor: colors.pink,
                                marginLeft: 4
                              }}>
                                <Text style={{ color: colors.black }}>Message</Text>
                              </Button>
                              <Button style={{
                                marginLeft: 4,
                                borderColor: colors.pink,
                                borderWidth: 1,
                              }}>
                                <Icon name="arrow-down" />
                              </Button>
                            </View>
                          </View>
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
              data={photosData.photos.data}
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
              )} />
          )}

    </Container >
  )
}