import {Text, View, StyleSheet} from "react-native";

function MealDetails({duration, complexity, affordable, style, textStyle}) {
    return (
        <View style={[styles.description, style]}>
            <Text style={[styles.descriptionItem, textStyle]}>{duration}</Text>
            <Text style={[styles.descriptionItem, textStyle]}>{complexity.toUpperCase()}</Text>
            <Text style={[styles.descriptionItem, textStyle]}>{affordable.toUpperCase()}</Text>
        </View>
    );
}

export default MealDetails;

const styles = StyleSheet.create({
    description: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    descriptionItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
})
