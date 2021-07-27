import React, { useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ViewStyle } from "react-native"

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

export default Button
