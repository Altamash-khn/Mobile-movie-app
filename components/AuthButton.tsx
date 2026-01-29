import { useState } from "react";
import { Pressable, Text } from "react-native";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

export default function AuthButton({
  title,
  onPress,
  variant = "primary",
  className = "",
}: AuthButtonProps) {
  const [pressed, setPressed] = useState(false);

  const baseClasses = "py-4 rounded-2xl";

  const primaryClasses = pressed ? "bg-violet-600" : "bg-violet-500";

  const outlineClasses = pressed
    ? "border border-violet-400 bg-violet-500/10"
    : "border border-violet-500";

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`${baseClasses} ${
        variant === "primary" ? primaryClasses : outlineClasses
      } ${className}`}
    >
      <Text
        className={`text-center font-semibold text-lg ${
          variant === "primary" ? "text-white" : "text-violet-400"
        }`}
      >
        {title}
      </Text>
    </Pressable>
  );
}
