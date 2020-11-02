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

import PhotoInterface from "../interfaces/PhotoInterface"
import { colors } from '../utils/colors'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

type Props = {
  photo: PhotoInterface
}

export default function PhotoCard({ photo }: Props) {
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

            <TouchableOpacity>
              <Text note>Location</Text>
            </TouchableOpacity>
          </Body>
        </Left>
      </CardItem>
      <TouchableOpacity>
        <CardItem cardBody>
          <Image
            source={{ uri: photo.url }}
            style={{ height: SCREEN_WIDTH, flex: 1 }}
            resizeMode='cover' />
        </CardItem>
      </TouchableOpacity>

      <CardItem>
        <Left>
          <Button transparent>
            <Icon name="heart" style={{ color: colors.darkGrey }} />
            <Text style={{ color: colors.darkGrey }}>{photo.likeCount} Like{photo.likeCount !== 1 ? 's' : ''}</Text>
          </Button>
        </Left>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>

      <CardItem>
        <Text>{photo.caption}</Text>
      </CardItem>

    </Card>
  )
}