import React, { CSSProperties, ReactNode } from 'react'
import { Image, StyleSheetProperties } from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base'


import { colors } from '../../utils/colors'
const tiptoeLogo = require('../../../assets/images/TipToeLogo.png')

type Props = {
  children: ReactNode
  noLeft?: boolean
  noRight?: boolean
  contentStyle?: object
}


export default function Page({
  children,
  noLeft,
  noRight,
  contentStyle
}: Props) {
  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.white}
        style={{ backgroundColor: colors.pink }}>
        {!noLeft && (
          <Left style={{ flex: 1 }}>
            <Button transparent>
              <Icon name='chatbubbles' style={{ color: colors.white }} />
            </Button>
          </Left>
        )}
        <Body style={{ flex: 1 }}>
          <Image
            source={tiptoeLogo} style={{ maxWidth: 100, flex: 1 }}
            resizeMode='contain'
          />
        </Body>
        {!noRight && (
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Icon name='chatbubbles' style={{ color: colors.white }} />
            </Button>
          </Right>
        )}
      </Header>
      <Content contentContainerStyle={[{ ...contentStyle }]}>
        {children}
      </Content>
    </Container>
  )
}