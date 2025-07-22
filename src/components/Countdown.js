// Import React and necessary hooks
import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { fontSizes, paddingSizes } from "../utils/sizes"

// Helper function to convert minutes to milliseconds
const minutesToMillis = min => min * 1000 * 60
// Helper function to format time as two digits
const formatTime = time => (time < 10 ? `0${time}` : time)

/**
 * Countdown component displays a timer that counts down from a given number of minutes.
 * Props:
 * @param {number} minutes: initial minutes to count down from
 * @param {boolean} isPaused: whether the countdown is paused
 * @function onStart: callback when countdown starts
 * @function onPause: callback when countdown pauses
 * @function onEnd: callback when countdown ends
 * @function onProgress: callback for progress updates (percentage)
 */
export const Countdown = ({
  minutes = 20,
  isPaused,
  onStart = () => {},
  onPause = () => {},
  onEnd = () => {},
  onProgress = () => {},
  millis: externalMillis,
  setMillis: setExternalMillis,
}) => {
  // State for remaining milliseconds (if not controlled externally)
  const [internalMillis, setInternalMillis] = useState(minutesToMillis(minutes))
  // Use external millis if provided, otherwise use internal state
  const millis = externalMillis !== undefined ? externalMillis : internalMillis
  const setMillis = setExternalMillis || setInternalMillis
  // Ref to store the interval ID
  const interval = React.useRef(null)

  // Function to decrement the timer by 1 second
  const countDown = () =>
    setMillis(time => {
      if (time === 0) {
        clearInterval(interval.current)
        setTimeout(onEnd, 0) // Defer the call to avoid React update error
        return time
      }
      const timeLeft = time - 1000
      onProgress((timeLeft / minutesToMillis(minutes)) * 100) // Report progress
      return timeLeft
    })

  // Reset timer when minutes prop changes (only if not externally controlled)
  useEffect(() => {
    if (!setExternalMillis) {
      setMillis(minutesToMillis(minutes))
    }
  }, [minutes])

  // Start or pause the countdown based on isPaused
  useEffect(() => {
    if (isPaused) {
      onPause()
      if (interval.current) clearInterval(interval.current)
      return
    }
    onStart()
    interval.current = setInterval(countDown, 1000)

    // Cleanup interval on unmount or when isPaused changes
    return () => clearInterval(interval.current)
  }, [isPaused])

  // Calculate minutes and seconds for display
  const minute = Math.floor(millis / 1000 / 60) % 60
  const seconds = Math.floor(millis / 1000) % 60
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  )
}

// Styles for the countdown text
const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: "#fff",
    padding: paddingSizes.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
})
