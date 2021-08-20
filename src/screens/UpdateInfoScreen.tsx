import React, { useEffect, useState } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  View,
  Thumbnail,
  Input,
  Spinner,
} from "native-base"

import { ProgressBar } from "react-native-paper"

import RNPickerSelect from "react-native-picker-select"
import * as mime from "react-native-mime-types"
import Textarea from "react-native-textarea"
import { Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"

import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Image } from "react-native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import useStore, { AppStateInterface } from "../store"
import ModelInterface from "../interfaces/ModelInterface"

import Button from "../components/Button"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import useUpdateUser from "../hooks/useUpdateUser"
import UpdateUserInterface from "../interfaces/UpdateUserInterface"
import SelectPicker from "react-native-form-select-picker"
import UserInterface from "../interfaces/UserInterface"
import { DEFAULT_AVATAR, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants"
import useUpdatePicture from "../hooks/useUpdatePicture"
import useFileUpload from "../hooks/useFileUpload"

type Gender = "FEMALE" | "MALE" | "OTHER"

interface Credentials {
  active?: boolean
  admin?: boolean
  avatar?: string
  email?: string
  first_login: boolean
  id?: string
  modele?: ModelInterface
  modeles?: ModelInterface
  name?: string
  telephone?: string
  gender: string
}

export default function UpdateInfoScreen() {
  const navigation = useNavigation()

  const {
    updateAvatar,
    updatePoster,
    avatarData,
    avatarLoading,
    avatarRrror,
    posterData,
    posterLoading,
    posterRrror,
  } = useUpdatePicture()

  const {
    upload,
    uploading,
    isUploaded,
    percentUploaded,
    errorMessage,
    filename,
    fileUrl,
  } = useFileUpload({
    message: "There was a problem upload this media.",
  })

  const {
    updateUser,
    updateUserWithModel,
    data: updateUserData,
    dataUpdateWithModel,
  } = useUpdateUser()

  const { currentUser: userState, updateUserState } = useStore(
    (state: AppStateInterface) => ({
      currentUser: state.authData.user,
      updateUserState: state.updateUserState,
    })
  )

  const [modelPoster, setModelPoster] = useState(false)

  const [currentUser, setCurrentUser] = useState<UserInterface | undefined>(
    userState
  )

  useEffect(() => {
    console.log(userState)
    userState && setCurrentUser(userState)
  }, [userState])

  const { control, handleSubmit, watch } = useForm<UserInterface>({
    mode: "onBlur",
    defaultValues: currentUser,
  })

  const [avatar, setAvatar] = useState<any | null>()
  const [poster, setPoster] = useState<any | null>()

  const [allMediaAssets, setAllMediaAssets] = useState<MediaLibrary.Asset[]>([])
  const [loaded, setLoaded] = useState(false)

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

  const fetchAllPhotosFromLibrary = async (amount = 20) => {
    const allMedia = await MediaLibrary.getAssetsAsync({
      first: amount,
      sortBy: ["creationTime"],
      mediaType: [MediaLibrary.MediaType.photo],
    })
    setAllMediaAssets(allMedia.assets)
  }

  useEffect(() => {
    ;(async () => {
      if (isUploaded && filename && !modelPoster) {
        let payload = {
          avatar: filename,
        }
        try {
          updateAvatar(payload)
        } catch (error) {
          console.error(JSON.stringify(error))
        }
      } else if (isUploaded && filename && modelPoster) {
        let payload = {
          poster: filename,
        }
        try {
          updatePoster(payload)
        } catch (error) {
          console.error(JSON.stringify(error))
        }
      }
    })()
  }, [isUploaded])

  useEffect(() => {
    console.log(uploading, isUploaded, percentUploaded, errorMessage, filename)
  }, [upload, uploading, isUploaded, percentUploaded, errorMessage, filename])

  const fetchAllImages = async () => {
    fetchAllPhotosFromLibrary()
  }

  // useEffect(() => {
  //   if (currentUser && avatarData?.updateAvatar?.success) {
  //     const payload = {
  //       ...currentUser,
  //       avatar: filename,
  //     }
  //     //@ts-ignore
  //     updateUserState(payload)
  //   } else {
  //   }
  // }, [currentUser, filename, avatarData?.updateAvatar?.success])

  // useEffect(() => {
  //   if (currentUser && posterData?.updatePoster?.success) {
  //     const payload = {
  //       ...currentUser,
  //       modele: {
  //         ...currentUser.modele,
  //         poster: filename,
  //       },
  //     }
  //     //@ts-ignore
  //     updateUserState(payload)
  //   } else {
  //   }
  // }, [currentUser, filename, posterData?.updatePoster?.success])

  const pickPoster = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      upload(result.uri)
    }
  }

  const onSubmit = async (credentials: UpdateUserInterface) => {
    let payload
    if (!currentUser?.modele?.id) {
      payload = {
        id: currentUser?.id,
        ...credentials,
      }

      updateUser(payload, currentUser?.id)
    } else {
      payload = {
        id: currentUser?.id,
        ...credentials,
        modele: {
          update: {
            id: currentUser?.modele?.id,
            ...credentials.modele,
            poster: currentUser?.modele?.poster,
          },
        },
      }
      updateUserWithModel(payload, currentUser?.id)
    }

    console.log(payload)

    if (updateUserData || dataUpdateWithModel) {
      updateUserState(updateUserData || dataUpdateWithModel)
      alert("Your profile has been updated")
    }
  }

  useEffect(() => {
    if (currentUser?.first_login) {
      const payload: UpdateUserInterface = {
        id: currentUser?.id,
        first_login: false,
      }
      updateUser(payload, currentUser?.id)
    }

    if (updateUserData) {
      const payload = {
        ...currentUser,
        ...updateUserData.updateUser,
      }
      updateUserState(payload)
    }

    if (dataUpdateWithModel) {
      const payload = {
        ...currentUser,
        ...dataUpdateWithModel.updateUserWithModel,
      }
      updateUserState(payload)
    }
  }, [currentUser?.first_login, updateUserData, dataUpdateWithModel])

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
    })()
  }, [])

  let gender: { label: string; value: string }[] = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ]

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

  if (allMediaAssets.length > 0) {
    return (
      <View style={{ marginTop: 50 }}>
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
                onPress={() => [upload(asset), setAllMediaAssets([])]}
              >
                <Image
                  source={{
                    uri: asset.uri,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}
      >
        <Left style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            transparent
            onPress={() => navigation.navigate(screenNames.Setting)}
          >
            <Feather name="arrow-left" color={colors.white} size={24} />
          </Button>

          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Edit Profile
          </Text>
        </Left>
        <Right>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              <Entypo name="check" size={24} /> Save
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
        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <TouchableOpacity
              onPress={pickPoster}
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <Thumbnail
                large
                source={{
                  uri: !modelPoster
                    ? avatar
                      ? avatar
                      : currentUser?.avatar
                    : poster
                    ? poster
                    : currentUser?.modele?.poster
                    ? currentUser?.modele?.poster
                    : DEFAULT_AVATAR,
                }}
                style={{
                  opacity: 0.5,
                }}
              />

              {uploading ? (
                <Spinner color={colors.pink} style={{ position: "absolute" }} />
              ) : (
                <FontAwesome
                  name="pencil-square-o"
                  size={24}
                  color={colors.red}
                  style={{
                    //   position: "absolute",
                    marginTop: -30,
                  }}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                marginLeft: 20,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View>
                <Text>
                  {modelPoster ? (
                    <TouchableOpacity onPress={() => setModelPoster(false)}>
                      <Text>Show avatar</Text>
                    </TouchableOpacity>
                  ) : (
                    currentUser?.is_model && (
                      <TouchableOpacity onPress={() => setModelPoster(true)}>
                        <Text>Show model poster</Text>
                      </TouchableOpacity>
                    )
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 24,
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Feather
                name="phone"
                size={20}
                color={colors.pink}
                style={{
                  marginRight: 15,
                }}
              />
              <Text>
                {watch("telephone")
                  ? watch("telephone")
                  : currentUser?.telephone}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="mail"
                size={20}
                color={colors.pink}
                style={{
                  marginRight: 15,
                }}
              />
              <Text>{currentUser?.email}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.pink,
            justifyContent: "center",
            borderColor: colors.pink,
            borderWidth: 1,
            padding: 12,
            borderRadius: 0,
          }}
        >
          <Text style={{ color: colors.white }}>
            Edit your profile information
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.infos}>
            <Text style={styles.mediaText}>Name</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="name"
              rules={{ required: "The full name is required" }}
            />
          </View>

          <View style={styles.infos}>
            <Text style={styles.mediaText}>Gender</Text>
            <Controller
              name="gender"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RNPickerSelect
                  onValueChange={(e) => onChange(e)}
                  value={currentUser?.gender}
                  items={gender}
                  style={pickerSelectStyles}
                  placeholder={{
                    label: "Select your gender",
                    value: null,
                  }}
                />
              )}
            />
          </View>

          <View style={styles.infos}>
            <Text style={styles.mediaText}>Telephone</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="telephone"
            />
          </View>
        </View>

        {currentUser?.is_model && (
          <View style={styles.container}>
            <Text
              style={[
                styles.title,
                {
                  marginVertical: 20,
                },
              ]}
            >
              Model Information
            </Text>
            <View style={styles.infos}>
              <Text style={styles.mediaText}>Stage Name</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
                name="modele.stage_name"
                rules={{ required: "The stage name is required" }}
              />
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>Facebook</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
                name="modele.facebook"
              />
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>instagram</Text>

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
                name="modele.instagram"
              />
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>twitter</Text>

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
                name="modele.twitter"
              />
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>youtube</Text>

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
                name="modele.youtube"
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                borderTopColor: "#EFEFEF",
                borderTopWidth: 0.5,
                minHeight: 45,
                paddingTop: 12,
              }}
            >
              <Text style={styles.mediaText}>Bio</Text>

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Textarea
                    containerStyle={[
                      styles.textareaContainer,
                      {
                        backgroundColor: colors.pinkOpact,
                      },
                    ]}
                    style={styles.textarea}
                    onChangeText={onChange}
                    defaultValue={value}
                    maxLength={300}
                    placeholder={"Tell us a little bit about you"}
                    placeholderTextColor={"#c7c7c7"}
                    underlineColorAndroid={"transparent"}
                  />
                )}
                name="modele.bio"
              />
            </View>
          </View>
        )}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  infos: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    minHeight: 45,
  },
  title: {
    color: colors.pink,
    textDecorationColor: colors.pink,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontSize: 18,
    fontWeight: "bold",
  },
  modelTouch: {
    width: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 10,
  },
  modelName: {
    fontWeight: "bold",
    marginTop: 10,
    color: colors.pink,
  },
  mediaText: {
    fontWeight: "bold",
    color: colors.pink,
    marginRight: 20,
    width: 100,
  },
  textareaContainer: {
    height: 100,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    borderColor: colors.pinkOpact,
    borderWidth: 1,
    shadowColor: colors.pink,
    overflow: "hidden",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 90,
    fontSize: 18,
    color: "#333",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: "#fce3e9",
    borderRadius: 5,
    height: 45,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: "#fce3e9",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})
