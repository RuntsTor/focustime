// Import React and necessary hooks/components
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Vibration } from "react-native"
import { ProgressBar, Text } from "react-native-paper"
import { Audio } from "expo-av"
import { useKeepAwake } from "expo-keep-awake"
import { RoundedButton } from "../../components/RoundedButton"

import { Countdown } from "../../components/Countdown"
import { Timing } from "./Timing"
// Helper to convert minutes to milliseconds
const minutesToMillis = min => min * 1000 * 60

/**
 * Timer component manages the countdown timer and related controls.
 * Props:
 * @param {string} subject: the current focus subject
 * @function clearSubject: function to clear the subject and mark as incomplete
 * @function onTimerEnd: function to call when timer completes
 * @function onProgress: function to report progress percentage
 * @function onPause: function to handle pause events
 * @function millis: external milliseconds to control timer (optional)
 * @function setMillis: function to set external milliseconds (optional)
 * @function setTime: function to set the timer to a specific number of minutes
 * @function changeTime: function to increment/decrement the timer by a delta (in minutes) but does not stop timer
 */
export const Timer = ({ subject, clearSubject, onTimerEnd }) => {
  useKeepAwake() // Prevent device from sleeping while timer is running

  // Sound object for playing bell sound
  const soundObject = new Audio.Sound()

  // State for timer minutes, whether started, pause count, and progress
  const [minutes, setMinutes] = useState(0.1)
  // State for remaining milliseconds (for precise control)
  const [millis, setMillis] = useState(minutesToMillis(0.1))
  const [isStarted, setStarted] = useState(false)
  const [pauseCounter, setPauseCounter] = useState(0)
  const [progress, setProgress] = useState(1)

  // Update progress bar as timer counts down
  const onProgress = p => {
    setProgress(p / 100)
  }

  // Increment pause counter when paused
  const onPause = () => {
    setPauseCounter(pauseCounter + 1)
  }

  // Handler for when the timer ends
  const onEnd = async () => {
    try {
      // Play bell sound and vibrate
      await soundObject.loadAsync(require("../../../assets/bell.mp3"))
      await soundObject.playAsync()
      const interval = setInterval(() => Vibration.vibrate(5000), 1000)
      setTimeout(() => {
        clearInterval(interval)
      }, 10000)
    } catch (error) {
      console.log(error)
    }

    setProgress(1) // Reset progress
    setStarted(false) // Stop timer
    setMinutes(20) // Reset to default
    onTimerEnd() // Mark as complete
  }

  // Set timer to a specific number of minutes and stop timer
  const setTime = min => () => {
    setProgress(1)
    setStarted(false)
    setMinutes(min)
    setMillis(minutesToMillis(min))
  }

  // Increment or decrement timer by a delta (in minutes), but do NOT stop timer
  const changeTime = delta => () => {
    setProgress(1)
    setMillis(prevMillis => {
      const newMillis = prevMillis + minutesToMillis(delta)
      // Prevent negative or zero time
      return newMillis > 0 ? newMillis : 1000
    })
    setMinutes(prev => {
      // Keep minutes state in sync for display/other logic
      const newMinutes = prev + delta
      return newMinutes > 0 ? newMinutes : 1
    })
  }

  // Cleanup sound object on unmount
  useEffect(() => {
    return async () => {
      await soundObject.unloadAsync()
    }
  }, [])

  // Render the timer UI
  return (
    <View style={styles.container}>
      {/* Countdown timer display */}
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onPause={onPause}
          onEnd={onEnd}
          onProgress={onProgress}
          millis={millis}
          setMillis={setMillis}
        />
        <View style={{ padding: 50 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{subject}</Text>
        </View>
      </View>
      {/* Progress bar */}
      <View style={styles.progressBarWrapper}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 15 }}
        />
      </View>

      {/* Timer controls for setting and changing time */}
      <View style={styles.buttonWrapper()}>
        <Timing
          setTime={setTime}
          changeTime={changeTime}
        />
      </View>

      {/* Start/Pause button */}
      <View style={styles.buttonWrapper({ flex: 0.3 })}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => setStarted(true)}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => setStarted(false)}
          />
        )}
      </View>
      {/* Button to clear the current subject */}
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  )
}

// Styles for the Timer component
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252250",
    flex: 1,
  },
  countdown: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "white", textAlign: "center" },
  task: { color: "white", fontWeight: "bold", textAlign: "center" },
  buttonWrapper: ({
    flex = 0.25,
    padding = 15,
    justifyContent = "center",
  } = {}) => ({
    flex,
    flexDirection: "row",
    alignItems: "center",
    justifyContent,
    padding,
  }),
  progressBarWrapper: {
    marginTop: -40, // Shift the progress bar up
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
})
