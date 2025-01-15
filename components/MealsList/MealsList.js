import MealItem from "./MealItem";
import {FlatList, StyleSheet, View} from "react-native";

function MealsList({items}) {
    function renderMeals(mealItem) {
        return <MealItem id={mealItem.item.id}
                         title={mealItem.item.title}
                         imageUrl={mealItem.item.imageUrl}
                         duration={mealItem.item.duration}
                         affordable={mealItem.item.affordability}
                         complexity={mealItem.item.complexity}
        />;
    }

    return (
        <View style={styles.container}>
            <FlatList data={items}
                      keyExtractor={(item) => item.id}
                      renderItem={renderMeals}
            />
        </View>
    );
}

export default MealsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonPressed: {
        opacity: 0.5,
    },
})
