import { Text, TouchableOpacity, View, Image } from "react-native";

export default function TransactionBar({ index, transaction }) {
  const recieptIcon = require("../../assets/recieptIcon.png");
  return (
    <View className="flex-row my-1 h-14" key={index}>
      <TouchableOpacity className="w-14" onPress={() => {}}>
        <View className="justify-center items-center h-full rounded-l-lg bg-gray-500/30">
          <Image source={recieptIcon} className="w-3 h-4" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1" onPress={() => {}}>
        <View className="flex-row items-center h-full bg-black rounded-r-lg">
          <Text className="ml-4 text-xl text-white">{transaction.price}</Text>
          <Text className="ml-4 text-l text-white/40">{transaction.label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
