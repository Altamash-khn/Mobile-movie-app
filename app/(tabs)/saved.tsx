import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Saved = () => {
  <View className="bg-primary flex-1 px-10">
    <View className="flex flex-1 flex-col justify-center items-center gap-5">
      <Image source={icons.save} className="size-10" tintColor="#fff" />
      <Text className="text-gray-500 text-base">Saved</Text>
    </View>
  </View>;
};

export default Saved;
