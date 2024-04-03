import { BlurView } from "expo-blur";
import { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Text, Image } from "react-native";

const pfp = require("../../assets/pfp.png");
export default function UtilityBar({ visible, lastTransaction, pfpURI }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0, // Fade in if visible, fade out if not
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, fadeAnim]);
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <BlurView
        intensity={0.6}
        className="fixed top-0 flex-row justify-between items-end pb-3 h-32 rounded-2xl bg-black/80"
      >
        <TouchableOpacity className="justify-center ml-3 w-72 h-16 bg-black rounded-lg">
          <Text className="mx-4 text-xs text-white/80">Last Transaction</Text>
          <Text className="mx-4 text-2xl font-semibold text-white">
            $9.75 Chipotle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="mr-3 w-16 h-16">
          <Image
            source={pfp}
            resizeMode="cover"
            className="flex-1 rounded-lg aspect-square"
          />
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );
}
