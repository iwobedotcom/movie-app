import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { useDimensions } from "../hooks/useDimensions";
import { useAtom } from "jotai";
import { personCreditsAtom, personDetailsAtom } from "../atoms";
import MovieList from "../components/MovieList";
import { CastMember, PersonDetails } from "../types";

export default function CastScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [showFullBio, setShowFullBio] = useState(false);
  const limit = 500;

  const toggleShowBio = () => setShowFullBio(!showFullBio);

  const { name, profile_path, id } = item as CastMember;
  const [personDetails] = useAtom(personDetailsAtom(id));
  const {
    id: person_id,
    place_of_birth,
    gender,
    birthday,
    known_for_department,
    popularity,
    biography,
  } = personDetails as PersonDetails;

  let genderText: string;

  switch (gender) {
    case 0:
      genderText = "Not set / not specified";
      break;
    case 1:
      genderText = "Female";
      break;
    case 2:
      genderText = "Male";
      break;
    case 3:
      genderText = "Non-binary";
    default:
      genderText = "Unknown";
  }

  const [personMovies] = useAtom(personCreditsAtom(person_id));

  const imageUrl = `https://image.tmdb.org/t/p/w500${profile_path}`;

  const { width, height } = useDimensions("window");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {}, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className="z-20 w-full flex-row justify-between items-center p-4">
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
      </View>

      {/* cast details */}
      <View>
        <View className="flex-row justify-center">
          <Image
            source={{ uri: imageUrl }}
            style={{
              height: height * 0.43,
              width: width * 0.74,
              // iOS shadows
              shadowColor: "gray",
              shadowRadius: 20,
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 1,
              // Android shadow
              elevation: 20,
            }}
            className="rounded-full border border-neutral-500 overflow-hidden"
          />
        </View>

        <View className="mt-5">
          <View className="items-center flex-col justify-center">
            <Text className="text-3xl text-white font-bold ">{name}</Text>
            <Text className="text-base text-neutral-500">{place_of_birth}</Text>
          </View>
          <View className="mx-4 p-3 mt-3 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{genderText}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Profession</Text>
              <Text className="text-neutral-300 text-sm">
                {known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{popularity}</Text>
            </View>
          </View>

          <View className="my-4 mx-4 space-y-2">
            <Text className="text-white text-xl mb-1">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {showFullBio
                ? biography
                : biography.slice(0, limit) +
                  (biography.length > limit ? "..." : "")}
            </Text>
            {biography.length > limit && (
              <TouchableOpacity onPress={toggleShowBio}>
                <Text className="mt-1" style={{ color: "#eab308" }}>
                  {showFullBio ? "Show less" : "Read more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <MovieList
          title={name + " Movies"}
          data={personMovies}
          hideSeeAll={false}
        />
      </View>
    </ScrollView>
  );
}
