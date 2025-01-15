import {Image, Platform, Pressable, StyleSheet, Text, View} from "react-native";
import  {useNavigation} from  '@react-navigation/native'
import MealDetails from "../MealDetails";

function MealItem({id, title, imageUrl, duration, complexity, affordable}) {
    const  navigation = useNavigation();

    function  mealNavigationHandler(){
        navigation.navigate("MealsDetails", {mealId: id})
    }

    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{color: '#ccc'}}
                       style={({pressed}) => pressed ? styles.buttonPressed : null}
                       onPress={mealNavigationHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image style={styles.image} source={{uri: imageUrl}}/>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealDetails duration={duration} complexity={complexity} affordable={affordable}/>
                </View>
            </Pressable>
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 8,
    },
    mealItem: {
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden",
    },
    buttonPressed: {
        opacity:  0.8,
    },

})
