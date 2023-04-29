import { StyleSheet, ViewStyle } from "react-native";

const styles = StyleSheet.create({
    timingItem: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    selectedTimingItem: {
      backgroundColor: 'blue',
    },
    timingText: {
      fontSize: 18,
    },
    selectedTimingText: {
      color: 'white',
    },
});

export default styles;