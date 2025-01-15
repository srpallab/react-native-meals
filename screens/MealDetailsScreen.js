import {Button, Image, StyleSheet, Text, View} from "react-native";
import { useLayoutEffect, useState} from "react";
import {MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import IconButton from "../components/IconButton";
import MealBottomSheet from "../components/MealBottomSheet";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, removeFavorite} from "../store/redux/favorites";


function MealDetailsScreen({route, navigation}) {
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
   // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();
    const [bottomSheet, setBottomSheet] = useState();
    const mealIsFavorite = favoriteMealsIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            // favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({id: mealId}));
        } else {
            // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({id: mealId}));
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
