import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import HabitsMultiSelectChecklist from '../../components/HabitsMultiSelectCheckList';

import styles from './styles';

const MedicationsAndHabits: FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const handleSelectOption = (option: string) => {
        const index = selectedOptions.indexOf(option);
        if (index > -1) {
          setSelectedOptions([...selectedOptions.slice(0, index), ...selectedOptions.slice(index + 1)]);
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <PageTitle title='Medications And Habits' />
        <StepText title='Step 6' color={colors.blue}></StepText>

        <Body1Text context="Finally, you are asked to fill your current medications and lifestyle habits. This information is important for healthcare professionals to determine potential drug interactions, as well as to provide guidance on healthy lifestyle habits that can help improve the patient's overall health."></Body1Text>

        <TextInputwithLabel label="Current Medications" placeholder='Enter your Current Medications if any' textinputprops={{ secureTextEntry: false }}/>
        
        <HabitsMultiSelectChecklist selectedOptions={selectedOptions} onSelectOption={handleSelectOption}/>
        
        <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Submit", onPress: () => console.log('Submit') }}  />

    </SafeAreaView>
  );
};

export default MedicationsAndHabits;