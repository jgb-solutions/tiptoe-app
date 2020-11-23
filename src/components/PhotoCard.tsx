import React from 'react'
import {
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native"
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


import DoubleTap from './DoubleTap'
import { colors } from '../utils/colors'
import PhotoInterface from "../interfaces/PhotoInterface"

// Initialize days with RelativeTime plugin
dayjs.extend(relativeTime)

const { width: SCREEN_WIDTH } = Dimensions.get('window')

type Props = {
  photo: PhotoInterface
}

export default function PhotoCard({ photo }: Props) {
  const hanleToggleLike = (photo: PhotoInterface) => {
    alert(`Like ${photo.hash} by ${photo.model.stageName}`)
  }

  return (
    <Card>
      <CardItem>
        <Left>
          <TouchableOpacity>
            <Thumbnail small source={{ uri: photo.model.posterUrl }} />
          </TouchableOpacity>

          <Body>
            <TouchableOpacity>
              <Text>{photo.model.stageName}</Text>
            </TouchableOpacity>
          </Body>
        </Left>
      </CardItem>
      <DoubleTap onDoubleTap={() => hanleToggleLike(photo)}>
        <CardItem cardBody>
          <Image
            source={{ uri: photo.url }}
            style={{ height: SCREEN_WIDTH, flex: 1 }}
            resizeMode='cover' />
        </CardItem>
      </DoubleTap>

      <CardItem>
        <Left>
          <Button transparent>
            <Icon name="heart" style={{ color: colors.pink, fontSize: 36 }} />
            <Text style={{ color: colors.darkGrey }}>{photo.likeCount} like{photo.likeCount !== 1 ? 's' : ''}</Text>
          </Button>
        </Left>
        <Right>
          <Text>{dayjs(photo.insertedAt).fromNow()}</Text>
        </Right>
      </CardItem>

      <CardItem>
        <Text>{photo.caption}</Text>
      </CardItem>

    </Card>
  )
}