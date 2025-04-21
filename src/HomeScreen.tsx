import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// Define props type including the navigation object
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**
 * HomeScreen component
 * params: Props (contains navigation)
 * returns: UI allowing user to select board size and navigate to Second screen
 */
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [boardSize, setBoardSize] = useState<number>(3);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Tic Tac Toe</Text>

      {/* Board size selection buttons */}
      <View style={styles.optionsRow}>
        {[3, 4, 5].map(size => (
          <TouchableOpacity
            key={size}
            style={[styles.optionButton, boardSize === size && styles.selectedButton]}
            onPress={() => setBoardSize(size)}
          >
            <Text style={styles.optionText}>{size}x{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subText}>User vs User Mode</Text>

      {/* Navigate to Second screen and pass board size as param */}
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Second', { size: boardSize })}>
        <Text style={styles.startText}>Start game</Text>
      </TouchableOpacity>
      
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    optionsRow: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    optionButton: {
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 8,
    },
    selectedButton: {
      backgroundColor: '#ddd',
    },
    optionText: {
      fontSize: 16,
    },
    subText: {
      fontSize: 16,
      marginBottom: 40,
    },
    startButton: {
      borderWidth: 1,
      borderColor: '#333',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
    },
    startText: {
      fontSize: 18,
    },
  });
  
export default HomeScreen;