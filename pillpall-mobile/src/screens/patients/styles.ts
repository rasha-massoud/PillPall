import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import appStyles from "../../constants/appStyles";
import { colors } from '../../constants/palette';

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
    },
    card: {
      height: 22,
      backgroundColor: colors.white,
      borderRadius: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      marginTop: 10,
      flexDirection: 'row',
    },
    nameText: {
      flex: 1,
      ...appStyles.body2,
      fontWeight: '600',
    },
    emailText: {
      flex: 1.5,
      ...appStyles.body2,
      color: colors.darker_gray,
    }
});


export default styles;