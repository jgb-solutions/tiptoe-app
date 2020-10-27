import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FormInput from '../components/FormInput';
import Checkbox from "../components/Checkbox"
// @ts-ignore
import TipToeLogo from '../../assets/images/TipToeLogo.png';
import FormButton from '../components/FormButton';
import { colors } from '../utils/colors';

export default function SignUpWithEmailScreen() {
  const navigation = useNavigation();

  const genres = ['male', 'female', 'other'];

  const [gender, setGender] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.image} source={TipToeLogo} />

        <Text style={styles.signUp}>SIGN UP</Text>

        <View style={styles.inputsContainer}>
          <FormInput placeholder="Please Enter Your First Name" error />
          <FormInput placeholder="Please Enter Your Last Name" />
          <FormInput placeholder="Please Enter Your Username" success />
          <FormInput placeholder="Please Enter Your Email" />
          <FormInput placeholder="Please Choose A Password" />
        </View>

        <View style={styles.checkboxesContainer}>
          {genres.map((genre) => (
            <Checkbox
              key={genre}
              checked={gender === genre}
              onValueChanged={() => setGender(genre)} label={genre} />
          ))}
        </View>

        <FormButton
          btnStyle={{ marginBottom: 12 }}
          label="Create your account"
          onPress={() => ""} />

        <Text style={styles.smallText}>ALREADY HAVE AN ACCOUNT?</Text>
        <TouchableOpacity
          style={{ marginBottom: 80 }}
          onPress={() => navigation.navigate('LogIn')}>
          <Text style={[styles.smallText, { fontWeight: 'bold' }]}>LOG IN</Text>
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
  signUp: {
    color: colors.lightGrey,
    fontSize: 24,
    marginVertical: 20,
  },
  inputsContainer: {
    marginHorizontal: 30,
    alignSelf: 'stretch',
  },
  checkboxesContainer: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  smallText: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 12,
  },
});
