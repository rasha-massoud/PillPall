import React, { FC, useState } from 'react';
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
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const handleSelectQuestionType = (questionType: QuestionType) => {
    setSelectedQuestionType(questionType);
  };

  const handleQuestionChange = (text: string) => {
    setQuestion(text);
  };

  const handleSendPress = async () => {
    if (!selectedQuestionType || !question) return;

    setIsLoading(true);

    const token = await AsyncStorage.getItem('token');

    const data = new FormData();
    data.append('prompt', question);

    if (question == 'replacement'){
        const endpoint = 'chatbot/replacement';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            setAnswer(response.data);
            if (response.data.status == 'success'){
                Alert.alert(
                    'Success',
                    'Answer Retrived Successfully.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            setIsLoading(false);
            Alert.alert(
                'Fails',
                'Personal Assistance Fails.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        });
    } else if (question == 'effect'){
        const endpoint = 'chatbot/effect';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            setAnswer(response.data);
            if (response.data.status == 'success'){
                Alert.alert(
                    'Success',
                    'Answer Retrived Successfully.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            setIsLoading(false);
            Alert.alert(
                'Fails',
                'Personal Assistance Fails.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        });
    } else if (question == 'instruction'){
        const endpoint = 'chatbot/instruction';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            setAnswer(response.data);
            if (response.data.status == 'success'){
                Alert.alert(
                    'Success',
                    'Answer Retrived Successfully.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            setIsLoading(false);
            Alert.alert(
                'Fails',
                'Personal Assistance Fails.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        });
    } else {
        const endpoint = 'chatbot/question';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            setAnswer(response.data);
            if (response.data.status == 'success'){
                Alert.alert(
                    'Success',
                    'Answer Retrived Successfully.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            setIsLoading(false);
            Alert.alert(
                'Fails',
                'Personal Assistance Fails.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        });
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