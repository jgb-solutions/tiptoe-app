import React, { useState, useEffect } from "react"
import {
  Alert,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native"
import {
  Left,
  Text,
  View,
  Right,
  Header,
  Spinner,
  Thumbnail,
} from "native-base"
import { formatToUnits } from "../utils/formatNumber"

type StatsProps = {
  number: number
  title: string
  style?: ViewStyle
}

const Stats = ({ number, title, style }: StatsProps) => (
  <View style={{ alignItems: "center", ...style }}>
    <Text style={{ fontWeight: "bold" }}>
      {number > 999 ? formatToUnits(number) : number}
    </Text>
    <Text>{title}</Text>
  </View>
)

export default Stats
