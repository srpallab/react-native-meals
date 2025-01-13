import {Text, View, StyleSheet} from "react-native";

function Subtitle({children}) {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{children}</Text>
        </View>
    );
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        color: "#e2b497",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitleContainer: {
        marginBottom: 4,
        padding: 6,
        borderBottomWidth: 2,
        borderBottomColor: "#e2b497",
    },
})
