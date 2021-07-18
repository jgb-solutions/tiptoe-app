import React, { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

import { colors } from '../utils/colors'

type Props = {
  btnStyle?: ViewStyle,
  label: string,
  labelStyle?: TextStyle,
  icon?: ReactNode,
  onPress: () => void,
  disabled?: boolean
  color?: TextStyle
}

const FormButton = ({ btnStyle, label, labelStyle, icon, onPress, disabled, color }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle]} disabled={disabled}>
      {icon}
      <Text style={[styles.label, labelStyle, color]}>{label}</Text>
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
  },
})

export default FormButton
