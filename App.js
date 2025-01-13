import CategoriesScreen from "./screens/CategoriesScreen";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FaqScreen from "./screens/FaqScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import {Ionicons} from "@expo/vector-icons";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator id="Home"
                          screenOptions={{
                              headerStyle: {backgroundColor: '#351401'},
                              headerTintColor: 'white',
                              sceneStyle: {backgroundColor: '#3f2f25'},
                              drawerContentStyle: {backgroundColor: '#3f2f25'},
                              drawerActiveTintColor: '#351401',
                              drawerActiveBackgroundColor: '#e4baa1',
                              drawerInactiveTintColor: 'white',
                          }}
        >
            <Drawer.Screen name="Categories"
                           component={CategoriesScreen}
                           options={{
                               drawerIcon: ({ color, size }) =>(
                                   <Ionicons name='list' color={color} size={size} />
                               )
                           }}
            />
            <Drawer.Screen name="Favorites"
                           component={FavoritesScreen}
                           options={{
                               drawerIcon: ({ color, size }) =>(
                                   <Ionicons name='star' color={color} size={size} />
                               )
                           }}
            />
            <Drawer.Screen name="FAQ"
                           component={FaqScreen}
                           options={{
                               drawerIcon: ({ color, size }) =>(
                                   <Ionicons name='information' color={color} size={size} />
                               )
                           }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light'/>
            <NavigationContainer>
                <Stack.Navigator id='MealsApp'
                                 screenOptions={{
                                     headerStyle: {backgroundColor: '#351401'},
                                     headerTintColor: 'white',
                                     contentStyle: {backgroundColor: '#3f2f25'},
                                 }}>
                    <Stack.Screen name="MealsCategories"
                                  component={DrawerNavigator}
                                  options={{headerShown: false}}
                    />
                    <Stack.Screen name="MealsOverview"
                                  component={MealsOverviewScreen}
                    />
                    <Stack.Screen name="MealsDetails"
                                  component={MealDetailsScreen}
                                  options={{title: 'About The Meal'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}


