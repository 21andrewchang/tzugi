import { BlurView } from "expo-blur";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import Modal from "react-native-modal";

const transactions = ["Chipotle", "Panda Express", "Jamba Juice"];

export default function Transactions({
  transactionsModal,
  toggleTransactions,
}) {
  return (
    <Modal
      backdropOpacity={0.9}
      animationType="slide"
      isVisible={transactionsModal}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="flex-1 mt-14">
          {transactions.map((transaction, index) => (
            <TouchableOpacity key={index} className="my-2 bg-black rounded-lg">
              <Text className="p-4 text-lg text-white">{transaction}</Text>
            </TouchableOpacity>
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
