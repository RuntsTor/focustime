// Import React and necessary components
import React from "react"
import { View, StyleSheet, Text, FlatList, SafeAreaView } from "react-native"
import { fontSizes, paddingSizes } from "../../utils/sizes"
import { RoundedButton } from "../../components/RoundedButton"

/**
 * FocusHistory component displays a list of previous focus subjects.
 * Props:
 * - focusHistory: array of focus history items ({subject, status, key})
 * - setFocusHistory: function to update/clear the history
 */
export const FocusHistory = ({ focusHistory, setFocusHistory }) => {
  // Handler to clear the history
  const clearHistory = () => {
    setFocusHistory([])
  }

  return (
    <>
      {/* Container for the history list */}
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {/* Title */}
        <Text style={{ fontSize: fontSizes.lg, color: "white" }}>
          Things we've focused on
        </Text>
        {/* Show history if available, otherwise show a placeholder */}
        {!!focusHistory.length && (
          <FlatList
            style={{ width: "100%", height: "100%", paddingTop: 16 }}
            contentContainerStyle={{ alignItems: "center" }}
            data={focusHistory}
            renderItem={({ item }) => (
              <Text style={styles.historyItem(item.status)}>
                {item.subject}
              </Text>
            )}
          />
        )}
        {!focusHistory.length && (
          <Text style={{ color: "white" }}>Nothing yet</Text>
        )}
      </SafeAreaView>
      {/* Button to clear the history */}
      <View style={styles.clearContainer}>
        <RoundedButton
          size={75}
          title="Clear"
          onPress={clearHistory}
        />
      </View>
    </>
  )
}

// Styles for the FocusHistory component
const styles = StyleSheet.create({
  historyItem: status => ({
    color: status > 0 ? "green" : "red", // Green for completed, red for incomplete
    fontSize: fontSizes.md,
  }),
  clearContainer: {
    alignItems: "center",
    padding: paddingSizes.sm,
  },
})
