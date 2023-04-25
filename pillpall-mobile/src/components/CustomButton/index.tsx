import { Button, ButtonProps, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import styles from './styles'

interface CustomButtonProps  {
  buttonprops: ButtonProps
}

const CustomButton: FC<CustomButtonProps> = (props) => {
  return (
    <>
        <TouchableOpacity  
            onPress={props.buttonprops.onPress} 
            style={styles.buttonContainer}>

            <Text style={styles.buttonText}>{props.buttonprops.title}</Text>
        </TouchableOpacity>
    </>
  )
}

export default CustomButton