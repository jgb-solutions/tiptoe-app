import React from 'react'
import { View, Image, Text } from 'react-native'

// @ts-ignore
import line from '../../assets/images/line.png'
import { colors } from '../utils/colors'

const OrSeparator = () => {
  return (
    <View style={{ marginBottom: 24, flexDirection: 'row', alignItems: 'center' }}>
      <Image source={line} />
      <Text style={{ color: colors.lightGrey, marginHorizontal: 6 }}>OR</Text>
      <Image source={line} />
    </View>
  )
}

export default OrSeparator
