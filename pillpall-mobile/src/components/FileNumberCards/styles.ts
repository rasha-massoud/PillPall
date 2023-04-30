import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 16,
      elevation: 3,
      margin: 16,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    doctorName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    location: {
      fontSize: 16,
      color: '#666',
    },
    fileNumberContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 16,
    },
    fileNumber: {
      fontSize: 24,
      fontWeight: 'bold',
    },
});

export default styles;