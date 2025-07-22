// Import React and necessary components
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { fontSizes } from "../utils/sizes"

/**
 * RoundedButton is a reusable button component with a circular style.
 * Props:
 * - style: custom style for the button container
 * - textStyle: custom style for the button text
 * - size: diameter of the button (default 125)
 * - title: text to display inside the button
 * - onPress: function to call when button is pressed
 */
export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]} // Combine default and custom styles
      onPress={props.onPress} // Handle button press
    >
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

// Styles for the rounded button
const styles = size =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2, // Make the button circular
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2,
    },
    text: { color: "#fff", fontSize: fontSizes.md },
  })
