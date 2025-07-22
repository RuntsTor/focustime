// Import React and necessary hooks/components
import React, { useState, useRef } from "react"
import { TextInput } from "react-native-paper"
import { View, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native" // For navigation
import { RoundedButton } from "../../components/RoundedButton"
import { fontSizes } from "../../utils/sizes"

/**
 * Focus component allows the user to enter a new focus subject.
 * Props:
 * @param focusItem: current focus subject (not used here, but available)
 * @param textInputRef: ref for the TextInput to allow clearing
 * @param navigation: navigation object from React Navigation
 * @function setFocusItem: function to set the current focus subject
 * @function addSubject: function to set the current focus subject
 * @function focusHistory: array of previous focus subjects (not used here, but available)
 * @function clearFocusHistory: function to clear the focus history (not used here, but available)
 * @function handleButtonPress: function to handle the button press or submit event
 * @returns {JSX.Element} Rendered Focus component
 */
export const Focus = ({ addSubject, focusHistory }) => {
  // State for the current input value
  const [focusItem, setFocusItem] = useState(null)
  // Ref for the TextInput to allow clearing
  const textInputRef = useRef(null)
  // Navigation object from React Navigation
  const navigation = useNavigation()

  // Handle the button press or submit event
  const handleButtonPress = () => {
    if (focusItem) {
      addSubject(focusItem) // Set the new focus subject
      setFocusItem(null) // Clear input state
      if (textInputRef.current) {
        textInputRef.current.clear() // Clear the TextInput visually
      }
      navigation.navigate("Timer") // Navigate to the Timer screen
    }
  }

  return (
    <View style={styles.titleContainer}>
      {/* Prompt for the user */}
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.container}>
        {/* Input for entering the focus subject */}
        <TextInput
          ref={textInputRef}
          style={{ flex: 1 }}
          maxLength={50}
          value={focusItem}
          onChangeText={setFocusItem}
          onSubmitEditing={handleButtonPress}
        />
        {/* Button to add the subject and start the timer */}
        <RoundedButton
          style={styles.addSubject}
          size={50}
          title="+"
          onPress={handleButtonPress}
        />
      </View>
    </View>
  )
}

// Styles for the Focus component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange input and button in a row
  },
  titleContainer: { flex: 0.5, padding: 16, justifyContent: "center" },
  title: {
    color: "white",
    fontWeight: "bold",
    padding: 16,
    fontSize: fontSizes.lg,
  },
  addSubject: { marginLeft: 10, alignSelf: "center" },
})
