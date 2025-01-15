import {Animated, PanResponder, Platform, StyleSheet, View} from "react-native";
import List from "./MealDetail/List";
import {useRef, useState} from "react";
import {WINDOW_HEIGHT} from "../utils";


const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.2;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;


function MealBottomSheet({data}) {
    const [animatedHeight] = useState(new Animated.Value(0))
    const lastGestureDy = useRef(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

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
                                useNativeDriver: false,
                            },).start();
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

        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: false,
        }).start();
    }

    const bottomSheetAnimation = {
        transform: [{
            translateY: animatedValue.interpolate(
                {
                    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    extrapolate: 'clamp',
                }
            )
        }]
    }

    const interpolatedHeight = animatedHeight.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"]
    })


    Animated.spring(animatedHeight, {
        toValue: 100,
        speed: 8,
        bounciness: 2,
        useNativeDriver: false,
    }).start();
    console.log(animatedHeight);


    return (
           <Animated.View style={[styles.bottomSheet, bottomSheetAnimation, {height: interpolatedHeight}]}>
               <View style={styles.draggableArea} {...panResponder.panHandlers}>
                   <View style={styles.dragHandle}/>
               </View>
               <List data={data}/>
           </Animated.View>
    );
}

export default MealBottomSheet;


const styles = StyleSheet.create({
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
});
