import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.light_gray,
    overflow: 'hidden',
  },
  docView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  docName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '80%',
  },
  editIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: colors.darker_gray,
    opacity: 0.8,
  },
});

export default styles;