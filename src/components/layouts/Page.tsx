import React, { ReactNode } from 'react'
import { Image } from 'react-native'
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

type Props = {
  children: ReactNode
}

const tiptoeLogo = require('../../../assets/images/TipToeLogo.png')

export default function Page({ children }: Props) {
  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.white}
        style={{ backgroundColor: colors.pink }}>
        <Left style={{ flex: 1 }}>
          <Button transparent>
            <Icon name='chatbubbles' style={{ color: colors.white }} />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <Image
            source={tiptoeLogo} style={{ maxWidth: 100, flex: 1 }}
            resizeMode='contain'
          />
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent>
            <Icon name='chatbubbles' style={{ color: colors.white }} />
          </Button>
        </Right>
      </Header>
      <Content>
        {children}
      </Content>
    </Container>
  )
}