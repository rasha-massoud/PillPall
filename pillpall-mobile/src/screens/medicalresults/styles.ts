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
    flatList: {
      flexGrow: 1,
      marginTop: 16,
    },
    noDataContainer: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      ...appStyles.subTitle,
    },
    resultsList: {
      flexGrow: 1,
    },
    btn: {
      alignSelf: 'center',
       width: '90%', 
       marginTop: 30, 
       marginBottom: 10, 
       borderRadius:10,
    },
    cardContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    testingDate: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#888888',
    },
});

export default styles;