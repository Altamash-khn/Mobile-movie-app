import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInputChange(field, text) {
    setUser((prev) => ({
      ...prev,
      [field]: text,
    }));
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B0F1A]">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-white mb-2">
          Create account ✨
        </Text>
        <Text className="text-gray-400 mb-8">Join us and explore movies</Text>

        <Text className="text-gray-300 mb-2">Name</Text>
        <TextInput
          value={user.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Enter your name"
          placeholderTextColor="#6B7280"
          className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-4"
        />

        <Text className="text-gray-300 mb-2">Email</Text>
        <TextInput
          value={user.email}
          onChangeText={(text) => handleInputChange("email", text)}
          placeholder="Enter your email"
          placeholderTextColor="#6B7280"
          className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-4"
        />

        <Text className="text-gray-300 mb-2">Password</Text>
        <TextInput
          value={user.password}
          onChangeText={(text) => handleInputChange("password", text)}
          placeholder="Create a password"
          placeholderTextColor="#6B7280"
          secureTextEntry
          className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-6"
        />

        <TouchableOpacity className="bg-violet-500 py-4 rounded-2xl mb-4">
          <Text className="text-center text-white font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        <Pressable onPress={() => router.replace("/(tabs)")} className="mb-6">
          <Text className="text-center text-gray-500 underline">
            Skip for now, go to Home
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-400">Already have an account? </Text>

          <Pressable onPress={() => router.replace("/login")}>
            <Text className="text-violet-400 font-semibold">login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Signup;
