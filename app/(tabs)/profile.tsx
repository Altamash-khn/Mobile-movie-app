// import AuthButton from "@/components/AuthButton";
// import { router } from "expo-router";
// import { Text, View } from "react-native";

// function Profile() {
//   return (
//     <View className="flex-1 bg-[#0B0F1A] px-6 justify-center">
//       <Text className="text-3xl font-bold text-white text-center mb-2">
//         Profile
//       </Text>
//       <Text className="text-gray-400 text-center mb-10">
//         Login or signup to save and track movies
//       </Text>

//       <AuthButton
//         title="Login"
//         onPress={() => router.push("/login")}
//         className="mb-5"
//       />

//       <AuthButton
//         title="Sign Up"
//         variant="outline"
//         onPress={() => router.push("/signup")}
//       />
//     </View>
//   );
// }

// export default Profile;

import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
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

  return (
    <ScrollView className="flex-1 bg-[#0B0F1A] px-6 pt-[20vh]">
      <Text className="text-3xl font-bold text-white mb-2">Your Profile</Text>

      <Text className="text-gray-400 mb-10">Manage your account & movies</Text>

      <View className="bg-[#12172A] rounded-2xl p-5 mb-8">
        <Text className="text-xl font-semibold text-white mb-1">
          {user.name || "Movie Lover 🎬"}
        </Text>

        <Text className="text-gray-400">{user.email}</Text>
      </View>

      <AuthButton
        title="Saved Movies"
        onPress={() => router.push("/saved")}
        className="mb-4"
      />

      <AuthButton
        title="Logout"
        variant="outline"
        onPress={async () => {
          await logout();
          router.replace("/profile");
        }}
      />
    </ScrollView>
  );
}

export default Profile;
