import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import {
  Container,
  Header,
  Content,
  Text,
  Icon,
  Left,
  Right,
  Body,
} from "native-base"
import * as MediaLibrary from "expo-media-library"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { ProgressBar } from "react-native-paper"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import MediaCard from "../components/MediaCard"
import useStore, { AppStateInterface } from "../store"

import ModelInterface from "../interfaces/ModelInterface"
import useFileUpload from "../hooks/useFileUpload"
import useAddMedia from "../hooks/useAddMedia"

export interface AppMedia {
  caption: string
  category_id?: string
  asset: MediaLibrary.Asset
}

type RouteParamsProps = RouteProp<
  {
    params: {
      media: AppMedia
    }
  },
  "params"
>

export default function AddMediaStrep3Screen() {
  const navigation = useNavigation()
  const { currentUser } = useStore((state: AppStateInterface) => ({
    currentUser: state.authData.user,
  }))
  const {
    upload,
    uploading,
    isUploaded,
    percentUploaded,
    errorMessage,
    filename,
  } = useFileUpload({
    message: "There was a problem upload this media.",
  })

  useEffect(() => {
    console.log(uploading, isUploaded, percentUploaded, errorMessage, filename)
  }, [upload, uploading, isUploaded, percentUploaded, errorMessage, filename])

  const { addMedia, addMediaData, addMediaError, addMediaLoading } =
    useAddMedia()

  useEffect(() => {
    ;(async () => {
      if (isUploaded) {
        let payload = {
          caption: params?.media.caption,
          type: params?.media.asset.mediaType,
          category_id: parseInt(`${params?.media.category_id}`),
          modele_id: parseInt(`${currentUser?.modele?.id}`),
          publish: true,
          bucket: "null",
          uri: filename,
        }

        try {
          addMedia(payload)
        } catch (error) {
          console.error(JSON.stringify(error))
        }
      }
    })()
  }, [isUploaded])

  useEffect(() => {
    if (addMediaData) {
      navigation.navigate(screenNames.Home)
    }
  }, [addMediaData])

  const { params } = useRoute<RouteParamsProps>()
  const [media, setMedia] = useState<AppMedia>()
  const [assetSelected, setAssetSelected] = useState<{
    id: string
    type: string
    uri: string
    modele?: ModelInterface
    likes_count: number
    liked_by_me: boolean
    caption: string
  }>()

  useEffect(() => {
    assetSelected && setAssetSelected(assetSelected)
  }, [assetSelected])

  useEffect(() => {
    setMedia(params?.media)

    setAssetSelected({
      id: params.media.asset.id,
      type: params?.media?.asset.mediaType,
      uri: params?.media?.asset.uri,
      modele: currentUser?.modele,
      likes_count: 0,
      liked_by_me: false,
      caption: params?.media.caption,
    })
  }, [params])

  const publish = async () => {
    upload(params?.media.asset)
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
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screenNames.AddMediaStep2, {
                  media,
                })
              }
            >
              <Icon name="arrow-back" style={{ color: colors.white }} />
            </TouchableOpacity>
          </Text>
        </Left>
        <Body>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            New Post
          </Text>
        </Body>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity onPress={publish} disabled={uploading}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              {uploading ? "...Plaese wait" : "Publish"}
            </Text>
          </TouchableOpacity>
        </Right>
      </Header>
      <Content>
        <ProgressBar
          progress={percentUploaded}
          color={colors.logo}
          style={{ borderRadius: 20 }}
        />
        {assetSelected && <MediaCard asset={assetSelected as any} />}
      </Content>
    </Container>
  )
}
