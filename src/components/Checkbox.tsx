import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"

// @ts-ignore
import check from "../../assets/images/check.png"
import { colors } from "../utils/colors"

const Checkbox = ({
  onValueChanged,
  checked,
  containerStyle,
  boxStyle,
  label,
  labelStyle,
}) => {

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onValueChanged}>
        <View style={[styles.box, boxStyle]}>
          {checked && <Image source={check} />}
        </View>
      </TouchableOpacity>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </View>
  )
}

Checkbox.propTypes = {
  containerStyle: PropTypes.object,
  boxStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  checked: PropTypes.bool,
  onValueChanged: PropTypes.func.isRequired,
  label: PropTypes.string,
}

Checkbox.defaultProps = {
  checked: false,
}

export default Checkbox

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    backgroundColor: colors.black,
    borderRadius: 6,
  },
  label: {
    color: colors.lightGrey,
    textTransform: "uppercase",
    fontSize: 10,
    marginLeft: 6,
  },
})
