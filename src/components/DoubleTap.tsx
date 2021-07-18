import React, { ReactNode } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

type Props = {
  onDoubleTap: () => void,
  children: ReactNode
  delay?: number
}

let lastTap: number | undefined

export default function DoubleTap({
  children,
  delay = 300,
  onDoubleTap
}: Props) {
  const handleDoubleTap = () => {
    const now = Date.now()

    if (lastTap && (now - lastTap) < delay) {
      onDoubleTap()
    } else {
      lastTap = now
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      {children}
    </TouchableWithoutFeedback>
  )
}