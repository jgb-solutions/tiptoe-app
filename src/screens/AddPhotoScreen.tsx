import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function AddPhotoScreen() {
  return (
    <View style={styles.container}>
      <Text>Some default text for the AddPhotoscreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
