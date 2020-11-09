import React, { ReactNode } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

import { colors } from '../utils/colors'

type Props = {
  btnStyle?: ViewStyle,
  label: string,
  labelStyle?: TextStyle,
  icon?: ReactNode,
  onPress: () => void
}

const FormButton = ({ btnStyle, label, labelStyle, icon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle]}>
      {icon}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.pink,
    height: 42,
    width: 271,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'uppercase',
    // color: 'white',
  },
})

export default FormButton
