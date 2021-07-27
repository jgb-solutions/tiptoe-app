import React, { useState, useEffect } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Spinner,
  View,
  Thumbnail,
  Input,
} from "native-base"
import { useForm, Controller } from "react-hook-form"

import { Feather, Entypo, FontAwesome } from "@expo/vector-icons"

import { ViewStyle, StyleSheet, TouchableOpacity } from "react-native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import { formatToUnits } from "../utils/formatNumber"
import useStore, { AppStateInterface } from "../store"
import useSetupPrice from "../hooks/useSetupPrice"

import useGetModelPrice from "../hooks/useGetModelPrice"
import { useNavigation } from "@react-navigation/native"
import NegativeResponse from "../components/NegativeResponse"
import Modal from "react-native-modal"
import Button from "../components/Button"
import Stats from "../components/Starts"

type AddPrice = {
  user_id?: string
  cost: string
}

interface PriceInterface {
  price_id: string
  cost: string
}

export default function ModelPriceScreen() {
  const navigation = useNavigation()
  const { currentUser } = useStore((state: AppStateInterface) => ({
    currentUser: state.authData.user,
  }))

  let { price } = useGetModelPrice(currentUser?.modele?.hash)

  const [cost, setCost] = useState(price)
  const [showDetails, setShowDetais] = useState<boolean>(false)

  console.log(price?.cost)

  const {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<PriceInterface>({
    mode: "onBlur",
    // defaultValues: cost,
  })

  useEffect(() => {
    watch("cost") && setCost({ ...cost, cost: watch("cost") })
  }, [watch("cost")])

  const noErrors = Object.keys(errors).length === 0
  const disabled = noErrors && !isDirty

  const {
    addPrice,
    data: addPriceData,
    loading: addPriceLoading,
    error: addPriceError,
  } = useSetupPrice(currentUser?.modele?.hash)

  const onSubmit = (addPriceInput: AddPrice) => {
    const payload = {
      user_id: currentUser?.id,
      cost: parseInt(addPriceInput.cost),
    }
    addPrice(payload)

    setCost(payload)

    if (addPriceData?.addPrice.success) {
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
          <Button
            transparent
            onPress={() => navigation.navigate(screenNames.Profile)}
          >
            <Feather name="arrow-left" color={colors.white} size={24} />
          </Button>

          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Profile
          </Text>
        </Left>
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
            <Thumbnail
              large
              source={{
                uri: currentUser?.modele?.poster,
              }}
            />

            <View
              style={{
                flex: 1,
                marginRight: 10,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Stats
                title={`Post${
                  currentUser?.modele?.photos?.length !== 1 ? "s" : ""
                }`}
                number={currentUser?.modele?.photos?.length}
              />
              <Stats
                style={{ marginLeft: 12 }}
                title={`Follower${
                  currentUser?.modele?.followers.length !== 1 ? "s" : ""
                }`}
                number={currentUser?.modele?.followers.length}
              />
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
              <Text>{currentUser?.telephone}</Text>
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

        {addPriceLoading ? (
          <Spinner color={colors.pink} />
        ) : addPriceError ? (
          <NegativeResponse>
            <Text>An error occurred</Text>
            <Button
              style={{
                borderWidth: 1,
                borderColor: colors.pink,
                marginTop: 12,
                padding: 12,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>Retry?</Text>
            </Button>
          </NegativeResponse>
        ) : (
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 20,
              borderTopColor: colors.pink,
              borderTopWidth: 1,
            }}
          >
            <Text style={styles.title}>Setup you price</Text>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: colors.blackB,
                }}
              >
                Put the price that you want to receive from your followers every
                month.
              </Text>

              <Text
                style={{
                  color: colors.blackB,
                  marginTop: 10,
                  marginBottom: 50,
                }}
              >
                The price choosen with decrease by 17.7% + $0.30
              </Text>

              <View style={[{ marginBottom: 30 }, styles.inputContainer]}>
                <Text style={styles.inputLeft}>Enter your price</Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      keyboardType="numeric"
                      style={[
                        styles.inputRight,
                        {
                          borderBottomColor: errors.cost
                            ? colors.pink
                            : colors.blackOpact,
                        },
                      ]}
                      placeholderTextColor={
                        errors.cost ? colors.pink : colors.blackOpact
                      }
                      placeholder={
                        errors.cost ? "Please enter a number" : "Ex: 200"
                      }
                      autoCapitalize="none"
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      defaultValue={cost?.cost ? `${cost?.cost}` : ""}
                    />
                  )}
                  name="cost"
                  type="number"
                  rules={{ required: true }}
                />
              </View>

              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLeftDetails}></Text>
                  <Text style={styles.inputRightDetails}>
                    Decrease by 17.7% | - $
                    {cost?.cost && (parseInt(cost?.cost) * 17.7) / 100}
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLeftDetails}></Text>
                  <Text style={styles.inputRightDetails}>- $0.30</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLeftDetails}></Text>

                  <TouchableOpacity onPress={() => setShowDetais(true)}>
                    <Text style={[styles.inputRightDetails]}>
                      Total receive: $
                      {cost?.cost &&
                        parseInt(cost?.cost) -
                          ((parseInt(cost?.cost) * 17.7) / 100 + 0.3)}{" "}
                      <Entypo
                        name="info-with-circle"
                        size={17}
                        color={colors.pink}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>

                <Modal
                  isVisible={showDetails}
                  useNativeDriver
                  onBackButtonPress={() => setShowDetais(false)}
                  onBackdropPress={() => setShowDetais(false)}
                >
                  <View style={styles.modal}>
                    <Text style={[{ marginBottom: 10 }, styles.title]}>
                      Here are the details about the payment
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 5,
                      }}
                    >
                      <FontAwesome
                        name="hand-o-right"
                        size={17}
                        color={colors.pink}
                      />
                      <Text style={{ marginLeft: 10 }}>
                        We charrge you 15% for the the service
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 5,
                      }}
                    >
                      <FontAwesome
                        name="hand-o-right"
                        size={17}
                        color={colors.pink}
                      />
                      <Text style={{ marginLeft: 10 }}>
                        We use Stripe and they charge 2.7% + $0.30 per payment
                      </Text>
                    </View>
                  </View>
                </Modal>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 50,
                  }}
                >
                  <Button
                    style={styles.buttonStyle}
                    onPress={handleSubmit(onSubmit)}
                    disable={disabled}
                  >
                    <Text style={{ color: colors.white }}>
                      Submit your price
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        )}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.pink,
    fontSize: 18,
    fontWeight: "bold",
  },
  infos: {
    flexDirection: "row",
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    padding: 12,
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
    marginRight: 20,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  inputLeft: {
    width: "50%",
    color: colors.pink,
    fontWeight: "bold",
  },
  inputRight: {
    textAlign: "right",
    marginTop: -35,
    borderBottomWidth: 1,
  },
  inputLeftDetails: {
    color: colors.pink,
    fontWeight: "bold",
  },
  inputRightDetails: {
    flex: 1,
    flexDirection: "row",
    textAlign: "right",
  },
  buttonStyle: {
    backgroundColor: colors.pink,
    justifyContent: "center",
    borderColor: colors.pink,
    borderWidth: 1,
    paddingVertical: 10,
    width: 180,
    borderRadius: 5,
  },
  modal: {
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: colors.white,
    padding: 10,
  },
})
