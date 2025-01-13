import {Animated, Button, Image, PanResponder, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import {WINDOW_HEIGHT} from "../utils";
import {useLayoutEffect, useRef, useState} from "react";
import {MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.2;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;


function MealDetailsScreen({route, navigation}) {
    const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0))
    const lastGestureDy = useRef(0);
    const animatedValueSteps = useRef(new Animated.Value(0)).current;
    const animatedValueIngredients = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gesture) => {
                console.log("Grant : ", lastGestureDy.current);
                animatedValue.setOffset(lastGestureDy.current);
            },
            onPanResponderMove: (e, gesture) => {

                animatedValue.setValue(gesture.dy);
            },
            onPanResponderRelease: (e, gesture) => {
                console.log("Release : ", gesture.dy);
                lastGestureDy.current += gesture.dy;
                animatedValue.flattenOffset();

                if (gesture.dy > 0) {
                    // dragging down
                    if (gesture.dy <= DRAG_THRESHOLD) {
                        springAnimation('up');
                    } else {
                        console.log("Down Motion Grant: ", lastGestureDy.current);
                        if (lastGestureDy.current === gesture.dy) {
                            Animated.spring(animatedHeight, {
                                toValue: 0,
                                speed: 8,
                                bounciness: 2,
                            }).start();
                            console.log(animatedHeight);
                        }
                        springAnimation('down');
                    }
                } else {
                    // dragging up
                    if (gesture.dy >= -DRAG_THRESHOLD) {
                        springAnimation('down');
                    } else {
                        springAnimation('up');
                    }
                }
            },
        })
    ).current;

    const springAnimation = (direction) => {
        console.log("Direction : ", direction);
        lastGestureDy.current = direction === "down" ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;

        Animated.spring(animatedValueSteps, {
            toValue: lastGestureDy.current,
            useNativeDriver: false,
        }).start();
    }

    const bottomSheetAnimation = {
        transform: [{
            translateY: animatedValueSteps.interpolate(
                {
                    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    extrapolate: 'clamp',
                }
            )
        }]
    }

    const interpolatedHeight = animatedValueSteps.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"]
    })

    function stepsBottomSheetHandler() {
        Animated.spring(animatedHeight, {
            toValue: 100,
            speed: 8,
            bounciness: 2,
        }).start();
        console.log(animatedHeight);
    }
    function ingredientsBottomSheetHandler() {
        Animated.spring(animatedHeight, {
            toValue: 100,
            speed: 8,
            bounciness: 2,
        }).start();
        console.log(animatedHeight);
    }
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    function headerButtonHandler() {
        console.log("Fev Pressed");
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton
                    icon='star'
                    iconColor='white'
                    onTaped={headerButtonHandler}
                />
            }
        });
    }, [navigation, headerButtonHandler])

    return (
        <>
            <View style={styles.container}>
                <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
                <Text style={styles.title}>{selectedMeal.title}</Text>
                <MealDetails duration={selectedMeal.duration}
                             complexity={selectedMeal.complexity}
                             affordable={selectedMeal.affordability}
                             textStyle={styles.detailText}
                             style={styles.mealDetailsStyle}
                />
                <Button title="Show Ingridents" onPress={ingredientsBottomSheetHandler}/>
                <Button title="Show Steps" onPress={stepsBottomSheetHandler}/>
            </View>

            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation, {height: interpolatedHeight}]}>
                <View style={styles.draggableArea} {...panResponder.panHandlers}>
                    <View style={styles.dragHandle}/>
                </View>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectedMeal.ingredients}/>
            </Animated.View>

            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation, {height: interpolatedHeight}]}>
                <View style={styles.draggableArea} {...panResponder.panHandlers}>
                    <View style={styles.dragHandle}/>
                </View>
                <ScrollView>
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps}/>
                </ScrollView>
            </Animated.View>
        </>

    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    bottomSheet: {
        position: 'absolute',
        width: '100%',
        height: 0,
        bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
        backgroundColor: '#351401',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        ...Platform.select({
            android: {
                elevation: 3,
            },
            ios: {
                shadowColor: '#a8bed2',
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                }
            },
        })
    },
    draggableArea: {
        width: '132',
        height: 32,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dragHandle: {
        width: 100,
        height: 5,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 350,
        borderRadius: 5,
    },
    emptySpace: {
        height: 50,
    }
})
