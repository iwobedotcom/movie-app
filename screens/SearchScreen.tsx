import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDimensions } from "../hooks/useDimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import debounce from "debounce";
import { useAtom } from "jotai";
import { searchMoviesAtom } from "../atoms";
import { Movie } from "../types";

export default function SearchScreen() {
  const { height, width } = useDimensions("window");
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");

  const [searchMovies] = useAtom(searchMoviesAtom(searchQuery));

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleDebounceInputChange = debounce(handleInputChange, 300);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 p-4">
      <View className="mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleDebounceInputChange}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => (navigation as any).navigate("Home")}
          className="rounded-full p-2 m-1 bg-neutral-500"
        >
          <XMarkIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* results */}

      {searchMovies && searchMovies.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1 mb-4">
            Results ({searchMovies ? searchMovies.length : 0})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {searchMovies.map((movie: Movie) => {
              const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              return (
                <TouchableWithoutFeedback
                  key={movie.id}
                  onPress={() => (navigation as any).push("Movie", movie)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{ uri: imageUrl }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1 mt-1">
                      {movie.title.slice(0, 18) + "..."}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../assets/no-results.png")}
            style={{ width: width * 0.6, height: height * 0.3 }}
          />
          <Text className="text-white font-semibold">No Result</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
