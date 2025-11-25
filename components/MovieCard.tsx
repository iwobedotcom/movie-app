import { Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Movie } from "../types";

type MovieCardProp = {
  item: Movie;
  handlePress: (item: Movie) => void;
  height: number;
  width: number;
};

export default function MovieCard({
  item,
  height,
  width,
  handlePress,
}: MovieCardProp) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: width * 0.94,
          height: height,
          borderRadius: 10,
          marginHorizontal: 12,
        }}
        resizeMode="contain"
      />
    </TouchableWithoutFeedback>
  );
}
