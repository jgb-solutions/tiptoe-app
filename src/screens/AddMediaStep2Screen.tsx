import { Image, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react"
import * as MediaLibrary from "expo-media-library"
import {
  Container,
  Header,
  Content,
  Text,
  Icon,
  Left,
  Right,
  View,
  Body,
  Item,
  Input,
} from "native-base"

import { screenNames } from "../utils/screens"
import { SCREEN_WIDTH } from "../utils/constants"
import useCategories from "../hooks/useCategories"
import SelectPicker from "react-native-form-select-picker"

import { colors } from "../utils/colors"
import { TouchableOpacity } from "react-native-gesture-handler"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useForm, Controller } from "react-hook-form"
import Textarea from "react-native-textarea"

export interface MediaInfo {
  category_id?: string
  caption?: string
}

type RouteParamsProps = RouteProp<
  {
    params: {
      media: {
        caption?: string
        category_id?: string
        asset: MediaLibrary.Asset
      }

      asset?: MediaLibrary.Asset
    }
  },
  "params"
>

export default function AddMediaStrep2Screen() {
  const navigation = useNavigation()
  const { categoriesData } = useCategories()
  const route = useRoute<RouteParamsProps>()
  const [asset, setAsset] = useState<MediaLibrary.Asset>()

  const { control, handleSubmit, formState, watch } = useForm<MediaInfo>({
    mode: "onBlur",
    defaultValues: {
      caption: route.params?.media?.caption,
      category_id: route.params?.media?.category_id,
    },
  })

  useEffect(() => {
    setAsset(route.params?.asset)
  }, [route])

  const onSubmit = (credentials: MediaInfo) => {
    ;(credentials.category_id = "1"),
      navigation.navigate(screenNames.AddMediaStep3, {
        media: { asset, ...credentials },
      })
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
                navigation.navigate(screenNames.Add, {
                  asset,
                  caption: watch("caption"),
                  category_id: watch("category_id"),
                })
              }
            >
              <Icon name="arrow-back" style={{ color: colors.white }} />
            </TouchableOpacity>
          </Text>
        </Left>
        <Body>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: colors.white }}
          >
            Media info
          </Text>
        </Body>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Icon name="arrow-forward" style={{ color: colors.white }} />
          </TouchableOpacity>
        </Right>
      </Header>
      <Content style={{ paddingTop: 10 }}>
        <Image
          source={{ uri: asset?.uri }}
          style={{
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_WIDTH * 0.9,
            alignSelf: "center",
          }}
        />

        {/* <Item style={[styles.items, { padding: 10 }]}>
          <View style={styles.inputContainer}>
            <Controller
              name="category_id"
              rules={{ required: "Please select a category" }}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <SelectPicker
                  onValueChange={onChange}
                  selected={value}
                  placeholder="Select a category"
                  placeholderStyle={{
                    fontSize: 18,
                    color: "#000",
                  }}
                >
                  {categoriesData?.categories.map(({ id, name }: any) => (
                    <SelectPicker.Item key={id} label={name} value={id} />
                  ))}
                </SelectPicker>
              )}
            />
          </View>
        </Item> */}

        <Item style={[styles.items, { padding: 10, height: 100 }]}>
          <View style={styles.inputContainer}>
            <Controller
              name="caption"
              rules={{ required: false }}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={(value: string) => onChange(value)}
                  defaultValue={value}
                  // maxLength={300}
                  placeholder={"Add your caption here"}
                  placeholderTextColor={"#c7c7c7"}
                  underlineColorAndroid={"transparent"}
                />
              )}
            />
          </View>
        </Item>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  inputContainer: {},
  items: {
    marginBottom: 15,
  },
  label: {
    color: colors.facebook,
    paddingLeft: 9,
  },
  textareaContainer: {
    height: 90,
    padding: 5,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 88,
    fontSize: 18,
    color: "#333",
  },
  hidden: {
    opacity: 0,
    height: 0,
    flex: 0,
  },
})
