import { Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function Transactions({
  transactionsModal,
  toggleTransactions,
}) {
  return (
    <Modal animationType="fade" isVisible={transactionsModal}>
      <TouchableOpacity onPress={toggleTransactions}>
        <Text className="text-white">Close</Text>
      </TouchableOpacity>
      <Text className="text-white">Transactions</Text>
    </Modal>
  );
}
