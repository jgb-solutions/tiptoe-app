import React, { useEffect } from "react"
import { Text, Spinner } from "native-base"
import { View, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Local imports
import { colors } from "../utils/colors"
import usePhotos from "../hooks/usePhotos"
import Page from "../components/layouts/Page"
import useHomeData from "../hooks/useHomeData"
import { screenNames } from "../utils/screens"
import MediaCard from "../components/MediaCard"
import useStore, { AppStateInterface } from "../store"
import PhotoInterface from "../interfaces/PhotoInterface"
import ModelInterface from "../interfaces/ModelInterface"
import NegativeResponse from "../components/NegativeResponse"
import useGetPublishableKey from "../hooks/useGetPublishableKey"
import ThumbnailScrollList from "../components/ThumbnailScrollList"

export default function HomeScreen() {
  const navigation = useNavigation()
  const { publishableKey: key, setupStripeKey } = useStore(
    (state: AppStateInterface) => ({
      setupStripeKey: state.setupStripeKey,
      publishableKey: state.publishableKey,
    })
  )

  const { publichableKey } = useGetPublishableKey()

  const { homeData, homeError, homeLoading, homeRefetch } = useHomeData()
  const {
    photosLoading,
    photosError,
    photoData,
    loadMorePhotos,
    refetchPhotos,
    subscribeToMorePhotos,
  } = usePhotos()

  // useEffect(() => {
  //   unsubscribe()
  // }, [])

  useEffect(() => {
    if (publichableKey?.getPublishableKey?.key && !key) {
      setupStripeKey(publichableKey?.getPublishableKey?.key)
    }
  }, [publichableKey, key])

  useEffect(() => {
    // navigation.addListener("focus", () => {
    //   homeRefetch()
    // })
  }, [navigation])

  return (
    <Page noLeft rightStyle={{ flex: 0 }} noContent>
      {homeLoading || photosLoading ? (
        <Spinner color={colors.pink} />
      ) : homeError || photosError ? (
        <NegativeResponse>
          <Text>An error occurred</Text>
        </NegativeResponse>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <ThumbnailScrollList
                thumbnails={homeData?.modeles?.data?.map(
                  (model: ModelInterface) => ({
                    title: model.stage_name,
                    hash: model.hash,
                    imageUrl: model.poster,
                  })
                )}
                onPress={(hash) => {
                  navigation.navigate(screenNames.PublicModelProfileScreen, {
                    hash: `${hash}`,
                  })
                }}
              />
              {photoData.photos.data.filter(
                (photo: any) =>
                  (photo.for_my_modele || photo.is_for_me) && photo
              ).length === 0 && (
                <View
                  style={{
                    margin: 10,
                    borderTopColor: colors.blackOpact,
                    borderTopWidth: 0.17,
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    Your timeline is empty! You should start following some
                    models.
                  </Text>
                </View>
              )}
            </>
          }
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingTop: 12,
              }}
            >
              <Text>
                Your timeline is empty! You should start following some models.
              </Text>
            </View>
          )}
          data={photoData?.photos?.data}
          keyExtractor={(photo) => photo.id}
          renderItem={({ item: photo }: { item: PhotoInterface }) => (
            <View>
              {(photo.for_my_modele || photo.is_for_me) && (
                <MediaCard asset={photo} />
              )}
            </View>
          )}
          onRefresh={() => refetchPhotos}
          refreshing={photosLoading}
          // onEndReached={() => loadMorePhotos()}
          onEndReachedThreshold={0.9}
        />
      )}
    </Page>
  )
}
