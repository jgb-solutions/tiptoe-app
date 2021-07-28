import React, { FC, useState } from "react"
import { Text, View, Spinner } from "native-base"
import { StyleSheet, TouchableOpacity } from "react-native"
import { FontAwesome, Feather } from "@expo/vector-icons"
import CardInterface from "../interfaces/CardInterface"
import { colors } from "../utils/colors"

const MyCard: FC<
  CardInterface & {
    isDefault?: boolean
    loading?: boolean
    updateDefaultCard?: (id: string) => void
    deleteCard?: (id: string) => void
    deleteCardLoading?: boolean
  }
> = ({
  id,
  brand,
  last4,
  isDefault,
  loading,
  deleteCardLoading,
  updateDefaultCard,
  deleteCard,
}) => {
  const handleUpdateCard = () => {
    if (updateDefaultCard) {
      updateDefaultCard(id)
    }
  }

  const handleDeleteCard = () => {
    if (deleteCard) {
      deleteCard(id)
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
        {console.log(brand)}
        {brand === "unionpay" ? (
          <FontAwesome
            // @ts-ignore
            name={`credit-card`}
            style={{
              fontSize: 34,
              // @ts-ignore
              color: colors[brand] || "",
              marginRight: 10,
            }}
          />
        ) : (
          <FontAwesome
            // @ts-ignore
            name={`cc-${brand === "diners" ? "diners-club" : brand}`}
            style={{
              fontSize: 34,
              // @ts-ignore
              color: colors[brand] || "",
              marginRight: 10,
            }}
          />
        )}

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
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleUpdateCard}>
              {loading ? (
                <Spinner color={colors.pink} />
              ) : (
                <Text style={{ color: colors.pink }}>Set as default</Text>
              )}
            </TouchableOpacity>
            {deleteCardLoading ? (
              <Spinner color={colors.pink} />
            ) : (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={handleDeleteCard}
              >
                {deleteCardLoading ? (
                  <Spinner color={colors.pink} />
                ) : (
                  <FontAwesome name="trash" color={colors.pink} size={18} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
export default MyCard

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
