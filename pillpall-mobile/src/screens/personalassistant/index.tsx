import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, Image, Text, Alert } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import QuestionTypeSelector from '../../components/QuestionTypeSelector';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DisplayData from '../../components/DisplayData';
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

type QuestionType = 'question' | 'replacement' | 'effect' | 'instruction';

const PersonalAssistant: FC = () => {

  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectQuestionType = (questionType: QuestionType) => {
    setSelectedQuestionType(questionType);
  };

  const handleQuestionChange = (text: string) => {
    setQuestion(text);
  };

  const handleSendPress = async () => {

    if (!selectedQuestionType || !question) return;
    setIsLoading(true);
  

    const data = new FormData();
    data.append('prompt', question);
  
    let endpoint = '';
  
    switch (selectedQuestionType) {
      case 'replacement':
        endpoint = 'chatbot/replacement';
        break;
      case 'effect':
        endpoint = 'chatbot/effect';
        break;
      case 'instruction':
        endpoint = 'chatbot/instruction';
        break;
      default:
        endpoint = 'chatbot/question';
    }
  
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
      setAnswer(response.data.answer);
      if (response.data.status != 'success') {
        Alert.alert(
          'Failure',
          'Request fails.',
          [
            { text: 'OK' }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        'Fails',
        'Personal Assistance Fails.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Personal Assistant" />
      <Image source={require('../../../assets/robot.png')} style={styles.image} />

      <QuestionTypeSelector
        questionTypes={['question', 'replacement', 'effect', 'instruction']}
        selectedQuestionType={selectedQuestionType}
        onSelectQuestionType={handleSelectQuestionType}
      />
      <TextInputwithLabel
        label="Question"
        placeholder="Enter your Question"
        textinputprops={{ secureTextEntry: false }}
        onChangeText={handleQuestionChange}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {answer && <DisplayData title="Answer" value={answer} />}
          <Text>{answer}</Text>

          <CustomButton
            containerStyle={{ alignSelf: 'center' }}
            buttonprops={{ title: 'Send', onPress: handleSendPress }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default PersonalAssistant;