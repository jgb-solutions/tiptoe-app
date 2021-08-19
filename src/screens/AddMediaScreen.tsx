import { Video } from "expo-av"
import * as MediaLibrary from "expo-media-library"
import React, { useState, useEffect } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Icon,
  Left,
  Right,
  View,
} from "native-base"
import { Image, StyleSheet, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { screenNames } from "../utils/screens"
import { colors } from "../utils/colors"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants"

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 5
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  )
}

export type UserFormRouteParamsProps = RouteProp<
  {
    params: {
      asset: MediaLibrary.Asset
      caption?: string
      category_id?: string
      details: string
    }
  },
  "params"
>

export default function AddMediaScreen() {
  const navigation = useNavigation()
  const route = useRoute<UserFormRouteParamsProps>()

  const [assetSelected, setAssetSelected] = useState<MediaLibrary.Asset>()
  const [allMediaAssets, setAllMediaAssets] = useState<MediaLibrary.Asset[]>([])
  const [loaded, setLoaded] = useState(false)

  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  useEffect(() => {
    const askPermission = async () => {
      const isCameraRolleEnable = await MediaLibrary.requestPermissionsAsync()

      if (isCameraRolleEnable.granted) {
        setLoaded(true)
        return
      }

      const { granted } = await MediaLibrary.requestPermissionsAsync()
      if (granted) {
        MediaLibrary.getAssetsAsync({
          sortBy: [[MediaLibrary.SortBy.default, true]],
        })
        setLoaded(true)
      }
    }
    askPermission()
  }, [loaded])

  useEffect(() => {
    fetchAllPhotosFromLibrary()
  }, [])

  const fetchAllPhotosFromLibrary = async (amount = 20) => {
    const allMedia = await MediaLibrary.getAssetsAsync({
      first: amount,
      sortBy: ["creationTime"],
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
    })

    setAssetSelected(allMedia.assets[0])
    setAllMediaAssets(allMedia.assets)
  }

  // useEffect(() => {
  //   if (route.params?.caption !== "" || route.params?.category_id !== "") {
  //     setAssetSelected(route.params?.asset)
  //   }
  // }, [route.params])

  const nextStep = () => {
    if (assetSelected?.mediaType === "video" && assetSelected?.duration > 300) {
      alert("The video duration must less than or equal to 5 minutes")
    } else {
      navigation.navigate(screenNames.AddMediaStep2, {
        asset: assetSelected,
      })
    }
  }

  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}
      >
        <Left style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
              fontSize: 18,
            }}
          >
            New Post
          </Text>
        </Left>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity onPress={nextStep}>
            <Icon name="arrow-forward" style={{ color: colors.white }} />
          </TouchableOpacity>
        </Right>
      </Header>
      <Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: SCREEN_WIDTH,
          }}
        >
          <View style={styles.assetSelectedBox}>
            {assetSelected?.mediaType === "photo" ? (
              <Image
                style={styles.assetSelected}
                source={{ uri: assetSelected.uri }}
              />
            ) : (
              <Video
                ref={video}
                style={styles.assetSelected}
                source={{
                  uri: `${assetSelected?.uri}`,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            )}
          </View>
        </View>
        <View>
          <ScrollView
            style={styles.imageBox}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                fetchAllPhotosFromLibrary(allMediaAssets.length + 10)
              }
            }}
            scrollEventThrottle={400}
          >
            <View style={styles.imageWrapper}>
              {allMediaAssets?.map((asset) => (
                <TouchableOpacity
                  key={asset.id}
                  onPress={() => setAssetSelected(asset)}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: asset.uri,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  displayNone: {
    opacity: 0,
    height: 0,
    flex: 0,
  },
  assetSelectedBox: {
    height: SCREEN_HEIGHT / 2.3,
    width: "70%",
    padding: 2,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  assetSelected: {
    height: "100%",
    width: "100%",
  },
  imageBox: {
    height: 315,
  },
  imageWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    height: SCREEN_WIDTH / 3,
    width: SCREEN_WIDTH / 3,
    borderWidth: 0.5,
    borderColor: "#262626",
  },
})
