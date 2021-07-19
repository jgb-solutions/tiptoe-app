import React from 'react'
import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

import { colors } from '../utils/colors'

type Props = {
  btnStyle?: ViewStyle,
  label: string | JSX.Element,
  labelStyle?: TextStyle,
  icon?: JSX.Element,
  onPress: () => void,
  disabled?: boolean
  color?: TextStyle
}

const FormButton: FC<Props> = ({
  btnStyle, label, labelStyle, icon, onPress, disabled, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, btnStyle, {
        opacity: disabled ? .75 : undefined
      }]}
      disabled={disabled}>
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
