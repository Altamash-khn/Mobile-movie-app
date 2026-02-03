import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
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

function Signup() {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(data: AuthFormData) {
    try {
      await signup(data); // { name, email, password }
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
            Create account ✨
          </Text>
          <Text className="text-gray-400 mb-8">Join us and explore movies</Text>

          <Text className="text-gray-300 mb-2">Name</Text>
          <Controller // bridge between input values and react-hook-form
            control={control} // tells react-hook-form to start tracking it
            name="name" // must match with the one you wanna cnct in default values
            rules={{
              // validations
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter your name"
                placeholderTextColor="#6B7280"
                className="bg-[#12182B] text-white rounded-xl px-4 py-4"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-400 mt-1.5">{errors.name.message}</Text>
          )}

          <Text className="text-gray-300 mb-2 mt-4">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                className="bg-[#12182B] text-white rounded-xl px-4 py-4"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-400 mt-1.5">{errors.email.message}</Text>
          )}

          <Text className="text-gray-300 mb-2 mt-4">Password</Text>

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
              <View className="relative">
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Create a password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showPassword}
                  className="bg-[#12182B] text-white rounded-xl px-4 py-4 pr-12"
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
            <Text className="text-red-400 mt-1.5">
              {errors.password.message}
            </Text>
          )}

          <TouchableOpacity
            className="bg-violet-500 py-4 rounded-2xl my-4"
            onPress={handleSubmit(handleSignup)}
          >
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default Signup;
