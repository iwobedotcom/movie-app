import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../types";
import { useDimensions } from "../hooks/useDimensions";
import { truncate } from "./utils";

export default function MovieList({
  title,
  hideSeeAll,
  data,
}: {
  title: string;
  hideSeeAll: boolean;
  data: Movie[];
}) {
  const { height, width } = useDimensions("window");
  const navigation = useNavigation();

  return (
    <View className="mb-6 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-xl">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 15 }}
      >
        {data.map((item, idx) => {
          const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          return (
            <TouchableWithoutFeedback
              key={idx}
              onPress={() => (navigation as any).push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: imageUrl }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 font-semibold mt-1 ml-1">
                  {item.title
                    ? truncate(item.title, 14)
                    : item.character
                      ? truncate(item.character, 14)
                      : ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
