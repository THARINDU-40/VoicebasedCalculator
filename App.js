import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';

const Calculator = () => {
  const [result, setResult] = useState('');
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = handleSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleButtonPress = (value) => {
    setResult(result + value);
  };

  const handleCalculate = () => {
    setResult(eval(result));
  };

  const handleClear = () => {
    setResult('');
  };

  const handleSpeechResults = (event) => {
    const transcript = event.value[0];
    setVoiceInput(transcript);
    interpretVoiceInput(transcript);
  };

  const interpretVoiceInput = (transcript) => {
    const command = transcript.toLowerCase();

    switch (command) {
      case 'add':
        handleButtonPress('+');
        break;
      case 'subtract':
        handleButtonPress('-');
        break;
      case 'multiply':
        handleButtonPress('*');
        break;
      case 'divide':
        handleButtonPress('/');
        break;
      case 'zero':
        handleButtonPress('0');
        break;
      case 'one':
        handleButtonPress('1');
        break;
      case 'two':
        handleButtonPress('2');
        break;
      // Add more cases for other commands
      default:
        break;
    }
  };

  const startVoiceRecognition = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopVoiceRecognition = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <Text style={styles.voiceInput}>{voiceInput}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.voiceButton, isListening ? styles.listeningButton : null]}
        onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
      >
        <Text style={styles.voiceButtonText}>{isListening ? 'Listening...' : 'Start Voice Input'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  result: {
    fontSize: 48,
    marginBottom: 24,
  },
  voiceInput: {
    fontSize: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: 64,
    height: 64,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 24,
  },
  voiceButton: {
    marginTop: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: 300,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningButton: {
    backgroundColor: 'gray',
  },
  voiceButtonText: {
    fontSize: 18,
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: 'gray',
    borderRadius: 8,
    width: 300,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Calculator;