import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../utils/colors';

const FormButton = ({ btnStyle, label, labelStyle, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle]}>
      {icon}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.pink,
    height: 42,
    width: 271,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'uppercase',
    color: 'white',
  },
});

FormButton.propTypes = {
  btnStyle: PropTypes.object,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  icon: PropTypes.node,
  onPress: PropTypes.func.isRequired,
};

FormButton.defaultProps = {
  buttonStyle: {},
  labelStyle: {},
  icon: <View />,
};

export default FormButton;
