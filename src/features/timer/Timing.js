// Import React and necessary components
import React from "react"
import { View, StyleSheet } from "react-native"
import { RoundedButton } from "../../components/RoundedButton"

/**
 * Timing component provides buttons to set or adjust the timer.
 * Props:
 * - setTime: function to set the timer to a specific value
 * - changeTime: function to increment/decrement the timer
 */
export const Timing = ({ setTime, changeTime }) => (
  <View style={styles.container}>
    {/* Row for set time buttons */}
    <View style={styles.row}>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="10"
          onPress={setTime(10)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="15"
          onPress={setTime(15)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="20"
          onPress={setTime(20)}
        />
      </View>
    </View>
    {/* Second row for increment/decrement buttons */}
    <View style={styles.row}>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="+1"
          onPress={changeTime(1)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="-1"
          onPress={changeTime(-1)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="+5"
          onPress={changeTime(5)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="-5"
          onPress={changeTime(-5)}
        />
      </View>
    </View>
  </View>
)

// Styles for the Timing component
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 8,
  },
  timingButton: {
    alignItems: "center",
    marginHorizontal: 4,
  },
})
