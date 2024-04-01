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
      animationType="fade"
      isVisible={transactionsModal}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="flex-1 mt-14">
          {transactions.map((transaction, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <Text className="text-white">{transaction}</Text>
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
