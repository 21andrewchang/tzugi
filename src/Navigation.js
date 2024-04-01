import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function Navigation({ toggleTransactions, toggleReciepts }) {
  return (
    <SafeAreaView className="flex-row flex-1">
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
    </SafeAreaView>
  );
}
