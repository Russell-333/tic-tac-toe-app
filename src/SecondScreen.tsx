import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// Define props type including the 'size' param from route
type Props = NativeStackScreenProps<RootStackParamList, 'Second'>;

/**
 * SecondScreen component
 * params: Props (contains route.params.size)
 * returns: Game interface with dynamic board and interaction handling
 */
const SecondScreen: React.FC<Props> = ({ route }) => {
  const { size } = route.params;
  const [board, setBoard] = useState<string[]>(Array(size * size).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  /**
   * Determine the winner or if it's a draw
   * params: newBoard (updated board state)
   * returens: 'X' | 'O' | 'Draw' | null(not finish yet)
   */
  const checkWinner = (newBoard: string[]) => {
    const lines: number[][] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      const col: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
        col.push(j * size + i);
      }
      lines.push(row, col);
    }
    const diag1 = Array.from({ length: size }, (_, i) => i * size + i);
    const diag2 = Array.from({ length: size }, (_, i) => (i + 1) * size - (i + 1));
    lines.push(diag1, diag2);

    for (let line of lines) {
      const [first, ...rest] = line;
      if (newBoard[first] && rest.every(index => newBoard[index] === newBoard[first])) {
        return newBoard[first];
      }
    }
    if (newBoard.every(cell => cell !== '')) return 'Draw';
    return null;
  };

  /**
   * Handle player's move when a cell is pressed
   * params: index (the pressed cell index)
   * implements: Updates the board and checks the game status
   */
  const handlePress = (index: number) => {
    if (board[index] !== '' || winner) return;
    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    const result = checkWinner(updatedBoard);
    if (result) {
      setWinner(result);
      if (result === 'Draw') {
        Alert.alert("It's a draw!");
      } else {
        Alert.alert(`Player ${result} wins!`);
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  /**
   * Reset the game state: clears board, resets player and winner
   */
  const resetGame = () => {
    setBoard(Array(size * size).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>USER vs USER</Text>
        <Text style={styles.subtitle}>{winner ? (winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`) : 'Game in progress'}</Text>

        {/* Render the game board as rows of cells */}
        <View style={styles.board}>
          {Array.from({ length: size }).map((_, row) => (
            <View key={row} style={styles.row}>
              {Array.from({ length: size }).map((_, col) => {
                const index = row * size + col;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.cell}
                    onPress={() => handlePress(index)}
                  >
                    <Text style={styles.cellText}>{board[index]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Show current player and reset button */}
        {!winner && <Text style={styles.status}>Player {currentPlayer}'s turn</Text>}
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetText}>Start over</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// Style definitions for the game screen
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 16,
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  cellText: {
    fontSize: 32,
  },
  status: {
    marginBottom: 20,
    fontSize: 16,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 6,
  },
  resetText: {
    fontSize: 16,
  },
});

export default SecondScreen;