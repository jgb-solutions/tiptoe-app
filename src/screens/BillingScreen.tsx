import React, { useState } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  View,
  Spinner,
} from "native-base"
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons"
import { useForm } from "react-hook-form"

import { screenNames } from "../utils/screens"

import useBillingData from "../hooks/useBillingData"
import useSetDefaultCard from "../hooks/useSetDefaultCard"

import { StyleSheet, ScrollView } from "react-native"

import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import CardInterface from "../interfaces/CardInterface"
import InvoiceInterface from "../interfaces/InvoiceInterface"
import { useEffect } from "react"
import MyCard from "../components/MyCard"
import useCardManagement from "../hooks/useCardManagement"
import usePaymentIntent from "../hooks/usePaymentIntent"
import { CardField, useConfirmSetupIntent } from "@stripe/stripe-react-native"
import Modal from "react-native-modal"
import Button from "../components/Button"
import { SCREEN_WIDTH } from "../utils/constants"
import Stats from "../components/Starts"
import useMyFollowers from "../hooks/useMyFollowers"

export default function SettingsScreen() {
  const navigation = useNavigation()
  const { control, handleSubmit, errors, watch, getValues, reset } =
    useForm<any>({
      mode: "onBlur",
    })

  const {
    data: billingData,
    loading: billingLoading,
    error: billingError,
    refetch: billingRefetch,
  } = useBillingData()

  const { setDefaultCard, data, error, loading } = useSetDefaultCard()

  const [cardModal, setCardModal] = useState<boolean>(false)
  const showModal = () => {
    setCardModal(true)
    hideMenu()
  }

  const {
    deleteThisCard,
    deleteCardData,
    deleteCardError,
    deleteCardLoading,
    addCard,
    addCardData,
    addCardError,
    addCardLoading,
  } = useCardManagement()

  const { currentUser, updateCardData } = useStore(
    (state: AppStateInterface) => ({
      currentUser: state.authData.user,
      updateCardData: state.updateCardData,
    })
  )

  const { client_secret } = usePaymentIntent()
  const [secret, setSecret] = useState<string>(client_secret)
  useEffect(() => {
    setSecret(client_secret)
  }, [])

  useEffect(() => {
    client_secret && setSecret(client_secret)
  }, [client_secret])

  const { confirmSetupIntent, loading: loadingSetupIntent } =
    useConfirmSetupIntent()

  const onSubmit = async () => {
    setCardModal(false)
    // Gather the customer's billing information (e.g., email)
    const billingDetails = {
      email: currentUser?.email,
    }

    const { setupIntent, error } = await confirmSetupIntent(secret, {
      type: "Card",
      billingDetails,
    })

    if (error) {
      console.log(error)
    }

    if (setupIntent) {
      console.log(setupIntent)
      addCard({ card: `${setupIntent.paymentMethodId}` })
    }

    if (addCardData?.addCard.success) {
    }
  }

  let menu: any = null

  const setMenuRef = (ref: any) => {
    menu = ref
  }

  const showMenu = () => {
    menu.show()
  }

  const hideMenu = () => {
    menu.hide()
  }

  const setDefault = (id: string) => {
    setDefaultCard({ card: id })
  }

  const deleteCard = (id: string) => {
    deleteThisCard({ card: id })
  }

  useEffect(() => {
    if (data) {
      updateCardData({ last4: data.setDefaultCard.last4 })
    }
  }, [data])

  useEffect(() => {
    deleteCardData && billingRefetch()
  }, [deleteCardData])

  const { followersData, followerLoading, followerError } = useMyFollowers()

  const followerList = followersData?.fetchMyFollowers
  const newUserCount = currentUser?.modele?.new_follower_count

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
            Billing Informations
          </Text>
        </Left>

        <Right style={{ flex: 1 }}>
          <Menu
            ref={setMenuRef}
            button={
              <Feather
                onPress={showMenu}
                name="more-vertical"
                color={colors.white}
                size={24}
              />
            }
          >
            {/* <MenuItem onPress={() => showModal()}>Add a Card</MenuItem> */}
            <MenuDivider />
            {/* <MenuItem onPress={logout}>Logout</MenuItem> */}
          </Menu>
        </Right>
      </Header>
      <Content>
        {currentUser?.user_type === "model" && (
          <View style={styles.infoBox}>
            <View style={styles.box}>
              <Stats
                title={`Falower${followerList?.length !== 1 ? "s" : ""}`}
                number={followerList?.length}
                sign={
                  <Feather
                    name={followerList?.length !== 1 ? "users" : "user"}
                    size={17}
                    style={{ marginRight: 10 }}
                    color="black"
                  />
                }
              />
            </View>

            <View style={styles.box}>
              <Stats
                title={`Total money`}
                number={100000}
                sign={
                  <Feather
                    name="dollar-sign"
                    size={17}
                    style={{ marginRight: 10 }}
                    color="black"
                  />
                }
              />
            </View>

            <View style={styles.box}>
              <Stats
                title={`Balance`}
                number={50}
                sign={
                  <Feather
                    name="dollar-sign"
                    size={17}
                    style={{ marginRight: 10 }}
                    color="black"
                  />
                }
              />
            </View>
          </View>
        )}

        <View style={{ padding: 15, flexDirection: "row" }}>
          <Feather
            name="user-plus"
            size={17}
            style={{ marginRight: 10 }}
            color="black"
          />
          <Text>
            {newUserCount} new follower{newUserCount !== 1 ? "s" : ""} this
            month
          </Text>
        </View>

        {billingLoading ? (
          <Spinner color={colors.pink} />
        ) : (
          billingData && (
            <ScrollView style={styles.imageBox}>
              <View style={{ padding: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 25,
                    marginTop: 20,
                    borderRadius: 5,
                  }}
                >
                  <FontAwesome name="credit-card" size={16} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: colors.blackOpact,
                      marginLeft: 10,
                    }}
                  >
                    My cards
                  </Text>

                  <TouchableOpacity
                    onPress={() => setCardModal(true)}
                    style={{ marginLeft: 10 }}
                  >
                    <FontAwesome name="plus" color={colors.pink} size={16} />
                  </TouchableOpacity>
                </View>

                <Modal
                  isVisible={cardModal}
                  useNativeDriver
                  onBackButtonPress={() => setCardModal(false)}
                  onBackdropPress={() => setCardModal(false)}
                >
                  <View style={styles.modal}>
                    <Text style={styles.title}>Add a new Card</Text>
                    <CardField
                      postalCodeEnabled={true}
                      placeholder={{
                        number: "4242 4242 4242 4242",
                      }}
                      cardStyle={{
                        backgroundColor: "#FFFFFF",
                        textColor: "#000000",
                        borderWidth: 1,
                        borderColor: "#fce3e9",
                        borderRadius: 5,
                      }}
                      style={{
                        width: "100%",
                        height: 45,
                        marginVertical: 30,
                      }}
                    />
                    <Button
                      onPress={handleSubmit(onSubmit)}
                      style={{
                        backgroundColor: colors.pink,
                        maxWidth: "30%",
                        marginTop: 20,
                        paddingTop: 7,
                        paddingBottom: 7,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ color: colors.white }}>Add</Text>
                    </Button>
                  </View>
                </Modal>

                {addCardLoading && <Spinner color={colors.pink} />}

                {billingData.myCards.map((card: CardInterface) => (
                  <MyCard
                    key={card.id}
                    {...card}
                    isDefault={currentUser?.pm_last_four === card.last4}
                    updateDefaultCard={setDefault}
                    deleteCard={deleteCard}
                    loading={loading}
                    deleteCardLoading={deleteCardLoading}
                  />
                ))}

                {billingData.myCards.length === 0 && (
                  <Text style={[styles.notFound, { marginTop: -15 }]}>
                    {" "}
                    No card found
                  </Text>
                )}

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    marginTop: 20,
                    borderRadius: 5,
                  }}
                >
                  <FontAwesome name="files-o" size={16} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: colors.blackOpact,
                      marginLeft: 10,
                    }}
                  >
                    My Invoices
                  </Text>
                </View>

                {billingData?.myInvoices.map((invoice: InvoiceInterface) => (
                  <TouchableOpacity
                    key={invoice.id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      borderWidth: 0.5,
                      borderColor: colors.lightGrey,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ color: colors.blackOpact }}>
                      {invoice.created}
                    </Text>
                    <Text style={{ color: colors.blackOpact }}>
                      ${invoice.amount_paid}
                    </Text>
                    {/* <Text style={{ color: colors.blackOpact }}></Text> */}
                  </TouchableOpacity>
                ))}

                {billingData.myInvoices.length === 0 && (
                  <Text style={styles.notFound}> No invoice found</Text>
                )}
              </View>
            </ScrollView>
          )
        )}
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
  title: {
    color: colors.pink,
    fontSize: 18,
    fontWeight: "bold",
  },
  displayNone: {
    opacity: 0,
    height: 0,
    flex: 0,
  },
  imageBox: {},
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.2,
  },
  modal: {
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: colors.white,
    padding: 10,
  },
  infoBox: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 3.5,
    height: 70,
    borderWidth: 1,
    backgroundColor: colors.pinkOpact,
    borderColor: colors.pinkOpact,
    borderRadius: 5,
  },
  notFound: {
    color: colors.pink,
    marginLeft: 25,
  },
})
