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
} from "native-base"
import * as mime from "react-native-mime-types"
import Textarea from "react-native-textarea"
import { Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from "expo-image-picker"

import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import useStore, { AppStateInterface } from "../store"
import ModelInterface from "../interfaces/ModelInterface"

import Button from "../components/Button"
import { TouchableOpacity } from "react-native-gesture-handler"
import useUpdateUser from "../hooks/useUpdateUser"
import UpdateUserInterface from "../interfaces/UpdateUserInterface"
import SelectPicker from "react-native-form-select-picker"
import UserInterface from "../interfaces/UserInterface"
import { DEFAULT_AVATAR } from "../utils/constants"

const GENDERS = ["MALE", "FEMALE", "OTHER"]

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
    userState && setCurrentUser(userState)
  }, [userState])

  const {
    control,
    handleSubmit,
    errors,
    getValues,
    watch,
    formState: { touched, isValid },
  } = useForm<UserInterface>({
    mode: "onBlur",
    defaultValues: currentUser,
  })

  const minTouched = Object.keys(touched).length > 0
  const noErrors = Object.keys(errors).length === 0

  const disabled = !(minTouched && noErrors)

  const [avatar, setAvatar] = useState<any | null>()
  const [poster, setPoster] = useState<any | null>()

  const { updateUser, data: updateUserData } = useUpdateUser()

  const onSubmit = async (credentials: UpdateUserInterface) => {
    const payload = {
      id: currentUser?.id,
      ...credentials,
      modele: {
        update: {
          id: currentUser?.modele?.id,
          ...credentials.modele,
        },
      },
    }

    updateUser(payload)
    if (updateUserData) {
      updateUserState(updateUserData.updateUser)
      alert("Your profile has been updated")
    }
  }

  useEffect(() => {
    if (currentUser?.first_login) {
      const payload: UpdateUserInterface = {
        id: currentUser?.id,
        first_login: false,
      }
      updateUser(payload)

      if (updateUserData) {
        updateUserState(updateUserData.updateUser)
      }
    }
  }, [currentUser?.first_login, updateUserData])

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)
    if (!result.cancelled) {
      console.log(mime.lookup(result.uri))
      setAvatar(result.uri)
    }
  }

  const pickPoster = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setPoster(result.uri)
    }
  }

  console.log(currentUser?.modele?.poster)

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
              onPress={modelPoster ? pickPoster : pickImage}
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

              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={colors.red}
                style={{
                  //   position: "absolute",
                  marginTop: -30,
                }}
              />
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
                    <TouchableOpacity onPress={() => setModelPoster(true)}>
                      <Text>Show model poster</Text>
                    </TouchableOpacity>
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ flexDirection: "column", marginBottom: 24, marginTop: 20 }}
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
                <SelectPicker
                  onValueChange={onChange}
                  selected={value}
                  placeholder="Select your gender"
                  placeholderStyle={{
                    fontSize: 18,
                    color: "#000",
                  }}
                >
                  {GENDERS.map((gender, index) => (
                    <SelectPicker.Item
                      key={index}
                      label={gender.toLowerCase()}
                      value={gender}
                    />
                  ))}
                </SelectPicker>
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
})
