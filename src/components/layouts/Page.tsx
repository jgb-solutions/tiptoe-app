import React, { ReactNode } from 'react'
import { Image, View, ViewStyle, } from 'react-native'
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
import { useNavigation } from '@react-navigation/native'


import { colors } from '../../utils/colors'
import { screenNames } from '../../utils/screens'
const tiptoeLogo = require('../../../assets/images/TipToeLogo.png')

type Props = {
  children: ReactNode
  noLeft?: boolean
  noRight?: boolean
  noContent?: boolean
  contentStyle?: ViewStyle
  pageStyle?: ViewStyle,
  bodyStyle?: ViewStyle,
  leftStyle?: ViewStyle,
  rightStyle?: ViewStyle,
  onPressRight?: () => void
  onPressLeft?: () => void
}


export default function Page({
  children,
  noLeft,
  noRight,
  contentStyle,
  pageStyle,
  onPressLeft,
  onPressRight,
  bodyStyle,
  leftStyle,
  rightStyle,
  noContent
}: Props) {
  const navigation = useNavigation()

  const handlePressLeft = () => {
    if (onPressLeft) {
      onPressLeft()
    } else {
      navigation.goBack()
    }
  }

  const handlePressRight = () => {
    if (onPressRight) {
      onPressRight()
    } else {
      navigation.navigate(screenNames.ChatList)
    }
  }

  return (
    <Container style={[{ ...pageStyle }]}>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}>
        {!noLeft && (
          <Left style={[{ flex: 1 }, { ...leftStyle }]}>
            <Button transparent onPress={handlePressLeft}>
              <Icon name='arrow-back' style={{ color: colors.white }} />
            </Button>
          </Left>
        )}
        <Body style={[{ flex: 1 }, { ...bodyStyle }]}>
          <Image
            source={tiptoeLogo} style={{ maxWidth: 100, flex: 1 }}
            resizeMode='contain'
          />
        </Body>
        {!noRight && (
          <Right style={[{ flex: 1 }, { ...rightStyle }]}>
            <Button transparent onPress={handlePressRight}>
              <Icon name='chatbubbles' style={{ color: colors.white }} />
            </Button>
          </Right>
        )}
      </Header>
      {!noContent ? (
        <Content contentContainerStyle={[{ ...contentStyle }]}>
          {children}
        </Content>
      ) : <View style={{ flex: 1 }}>{children}</View>}
    </Container >
  )
}