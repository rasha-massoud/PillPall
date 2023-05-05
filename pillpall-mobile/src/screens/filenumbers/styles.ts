import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import appStyles from "../../constants/appStyles";

const { width, height } = Dimensions.get('window');
const LOGIN_PAGE_WIDTH = width * 0.9;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: LOGIN_PAGE_WIDTH,
      marginHorizontal: width * 0.05, 
    },
    noDataContainer: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      ...appStyles.subTitle,
    }
});


export default styles;