import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { getUserSavedMovies } from "@/services/appwrite";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Saved = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchSaved() {
      try {
        const docs = await getUserSavedMovies(user!.id);
        setMovies(docs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSaved();
  }, [user]);

  if (!user) {
    return (
      <View className="bg-primary flex-1 justify-center items-center px-10 gap-4">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-gray-400 text-center">
          Login to see your saved movies
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="bg-accent px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white">Loading saved movies...</Text>
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View className="bg-primary flex-1 justify-center items-center px-10 gap-4">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-gray-400 text-center">
          No saved movies yet
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-accent px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">
            Explore movies
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1 px-5 pt-5">
      <View className="mb-5">
      <Text className="text-white text-2xl font-bold">
        Saved Movies
      </Text>
      <Text className="text-gray-400 text-sm mt-1">
        Movies you want to watch later
      </Text>
    </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/movies/${item.movieId}`)
            }
            className="flex-row items-center mb-4 bg-dark-100 rounded-xl p-3"
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster}`,
              }}
              className="w-16 h-24 rounded-lg mr-4"
            />

            <Text
              className="text-white font-semibold text-base flex-1"
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Saved;
