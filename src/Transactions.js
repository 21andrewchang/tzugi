import { BlurView } from "expo-blur";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from "react-native";
import Modal from "react-native-modal";

export default function Transactions({
  transactionsModal,
  toggleTransactions,
  transactions,
}) {
  const recieptIcon = require("../assets/recieptIcon.png");
  return (
    <Modal
      backdropOpacity={0.9}
      animationType="slide"
      isVisible={transactionsModal}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="flex-1 mt-14">
          {transactions.map((transaction, index) => (
            <View className="flex-row my-1 h-14" key={index}>
              <TouchableOpacity
                className="w-14"
                onPress={() => {
                  // Handle press for the icon part
                }}
              >
                <View className="justify-center items-center h-full rounded-l-lg bg-black/50">
                  <Image source={recieptIcon} className="w-3 h-4" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1"
                onPress={() => {
                  // Handle press for the text part
                }}
              >
                <View className="flex-row items-center h-full bg-black rounded-r-lg">
                  <Text className="ml-4 text-white text-m">
                    {transaction.price}
                  </Text>
                  <Text className="ml-4 text-m text-white/40">
                    {transaction.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          className="bg-black rounded-lg"
          onPress={toggleTransactions}
        >
          <Text className="p-4 text-center text-white">Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
