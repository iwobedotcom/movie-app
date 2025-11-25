import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import CastScreen from "../screens/CastScreen";
import SearchScreen from "../screens/SearchScreen";

const AppStack = createNativeStackNavigator({
  screenOptions: {
    animation: "slide_from_right",
    headerShown: false,
  },
  screens: {
    Home: HomeScreen,
    Movie: MovieScreen,
    Cast: CastScreen,
    Search: SearchScreen,
  },
});

export const AppNavigation = createStaticNavigation(AppStack);
