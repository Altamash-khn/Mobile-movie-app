import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [savedDoc, setSavedDoc] = useState<any>(null);
  const isLoggedIn = !!user;

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(Number(id)));

  if (loading) {
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <Text className="text-white text-base">Loading movie details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="bg-primary flex-1 items-center justify-center px-5">
        <Text className="text-red-500 text-base text-center mb-4">
          Failed to load movie details
        </Text>

        <TouchableOpacity
          onPress={router.back}
          className="bg-accent px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1 pt-10">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[50vh] rounded-xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5 pb-20">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0] || "N/A"}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons?.star} className="size-4" />
            <Text className="text-light-200 text-sm">
              {movie?.vote_average?.toFixed(1) ?? 0} / 10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: genreProps) => g.name).join(" - ")}
          />

          <View className="w-1/2 flex flex-row justify-between gap-5">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1_000_000} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies
              .map((c: ProductionCompany) => c.name)
              .join(" - ")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5  rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieDetails;
