import React from "react"
import Constants from 'expo-constants'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
  SafeAreaView
} from 'react-native'
import { Container, Header, Content, Item, Input } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import FormInput from '../components/FormInput'
// @ts-ignore
import TipToeLogo from '../../assets/images/TipToeLogo.png'
import FormButton from '../components/FormButton'
import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"

export default function LogInWithEmailScreen() {
  const navigation = useNavigation()
  const { login } = useStore((state: AppStateInterface) =>
    ({ login: state.login }))

  return (
    <SafeAreaView style={styles.container}>
      <Item rounded style={{ backgroundColor: colors.black, borderColor: colors.black }} placeholderLabel>
        <Input placeholder='Rounded Textbox' style={{ color: colors.white, textAlign: 'center' }} />
      </Item>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.image} source={TipToeLogo} />

        <Text style={styles.login}>LOG IN</Text>

        <View style={styles.inputsContainer}>
          <Item rounded style={{ backgroundColor: colors.black }} placeholderLabel>
            <Input placeholder='Rounded Textbox' style={{ color: colors.white, textAlign: 'center' }} />
          </Item>
          <FormInput placeholder="Please Enter Your Email Or Username" />
          <FormInput placeholder="Please Enter Your Password" />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <Text style={styles.smallText}>FORGOT YOUR PASSWORD? {' '}</Text>
          <Text style={[styles.smallText, { fontWeight: 'bold' }]}>SIGN UP</Text>
        </View>

        <FormButton
          btnStyle={{ marginBottom: 12 }}
          label="Log in"
          onPress={() => login('services@jgb.solutions', 'password')} />

        <Text style={styles.smallText}>DON'T HAVE AN ACCOUNT?</Text>
        <TouchableOpacity
          style={{ marginBottom: 80 }}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.smallText, { fontWeight: 'bold' }]}>SIGN UP</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackB,
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 78,
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        marginTop: 54,
      },
      android: {
        marginTop: Constants.statusBarHeight + 54,
      },
    }),
  },
  login: {
    textTransform: 'uppercase',
    color: colors.lightGrey,
    fontSize: 24,
    marginVertical: 20,
  },
  inputsContainer: {
    marginHorizontal: 30,
    alignSelf: 'stretch',
  },
  smallText: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 12,
  },
})
