// Import necessary modules and components
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { uuidv4 } from "./src/utils/uuid"
import { Timer } from "./src/features/timer/Timer"
import { Focus } from "./src/features/focus/Focus"
import { FocusHistory } from "./src/features/focus/FocusHistory"

// Create a stack navigator instance
const Stack = createStackNavigator()

export default function App() {
  // State for the current focus subject
  const [focusSubject, setFocusSubject] = useState(null)
  // State for the history of focus sessions
  const [focusHistory, setFocusHistory] = useState([])

  // Load focusHistory from AsyncStorage when the app mounts
  useEffect(() => {
    const loadFocusHistory = async () => {
      try {
        // Retrieve the stored focus history from local storage
        const history = await AsyncStorage.getItem("focusHistory")
        if (history) {
          setFocusHistory(JSON.parse(history)) // Set state if data exists
        }
      } catch (e) {
        // Log any errors encountered during loading
        console.log("Error loading focus history:", e)
      }
    }
    loadFocusHistory()
  }, [])

  // Save focusHistory to AsyncStorage whenever it changes
  useEffect(() => {
    const saveFocusHistory = async () => {
      try {
        // Store the current focus history in local storage
        await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
      } catch (e) {
        // Log any errors encountered during saving
        console.log("Error saving focus history:", e)
      }
    }
    saveFocusHistory()
  }, [focusHistory])

  // Render the navigation container and stack navigator
  return (
    <NavigationContainer>
      {/* StatusBar for consistent status bar styling */}
      <StatusBar style="light" />
      {/* Stack.Navigator manages navigation between screens */}
      <Stack.Navigator
        initialRouteName="Focus"
        screenOptions={{ headerShown: false }} // Hide default headers
      >
        {/* Focus screen: for entering a new focus subject and viewing history */}
        <Stack.Screen name="Focus">
          {props => (
            // Main container for focus input and history
            <View style={styles.focusContainer}>
              {/* Input component */}
              <Focus
                focusHistory={focusHistory} // Pass current history
                addSubject={subject => setFocusSubject(subject)} // Handler to set new subject
                navigation={props.navigation} // Navigation prop
                route={props.route} // Route prop
              />
              {/* Focus history */}
              <FocusHistory
                focusHistory={focusHistory} // Pass current history
                setFocusHistory={setFocusHistory} // Handler to clear or update history
              />
            </View>
          )}
        </Stack.Screen>
        {/* Timer screen: for running the focus timer */}
        <Stack.Screen name="Timer">
          {props => (
            <Timer
              subject={focusSubject} // Current focus subject
              clearSubject={() => {
                // When timer is cleared, add to history as incomplete (status 0)
                setFocusHistory([
                  ...focusHistory,
                  { subject: focusSubject, status: 0, key: uuidv4() },
                ])
                setFocusSubject(null)
                props.navigation.navigate("Focus") // Navigate back to Focus screen
              }}
              onTimerEnd={() => {
                // When timer ends, add to history as complete (status 1)
                setFocusHistory([
                  ...focusHistory,
                  { subject: focusSubject, status: 1, key: uuidv4() },
                ])
                setFocusSubject(null)
                props.navigation.navigate("Focus") // Navigate back to Focus screen
              }}
              navigation={props.navigation} // Navigation prop
              route={props.route} // Route prop
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Styles for the main container
const styles = StyleSheet.create({
  focusContainer: { flex: 1, backgroundColor: "#252250" }, // Main background color
})
