import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function Reciepts({
  recieptImages,
  recieptsModal,
  toggleReciepts,
}) {
  return (
    <Modal
      backdropOpacity={0.9}
      animationType="slide"
      isVisible={recieptsModal}
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 mt-10">
          {recieptImages.map((reciept, index) => (
            <View key={index} className="flex-row items-center mb-10">
              <Image
                source={reciept}
                className="flex-1 aspect-square"
                resizeMode="contain"
              />
              <Image
                source={reciept} // Using the same receipt for demonstration, you can replace with your actual image source
                className="flex-1 aspect-square"
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          className="bg-black rounded-lg"
          onPress={toggleReciepts}
        >
          <Text className="p-4 text-center text-white">Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
