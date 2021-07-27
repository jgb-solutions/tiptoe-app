import React from "react"
import { ViewStyle } from "react-native"
import { Text, View } from "native-base"
import { formatToUnits } from "../utils/formatNumber"

type StatsProps = {
  number: number
  title: string
  style?: ViewStyle
  sign?: any
}

const Stats = ({ number, title, style, sign }: StatsProps) => (
  <View style={{ alignItems: "center", ...style }}>
    <Text style={{ fontWeight: "bold" }}>
      {sign && sign} {number > 999 ? formatToUnits(number) : number}
    </Text>
    <Text>{title}</Text>
  </View>
)

export default Stats
