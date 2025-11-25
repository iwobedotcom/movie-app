import { View } from "react-native";
import { useDimensions } from "../hooks/useDimensions";
import * as Progress from "react-native-progress";

export default function Loader() {
  const { height, width } = useDimensions("window");
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={12} size={160} color="#eab308" />
    </View>
  );
}
