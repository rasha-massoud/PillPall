import { StyleSheet } from 'react-native';
import appStyles from "../../constants/appStyles";

const styles = StyleSheet.create({
    monthItem: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    selectedMonthItem: {
      backgroundColor: 'blue',
    },
    monthText: {
      ...appStyles.body2,
    },
    selectedMonthText: {
      color: 'white',
    },
});

export default styles;