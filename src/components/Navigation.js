import { Text, Animated, TouchableOpacity, View, Image } from "react-native";
import { useRef, useEffect } from "react";
import { BlurView } from "expo-blur";

export default function Navigation({
  toggleTransactions,
  toggleReciepts,
  pickImage,
  visible,
}) {
  const fade = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
  const history = require("../../assets/history.png");
  const reciepts = require("../../assets/reciepts.png");

  useEffect(() => {
    Animated.timing(fade, {
      toValue: visible ? 1 : 0, // Fade in if visible, fade out if not
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [visible, fade]);
  return (
    <Animated.View style={{ opacity: fade }}>
      <View className="fixed flex-row mb-6">
        <TouchableOpacity onPress={toggleTransactions}>
          <BlurView
            intensity={30}
            tint="dark"
            className="overflow-hidden justify-between items-end p-4 m-4 rounded-full bg-black/80"
          >
            <Image source={history} className="w-5 h-5" />
          </BlurView>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center self-end m-4 bg-black rounded"
          onPress={pickImage}
        >
          <Text className="p-4 text-white">Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleReciepts}>
          <BlurView
            intensity={30}
            tint="dark"
            className="overflow-hidden justify-between items-end p-4 m-4 rounded-full bg-black/80"
          >
            <View className="items-center w-5 h-5">
              <Image source={reciepts} className="w-4 h-5" />
            </View>
          </BlurView>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
