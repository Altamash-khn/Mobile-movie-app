import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: AuthFormData) {
    try {
      await login(data);
      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B0F1A]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 justify-center">
          <Text className="text-3xl font-bold text-white mb-2">
            Welcome back 👋
          </Text>
          <Text className="text-gray-400 mb-8">
            Login to continue watching movies
          </Text>

          <Text className="text-gray-300 mb-2 mt-4">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="enter your email"
                placeholderTextColor="#6B7280"
                className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-3"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-400">{errors.email.message}</Text>
          )}

          <Text className="text-gray-300 mb-2 mt-5">Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="enter your pasword"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#6B7280"
                  className="bg-[#12182B] text-white rounded-xl px-4 py-4 mb-3"
                />

                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#9CA3AF"
                  />
                </Pressable>
              </View>
            )}
          />
          {errors.password && (
            <Text className="text-red-400">{errors.password.message}</Text>
          )}

          <TouchableOpacity
            className="bg-violet-500 py-4 rounded-2xl my-6"
            onPress={handleSubmit(handleLogin)}
          >
            <Text className="text-center text-white font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => router.replace("/(tabs)")} className="mb-6">
            <Text className="text-center text-gray-500 underline">
              Skip for now, go to Home
            </Text>
          </Pressable>

          <View className="flex-row justify-center">
            <Text className="text-gray-400">Don't have an account? </Text>

            <Pressable onPress={() => router.replace("/signup")}>
              <Text className="text-violet-400 font-semibold">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;
