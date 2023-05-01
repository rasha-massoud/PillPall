import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';
import SubTitleText from '../../components/SubTitleText';
import GenderCheckBox from '../../components/GenderCheckBox';
import HabitsMultiSelectChecklist from '../../components/HabitsMultiSelectCheckList';

import styles from './styles';

const EditReport: FC = () => {
      
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [gender, setGender] = useState<string | undefined>();

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const handleSelectOption = (option: string) => {
        const index = selectedOptions.indexOf(option);
        if (index > -1) {
          setSelectedOptions([...selectedOptions.slice(0, index), ...selectedOptions.slice(index + 1)]);
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handleGenderSelect = (selectedGender: string) => {
        setGender(selectedGender);
    };

    const handleEditPress = () => {

    };

    const handleCancelPress = () => {
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Edit Report"
            />

            <ScrollView>

                <AddImage/>

                <SubTitleText title='Contact Information' />
                <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
                <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />
                <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} />
                <TextInputwithLabel label="Address" placeholder='Enter your Address' textinputprops={{ secureTextEntry: false }}/>
                <GenderCheckBox selectedGender={gender} onGenderSelect={handleGenderSelect} />
        
                <SubTitleText title='Anthropometric Measurements' />
                <TextInputwithLabel label="Blood Type" placeholder='Enter your Blood Type' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Height (cm)" keyboardType="numeric" placeholder='Enter your Height' textinputprops={{ secureTextEntry: false }} />
                <TextInputwithLabel label="Weight (Kg)" keyboardType="numeric" placeholder='Enter your Weight' textinputprops={{ secureTextEntry: false }}/>
                
                <SubTitleText title='Emergency Contact Info Measurements' />
                <TextInputwithLabel label="Name" placeholder='Enter your Name' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} />
                <TextInputwithLabel label="Email" keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Relation" placeholder='Enter your Relation with the Contact' textinputprops={{ secureTextEntry: false }}/>

                <SubTitleText title='Vital Signs' />
                <TextInputwithLabel label="Normal Body Temperature (°C)" keyboardType="numeric" placeholder='Enter your Normal Body Temperature' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Normal Pulse Rate " keyboardType="numeric" placeholder='Enter your Normal Pulse Rate' textinputprops={{ secureTextEntry: false }} />
                <TextInputwithLabel label="Normal Respiration Rate" keyboardType="numeric" placeholder='Enter your Normal Respiration Rate' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Normal Systolic Blood Pressure" keyboardType="numeric" placeholder='Enter your Normal Systolic Blood Pressure' textinputprops={{ secureTextEntry: false }}/>

                <SubTitleText title='Medical History' />
                <TextInputwithLabel label="Chronic Condition or Illness" placeholder='Enter your Chronic Condition or Illness if any' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Past Surgeries or Hospitalizations" placeholder='Enter your Past Surgeries or Hospitalizations if any' textinputprops={{ secureTextEntry: false }} />
                <TextInputwithLabel label="Family Medical History" placeholder='Enter your Family Medical History if any' textinputprops={{ secureTextEntry: false }}/>
                <TextInputwithLabel label="Allergies" placeholder='Enter your Allergies if any' textinputprops={{ secureTextEntry: false }}/>

                <SubTitleText title='Current Medications' />
                <TextInputwithLabel label="Current Medications" placeholder='Enter your Current Medications if any' textinputprops={{ secureTextEntry: false }}/>
            
                <SubTitleText title='Life Style Habits' />
                <HabitsMultiSelectChecklist selectedOptions={selectedOptions} onSelectOption={handleSelectOption}/>
            
            </ScrollView>

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Edit", onPress: handleEditPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default EditReport;