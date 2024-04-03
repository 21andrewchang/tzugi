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
import TransactionBar from "./TransactionBar";

export default function Transactions({
  transactionsModal,
  toggleTransactions,
  transactions,
}) {
  const recieptIcon = require("../assets/recieptIcon.png");
  console.log("transactions: ", transactions);
  return (
    <Modal
      backdropOpacity={0.9}
      animationType="slide"
      isVisible={transactionsModal}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="flex-1 mt-14">
          {transactions.map((transaction, index) => (
            <TransactionBar index={index} transaction={transaction} />
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
