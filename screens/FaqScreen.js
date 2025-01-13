import { View, StyleSheet} from "react-native";
import Subtitle from "../components/MealDetail/Subtitle";

function FaqScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Subtitle>FAQ</Subtitle>
        </View>
    );
}

export default FaqScreen;

const styles = StyleSheet.create({
    container: {}
})
