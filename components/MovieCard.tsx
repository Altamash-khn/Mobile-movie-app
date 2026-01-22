import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/600×400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm text-white font-bold my-2" numberOfLines={1}>
          {movie.title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" resizeMode="contain" />
          <Text className="text-xs text-white font-bold">
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {movie.release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
