import React, { useState } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"
import {
  Text,
  Body,
  Thumbnail,
} from 'native-base'

import ThumbnailInterface from '../interfaces/ThumbnailInterface'
import { colors } from '../utils/colors'

type Props = {
  thumbnails: ThumbnailInterface[],
  onPress?: (hash: string) => void
}

export default function ThumbnailScrollList({ thumbnails, onPress }: Props) {
  const [viewWidth, setviewWidth] = useState(0)
  const thumbnailPadding = 2

  const handleOnPress = (hash: string) => {
    if (onPress) {
      onPress(hash)
    }
  }

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        padding: 6
      }}
      showsHorizontalScrollIndicator={false}
    >
      {thumbnails.map((thumbnail) => (
        <TouchableOpacity key={thumbnail.hash} onPress={() => handleOnPress(thumbnail.hash)}>
          <Body key={thumbnail.hash} style={{ marginRight: 12 }}>
            <View style={{
              marginBottom: 5,
              borderWidth: !!viewWidth ? 3 : undefined,
              padding: thumbnailPadding,
              borderRadius: !!viewWidth ? (viewWidth + thumbnailPadding) / 2 : undefined,
              borderColor: !!viewWidth ? colors.pink : undefined
            }} onLayout={(event) => {
              const { width } = event.nativeEvent.layout
              setviewWidth(width)
            }}>
              <Thumbnail
                source={{ uri: thumbnail.imageUrl }}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12
              }}>{thumbnail.title.split(' ')[0]}</Text>
          </Body>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}