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
import { FontAwesome } from "@expo/vector-icons"

import { formatToUnits } from "../utils/formatNumber"
import { screenNames } from "../utils/screens"

import useBillingData from "../hooks/useBillingData"
import useSetDefaultCard from "../hooks/useSetDefaultCard"

import {
  ViewStyle,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native"

import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import CardInterface from "../interfaces/CardInterface"
import InvoiceInterface from "../interfaces/InvoiceInterface"
import { useEffect } from "react"
import { FC } from "react"

type ButtonProps = {
  style?: ViewStyle
  children: React.ReactNode
  onPress?: () => void
  transparent?: boolean
  disable?: boolean
}

const Button = ({
  children,
  style,
  onPress,
  transparent,
  disable,
}: ButtonProps) => {
  const handleOnPress = () => {
    if (disable) return

    onPress && onPress()
  }

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 6,
          opacity: disable ? 0.7 : 1,
          backgroundColor: transparent ? "transparent" : undefined,
          ...style,
        },
      ]}
      onPress={handleOnPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const MyCard: FC<
  CardInterface & {
    isDefault?: boolean
    loading?: boolean
    updateDefaultCard?: (id: string) => void
  }
> = ({ id, brand, last4, isDefault, loading, updateDefaultCard }) => {
  const handleUpdateCard = () => {
    if (updateDefaultCard) {
      updateDefaultCard(id)
    }
  }

  return (
    <View key={id} style={styles.cardContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          width: "70%",
        }}
      >
        <FontAwesome
          // @ts-ignore
          name={`cc-${brand}`}
          style={{
            fontSize: 34,
            // @ts-ignore
            color: colors[brand] || "",
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ color: colors.blackOpact }}>
            {[1, 2, 3].map((list) => (
              <Text key={list}>
                <FontAwesome
                  name="circle"
                  style={{
                    marginRight: 10,
                    color: colors.blackOpact,
                  }}
                />{" "}
              </Text>
            ))}

            {last4}
          </Text>
          <Text
            style={{
              color: colors.blackOpact,
            }}
          >
            Exp: 04/25
          </Text>
        </View>
      </View>
      <View>
        {isDefault ? (
          <Text style={{ fontWeight: "bold", color: colors.pink }}>
            <FontAwesome name="check" size={18} /> Default
          </Text>
        ) : (
          <TouchableOpacity onPress={handleUpdateCard}>
            {loading ? (
              <Spinner color={colors.pink} />
            ) : (
              <Text style={{ color: colors.pink }}>Set as default</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default function SettingsScreen() {
  const navigation = useNavigation()
  const {
    data: billingData,
    loading: billingLoading,
    error: billingError,
  } = useBillingData()
  const { setDefaultCard, data, error, loading } = useSetDefaultCard()

  const { currentUser, updateCardData } = useStore(
    (state: AppStateInterface) => ({
      currentUser: state.authData.user,
      updateCardData: state.updateCardData,
    })
  )

  let menu: any = null

  const setMenuRef = (ref: any) => {
    menu = ref
  }

  const showMenu = () => {
    menu.show()
  }

  const setDefault = (id: string) => {
    setDefaultCard({ card: id })
  }

  useEffect(() => {
    if (data) {
      // updateCardData({ last4: data.setDefaultCard.last4 })
    }
  }, [data])

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
            <FontAwesome
              name="chevron-left"
              style={{ color: colors.white, fontSize: 20 }}
            />
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
              <FontAwesome
                onPress={showMenu}
                name="ellipsis-h"
                style={{ color: colors.white, fontSize: 20 }}
              />
            }
          >
            <MenuItem>Add a Card</MenuItem>
            <MenuDivider />
            {/* <MenuItem onPress={logout}>Logout</MenuItem> */}
          </Menu>
        </Right>
      </Header>
      <Content>
        {billingLoading ? (
          <Spinner color={colors.pink} />
        ) : (
          billingData && (
            <ScrollView style={styles.imageBox}>
              <View style={{ padding: 12 }}>
                <View
                  style={{
                    flex: 1,
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
                </View>

                {billingData.myCards.map((card: CardInterface) => (
                  <MyCard
                    key={card.id}
                    {...card}
                    isDefault={currentUser?.pm_last_four === card.last4}
                    updateDefaultCard={setDefault}
                    loading={loading}
                  />
                ))}

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
})
