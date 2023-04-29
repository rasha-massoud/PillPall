import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
    calendar: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    calendar: {
        marginTop: 30 ,
    },
});

export default styles