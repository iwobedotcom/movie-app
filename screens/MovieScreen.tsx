import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { useDimensions } from "../hooks/useDimensions";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import { useAtom } from "jotai";
import {
  movieCreditsAtom,
  movieDetailsAtom,
  similarMoviesAtom,
} from "../atoms";
import MovieList from "../components/MovieList";
import { Movie, MovieDetails } from "../types";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const { poster_path, title, overview, release_date, id } = item as Movie;

  const navigation = useNavigation();

  const [credits] = useAtom(movieCreditsAtom(id));
  const [similarMovies] = useAtom(similarMoviesAtom(id));
  const [movieDetails] = useAtom(movieDetailsAtom(id));

  const { genres, runtime } = movieDetails as MovieDetails;

  const { width, height } = useDimensions("window");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {}, [item]);

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center p-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size={35} color={isFavorite ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        <View className="relative">
          <Image
            source={{ uri: posterUrl }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23, 1)"]}
            className="absolute bottom-0 left-0 right-0 h-[60%]"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider leading-none mb-2 mx-5">
          {title}
        </Text>

        {/* status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Release: {release_date ? new Date(release_date).getFullYear() : "N/A"}{" "}
          • Runtime: {runtime ? runtime + " min" : "N/A"}
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {genres.map((genre, idx) => (
            <Text
              key={genre.id}
              className="text-neutral-400 font-semibold text-base text-center"
            >
              {genre.name}
              {idx !== genres.length - 1 && " •"}{" "}
            </Text>
          ))}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide text-center">
          {overview.length > 300 ? overview.slice(0, 300) + "..." : overview}
        </Text>
      </View>

      {/* list of casts */}
      <CastList navigation={navigation} data={credits} />

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
}
