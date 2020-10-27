import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../utils/colors';

const FormInput = ({ error, success, ...rest }) => {
  const borderColor = error ? colors.error : success ? colors.success : null;

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: borderColor }]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.lightGrey}
          blurOnSubmit={false}
          returnKeyType="next"
          keyboardAppearance="dark"
          {...rest} />
      </View>
      {error && (
        <Text style={styles.errorText}>There Was An Error With Your Input</Text>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputContainer: {
    borderRadius: 24,
    backgroundColor: colors.black,
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    height: 50,
    color: 'white',
  },
  errorText: {
    color: colors.error,
    alignSelf: 'center',
    marginTop: 4,
    fontSize: 12,
  },
});

FormInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
};

FormInput.defaultProps = {
  error: false,
  success: false,
};

export default FormInput;
