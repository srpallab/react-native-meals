import {useLayoutEffect} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {CATEGORIES, MEALS} from "../data/dummy-data";
import MealItem from "../components/MealItem";


function MealsOverviewScreen({route, navigation}) {
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter(meal => {
        return meal.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
        navigation.setOptions({title: categoryTitle})
    }, [catId, navigation]);

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
            <FlatList data={displayedMeals}
                      keyExtractor={(item) => item.id}
                      renderItem={renderMeals}
            />
        </View>
    );
}


export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonPressed: {
        opacity: 0.5,
    },
})
