import React, { FC } from "react"
import { Text, View, Spinner } from "native-base"
import { useNavigation } from "@react-navigation/native"

import { colors } from "../utils/colors"
import ModelInterface from "../interfaces/ModelInterface"
import { screenNames } from "../utils/screens"
import ThumbnailScrollList from "./ThumbnailScrollList"

const ModelCard: FC<{
  modelLoading: boolean
  modelList: ModelInterface[]
}> = ({ modelLoading, modelList }) => {
  const navigation = useNavigation()

  return (
    <View style={{ margin: 15, paddingTop: 15 }}>
      <View
        style={{
          marginBottom: 15,
          padding: 5,
          borderRadius: 5,
          maxWidth: 130,
          shadowColor: colors.pink,
          overflow: "hidden",
          shadowRadius: 10,
          shadowOpacity: 0.5,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: colors.pink,
            textAlign: "left",
            textDecorationColor: colors.pink,
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
          }}
        >
          My Models
        </Text>
      </View>

      {modelLoading ? (
        <Spinner color={colors.pink} />
      ) : (
        <ThumbnailScrollList
          thumbnails={modelList?.map((model: ModelInterface) => ({
            title: model.stage_name,
            hash: model.hash,
            imageUrl: model.poster,
          }))}
          onPress={(hash) => {
            navigation.navigate(screenNames.PublicModelProfileScreen, {
              hash: `${hash}`,
            })
          }}
        />
      )}
    </View>
  )
}

export default ModelCard
