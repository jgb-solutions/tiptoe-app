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
  Thumbnail
} from 'native-base'
import { useRoute } from '@react-navigation/native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'

import { colors } from '../utils/colors'
import useModel from '../hooks/useModel'
import usePhotos from '../hooks/usePhotos'
import { formatToUnits } from '../utils/formatNumber'
import PhotoInterface from '../interfaces/PhotoInterface'
import ModelInterface from '../interfaces/ModelInterface'
import RoomInterface from '../interfaces/RoomInterface'
import PhotoCard from '../components/PhotoCard'
import useToggleFollow from '../hooks/useToggleFollow'
import { screenNames } from '../utils/screens'
import ChatUserInterface from '../interfaces/ChatUserInterface'
import NegativeResponse from '../components/NegativeResponse'

type StatsProps = {
  number: number
  title: string
  style?: ViewStyle
}

const Stats = ({ number, title, style }: StatsProps) => (
  <View style={{ alignItems: 'center', ...style }}>
    <Text style={{ fontWeight: 'bold' }}>{number > 999 ? formatToUnits(number) : number}</Text>
    <Text>{title}</Text>
  </View>
)

type ButtonProps = {
  style?: ViewStyle
  children: React.ReactNode
  onPress?: () => void
  transparent?: boolean
  disable?: boolean
}

const Button = ({
  children, style, onPress, transparent, disable
}: ButtonProps) => {
  const handleOnPress = () => {
    if (disable) return

    onPress && onPress()
  }

  return (
    <TouchableOpacity style={[{
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      opacity: disable ? .70 : 1,
      backgroundColor: transparent ? 'transparent' : undefined,
      ...style
    }]}
      onPress={handleOnPress}>
      {children}
    </TouchableOpacity>
  )
}

type RouteParamsProps = RouteProp<{
  params: {
    hash: string
  }
}, 'params'>

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function PublicModelProfileScreen() {
  const navigation = useNavigation()
  const route = useRoute<RouteParamsProps>()
  const { toggleFollow, data: toggleFollowData, loading: toggleFollowLoading } = useToggleFollow()
  const modelHash = route.params.hash
  const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
  const {
    data: modelData,
    loading: modelLoading,
    error: modelError,
    refetch: refetchModel
  } = useModel(modelHash)
  const {
    loading: photosLoading,
    error: photosError, data: photosData,
    loadMorePhotos, hasMorePhotos,
    refetch
  } = usePhotos(modelHash)
  const [model, setModel] = useState<ModelInterface | undefined>()
  const [currentPhoto, setCurrentPhoto] = useState<PhotoInterface | null>()

  React.useEffect(() => {
    if (modelData) {
      setModel(modelData.model)
    }
  }, [modelData])

  React.useEffect(() => {
    if (toggleFollowData) {
      refetchModel()
    }
  }, [toggleFollowData])

  // React.useEffect(() => {
  //   if (roomdData) {
  //     goToChatScreen(room)
  //   }
  // }, [roomData])

  const handleToggleFollow = () => {
    // TO DO FOR PAYMENT CHECK
    // if (!false) {
    //   alert("you have to pay to be able to follow this model.")
    //   return
    // }

    toggleFollow({ modelId: modelData.model.id })
  }

  const handleFetchOrCreateChatRoom = () => {
    const room = modelData.model.roomWithMe
    if (room) {
      goToChatScreen({
        ...room,
        chatUser: makeChatUserFromModel(modelData.model)
      })
    } else {
      // time to create the room
      alert('time to create a new room son')
    }
  }

  const goToChatScreen = (room: RoomInterface) => {
    navigation.navigate(screenNames.Chat, {
      room, fromModelScreen: true
    })
  }

  const makeChatUserFromModel = (model: ModelInterface): ChatUserInterface => ({
    id: model.id,
    name: model.stageName,
    avatarUrl: model.posterUrl,
    type: "model",
    modelHash: model.hash
  })

  const goBack = () => navigation.goBack()

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
        <NegativeResponse>
          <Text>An error occurred</Text>
          <Button style={{
            borderWidth: 1,
            borderColor: colors.pink,
            marginTop: 12,
            padding: 12
          }} onPress={() => refetch()}><Text>Retry?</Text></Button>
        </NegativeResponse>
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
                                justifyContent: 'flex-end',
                                alignItems: "center"
                              }}>
                                <Stats
                                  title={`Post${modelData.model.photosCount !== 1 ? 's' : ''}`}
                                  number={modelData.model.photosCount}
                                />
                                <Stats
                                  style={{ marginLeft: 12 }}
                                  title={`Follower${modelData.model.followersCount !== 1 ? 's' : ''}`}
                                  number={modelData.model.followersCount}
                                />
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
                              }} onPress={handleToggleFollow} disable={toggleFollowLoading}>
                                <Text style={{ color: colors.white }}>{modelData.model.followedByMe ? 'Unfollow' : 'Follow'}</Text>
                              </Button>
                              <Button style={{
                                flex: 1,
                                backgroundColor: colors.white,
                                borderWidth: 1,
                                borderColor: colors.pink,
                                marginLeft: 4
                              }} onPress={handleFetchOrCreateChatRoom}>
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
                  {currentPhoto && (
                    <Modal
                      isVisible
                      useNativeDriver
                      onBackButtonPress={() => setCurrentPhoto(null)}
                      onBackdropPress={() => setCurrentPhoto(null)}
                    >
                      <View style={{ borderRadius: 15, overflow: 'hidden' }}>
                        <PhotoCard hideHeader photo={currentPhoto} />
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
              data={photosData.photos.data}
              keyExtractor={(photo) => photo.hash}
              onRefresh={refetch}
              refreshing={photosLoading}
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