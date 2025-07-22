import React, { useState, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes } from '../../utils/sizes';

export const Focus = ({ addSubject, focusHistory }) => {
  const [focusItem, setFocusItem] = useState(null);
  // Create a ref for the TextInput

  const textInputRef = useRef(null);
  const navigation = useNavigation();
  // Function to handle button press
  const handleButtonPress = () => {
    if (focusItem) {
      addSubject(focusItem); // Call the addSubject function
      setFocusItem(null);
      if (textInputRef.current) {
        textInputRef.current.clear();
      }
      navigation.navigate('Timer'); // Navigate to the Timer screen
    }
  };

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.container}>
        <TextInput
          ref={textInputRef}
          style={{ flex: 1 }}
          maxLength={50}
          value={focusItem}
          onChangeText={setFocusItem}
          onSubmitEditing={handleButtonPress}
        />
        <RoundedButton
          style={styles.addSubject}
          size={50}
          title="+"
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleContainer: { flex: 0.5, padding: 16, justifyContent: 'center' },
  title: {
    color: 'white',
    fontWeight: 'bold',
    padding: 16,
    fontSize: fontSizes.lg,
  },
  addSubject: { marginLeft: 10, alignSelf: 'center' },
});
