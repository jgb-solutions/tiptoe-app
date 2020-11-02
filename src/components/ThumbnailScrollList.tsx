import React from 'react'
import {
  ScrollView,
  TouchableOpacity,
} from "react-native"
import {
  Text,
  Body,
  Thumbnail,
} from 'native-base'

import ThumbnailInterface from '../interfaces/ThumbnailInterface'

type Props = {
  thumbnails: ThumbnailInterface[],
  onPress?: (hash: string) => void
}

export default function ThumbnailScrollList({ thumbnails, onPress }: Props) {

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
    >
      {thumbnails.map((thumbnail) => (
        <TouchableOpacity onPress={() => handleOnPress(thumbnail.hash)}>
          <Body key={thumbnail.hash} style={{ marginRight: 12 }}>
            <Thumbnail
              source={{ uri: thumbnail.imageUrl }}
              style={{ marginBottom: 5 }}
            />
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