import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import QuestionTypeSelector from '../../components/QuestionTypeSelector';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DisplayData from '../../components/DisplayData';
import CustomButton from '../../components/CustomButton';

import styles from './styles';

type QuestionType = 'question' | 'replacement' | 'effect' | 'instruction';

const PersonalAssistant: FC = () => {

    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const handleSelectQuestionType = (questionType: QuestionType) => {
        setSelectedQuestionType(questionType);
    };

    const handleQuestionChange = (text: string) => {
        setQuestion(text);
    };

    const handleSendPress = async () => {
        if (!selectedQuestionType || !question) return;

        const response = await axios.get(`https://api.example.com/answer?questionType=${selectedQuestionType}&question=${question}`);
        setAnswer(response.data);
    }

    return (
  
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Personal Assistant"
            />
            <Image
                source={require('../../../assets/robot.png')}
                style={styles.image}
            />

            <QuestionTypeSelector
                questionTypes={['question', 'replacement', 'effect', 'instruction']}
                selectedQuestionType={selectedQuestionType}
                onSelectQuestionType={handleSelectQuestionType}
            />
            <TextInputwithLabel label="Question" placeholder='Enter your Question' textinputprops={{ secureTextEntry: false }} onChangeText={handleQuestionChange}/>
            {answer && <DisplayData title="Answer" value={answer} />}
            <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Send", onPress: handleSendPress }}  />

        </SafeAreaView>
    );
};

export default PersonalAssistant;
