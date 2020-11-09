import React from 'react'
import { StyleSheet, View, Text, TextInputProps } from 'react-native'
import { Item, Input } from 'native-base'

import { colors } from '../utils/colors'

type Props = {
  error?: any
  success?: boolean
  placeholder?: string
} & TextInputProps

const FormInput = ({ error, success, placeholder, ...rest }: Props) => {

  return (
    <View style={styles.container}>
      <Item rounded style={{
        borderColor: error ? colors.error : success ? colors.success : colors.black
      }} placeholderLabel>
        <Input
          placeholder={placeholder}
          style={[styles.input]}
          {...rest}
        />
      </Item>
      {
        !!error && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    textAlign: 'center'
  },
  errorText: {
    color: colors.error,
    alignSelf: 'center',
    marginTop: 4,
    fontSize: 12,
  },
})

export default FormInput
