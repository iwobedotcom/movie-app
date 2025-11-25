import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useAtom } from "jotai";
import {
  topRatedMoviesAtom,
  trendingMoviesAtom,
  upcomingMoviesAtom,
} from "../atoms";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/Loader";

export default function HomeScreen() {
  const [trendingMovies] = useAtom(trendingMoviesAtom);
  const [upcomingMovies] = useAtom(upcomingMoviesAtom);
  const [topRatedMovies] = useAtom(topRatedMoviesAtom);

  const isLoading =
    !trendingMovies?.length ||
    !upcomingMovies?.length ||
    !topRatedMovies?.length;

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="my-3">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-2xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity
            onPress={() => (navigation as any).navigate("Search")}
          >
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <Loader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: -85 }}
          >
            {/* trending movies */}
            <TrendingMovies data={trendingMovies} />

            <View className="-mt-24">
              {/* upcoming movies row */}
              <MovieList
                title="Upcoming"
                data={upcomingMovies}
                hideSeeAll={false}
              />

              {/* toprated movies */}
              <MovieList
                title="Top Rated"
                data={topRatedMovies}
                hideSeeAll={false}
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}
