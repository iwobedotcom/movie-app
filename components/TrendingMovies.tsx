import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";
import { useDimensions } from "../hooks/useDimensions";
import { Movie } from "../types";

export default function TrendingMovies({
  data: trendingMovies,
}: {
  data: Movie[];
}) {
  const { width, height } = useDimensions("window");

  const navigation = useNavigation();

  const handlePressTM = (item: Movie[]) => {
    (navigation as any).navigate("Movie", item);
  };

  return (
    <View>
      <Carousel
        data={trendingMovies}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            height={height}
            width={width}
            handlePress={() => {}}
          />
        )}
        width={width}
        height={height}
        mode="parallax"
        scrollAnimationDuration={800}
        loop
        pagingEnabled
        snapEnabled
      />
    </View>
  );
}
