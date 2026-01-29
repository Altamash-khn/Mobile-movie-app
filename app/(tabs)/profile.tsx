import AuthButton from "@/components/AuthButton";
import { router } from "expo-router";
import { Text, View } from "react-native";

function Profile() {
  return (
    <View className="flex-1 bg-[#0B0F1A] px-6 justify-center">
      <Text className="text-3xl font-bold text-white text-center mb-2">
        Profile
      </Text>
      <Text className="text-gray-400 text-center mb-10">
        Login or signup to save and track movies
      </Text>

      <AuthButton
        title="Login"
        onPress={() => router.push("/login")}
        className="mb-5"
      />

      <AuthButton
        title="Sign Up"
        variant="outline"
        onPress={() => router.push("/signup")}
      />
    </View>
  );
}

export default Profile;
