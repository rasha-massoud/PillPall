import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import appStyles from '../../constants/appStyles';

import styles from './styles';

type QuestionType = 'question' | 'replacement' | 'effect' | 'instruction';

type QuestionTypeSelectorProps = {
  questionTypes: QuestionType[];
  selectedQuestionType: QuestionType | null;
  onSelectQuestionType: (questionType: QuestionType) => void;
};

const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = (props) => {
  const [showQuestionTypes, setShowQuestionTypes] = useState(false);

  const handleQuestionTypePress = (questionType: QuestionType) => {
    if (questionType !== props.selectedQuestionType) {
      props.onSelectQuestionType(questionType);
    }
  };

  const toggleQuestionTypes = () => {
    setShowQuestionTypes(!showQuestionTypes);
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.body1}>Question Type</Text>
      <TouchableOpacity onPress={toggleQuestionTypes}>
        <View style={styles.questionTypesTitle}>
          <Text style={styles.questionTypesTitleText}>{props.selectedQuestionType || 'Select Question Type'}</Text>
          <MaterialIcons name={showQuestionTypes ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {showQuestionTypes && (
        <View style={styles.questionTypeList}>
          {props.questionTypes.map((questionType) => (
            <TouchableOpacity key={questionType} onPress={() => handleQuestionTypePress(questionType)}>
              <View style={[styles.questionTypeItem, questionType === props.selectedQuestionType && styles.selectedQuestionTypeItem]}>
                <Text style={[styles.questionTypeText, questionType === props.selectedQuestionType && styles.selectedQuestionTypeText]}>{questionType}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default QuestionTypeSelector;

