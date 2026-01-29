import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Login() {
  return (
    <SafeAreaView className="flex-1 bg-[#0B0F1A]">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-white mb-2">
          Welcome back 👋
        </Text>
        <Text className="text-gray-400 mb-8">
          Login to continue watching movies
        </Text>

        {/* Email */}
        <Text className="text-gray-300 mb-2">Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#6B7280"
          className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-4"
        />

        {/* Password */}
        <Text className="text-gray-300 mb-2">Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#6B7280"
          secureTextEntry
          className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-6"
        />

        {/* Button */}
        <TouchableOpacity className="bg-violet-500 py-4 rounded-2xl mb-4">
          <Text className="text-center text-white font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text className="text-center text-gray-400">
          Don’t have an account?{" "}
          <Text className="text-violet-400 font-semibold">Sign up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Login;
