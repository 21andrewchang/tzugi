import { Text, Animated, TouchableOpacity, View } from "react-native";
import { useRef, useEffect } from "react";

export default function Navigation({
  toggleTransactions,
  toggleReciepts,
  visible,
}) {
  const fade = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fade, {
      toValue: visible ? 1 : 0, // Fade in if visible, fade out if not
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [visible, fade]);
  return (
    <Animated.View style={{ opacity: fade }}>
      <View className="fixed flex-row mb-8">
        <TouchableOpacity
          className="flex-1 items-center self-end mx-4 bg-black rounded"
          onPress={toggleTransactions}
        >
          <Text className="p-4 text-white">Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center self-end mx-4 bg-black rounded"
          onPress={toggleReciepts}
        >
          <Text className="p-4 text-white">Reciepts</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
