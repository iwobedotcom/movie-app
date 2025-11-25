import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CastMember } from "../types";
import { NavigationProp, NavigationState } from "@react-navigation/native";

export default function CastList({
  data: cast,
  navigation,
}: {
  data: CastMember[];
  navigation: Omit<
    NavigationProp<ReactNavigation.RootParamList>,
    "getState"
  > & {
    getState(): NavigationState | undefined;
  };
}) {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((cst, idx) => {
            const url = `https://image.tmdb.org/t/p/w500${cst.profile_path}`;

            const profileUrl = url ? url : require("../assets/avatar.png");

            return (
              <TouchableOpacity
                key={idx}
                className="mr-4 items-center"
                onPress={() => (navigation as any).navigate("Cast", cst)}
              >
                <Image
                  className="rounded-full h-20 w-20 border border-neutral-500"
                  source={{ uri: profileUrl }}
                />
                <Text className="text-white text-xs mt-1">
                  {cst.name.length > 14
                    ? cst.name.slice(0, 14) + "..."
                    : cst.name}
                </Text>
                <Text className="text-neutral-300 text-xs">
                  {cst.character.length > 14
                    ? cst.character.slice(0, 14) + "..."
                    : cst.character}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
