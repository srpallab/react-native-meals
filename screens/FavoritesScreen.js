import {StyleSheet, Text, View} from 'react-native';
import MealsList from "../components/MealsList/MealsList";
import {MEALS} from "../data/dummy-data";
import {useSelector} from "react-redux";


function FavoritesScreen() {
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);

    const favoriteMeals = MEALS.filter(meal => favoriteMealsIds.includes(meal.id));

    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>You Have No Favorites Meals Yet</Text>
            </View>
        );
    }

    return <MealsList items={favoriteMeals}/>;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    }
})
