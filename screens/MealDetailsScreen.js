import {Button, Image, StyleSheet, Text, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import {MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import IconButton from "../components/IconButton";
import {FavoritesContext} from "../store/context/favorites-context";
import MealBottomSheet from "../components/MealBottomSheet";


function MealDetailsScreen({route, navigation}) {
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
    const favoriteMealsCtx = useContext(FavoritesContext);
    const [bottomSheet, setBottomSheet] = useState();
    const mealIsFavorite = favoriteMealsCtx.mealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(mealId);
        } else {
            favoriteMealsCtx.addFavorite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    iconColor='white'
                    onTaped={changeFavoriteStatusHandler}
                />
            }
        });
    }, [navigation, changeFavoriteStatusHandler])

    function bottomSheetHandler(item) {
        if (item === "Ingredients") {
            setBottomSheet(<MealBottomSheet data={selectedMeal.ingredients}/>);
            console.log("Ingredients")
        } else {
            setBottomSheet(<MealBottomSheet data={selectedMeal.steps}/>);
            console.log("Steps")
        }
    }

    return (

        <View style={styles.container}>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails duration={selectedMeal.duration}
                         complexity={selectedMeal.complexity}
                         affordable={selectedMeal.affordability}
                         textStyle={styles.detailText}
                         style={styles.mealDetailsStyle}
            />
            <Button title="Show Ingredients" onPress={() => bottomSheetHandler("Ingredients")}/>
            <Button title="Show Steps" onPress={() => bottomSheetHandler("Steps")}/>
            {bottomSheet}
        </View>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 16,
        marginBottom: 32,
    },
    title: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        padding: 9,
        fontWeight: "bold",
    },
    detailText: {
        color: "white",
    },
    mealDetailsStyle: {},
    image: {
        width: '100%',
        height: 350,
        borderRadius: 5,
    },
    emptySpace: {
        height: 50,
    }
})
