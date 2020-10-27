import React from 'react'
import Constants from 'expo-constants'
import { View, SafeAreaView, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, Platform } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { colors } from '../utils/colors'
// @ts-ignore
import AuthBg from '../../assets/images/authBg.png'
// @ts-ignore
import TipToeLogo from '../../assets/images/TipToeLogo.png'
// @ts-ignore
import google from '../../assets/images/googleLogo.png'
import FormButton from '../components/FormButton'
import OrSeparator from '../components/OrSeparator'

export default function LogInScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={AuthBg} style={styles.imgBg}>
        <View style={styles.blackBox}>
          <Image style={styles.logo} source={TipToeLogo} />

          <Text style={styles.signUp}>log in</Text>

          <FormButton
            icon={<Image source={google} style={styles.icon} />}
            label="login with google"
            btnStyle={{ backgroundColor: colors.white, ...styles.buttons }}
            labelStyle={{ color: colors.black }}
            onPress={() => ""} />

          <FormButton
            label="login with facebook"
            icon={<FontAwesome5 name="facebook-square" size={20} color={colors.white} style={styles.icon} />}
            btnStyle={{ backgroundColor: colors.facebook, ...styles.buttons }}
            onPress={() => ""} />

          <OrSeparator />

          <View style={{ marginBottom: 12 }}>
            <FormButton label="log in with email" onPress={() => navigation.navigate('LogInWithEmail')} />
          </View>

          <Text style={styles.smallText}>don't have an account?</Text>
          <TouchableOpacity
            style={{ marginBottom: 80 }}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.smallText, { fontWeight: 'bold' }]}>signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: Constants.statusBarHeight,
      },
    }),
  },
  blackBox: {
    width: '80%',
    height: '58%',
    borderRadius: 24,
    backgroundColor: colors.blackOpact,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 78,
    resizeMode: 'contain',
    marginTop: 18,
  },
  signUp: {
    textTransform: 'uppercase',
    color: colors.lightGrey,
    fontSize: 24,
    marginVertical: 20,
  },
  buttons: {
    borderWidth: 0,
    marginBottom: 24,
  },
  smallText: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 12,
  },
  icon: {
    position: 'absolute',
    left: 15,
  },
})
