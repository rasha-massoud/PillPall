import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: LOGIN_PAGE_WIDTH,
      marginHorizontal: width * 0.05, 
    },
    flatList: {
      flexGrow: 1,
      marginTop: 16,
    },
});

export default styles;