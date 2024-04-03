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

const reciept = require("../assets/testReciept.png");
export default function ImagePreview({
  imageB64,
  imageURI,
  imagePreview,
  togglePreview,
}) {
  return (
    <Modal backdropOpacity={0.9} animationType="slide" isVisible={imagePreview}>
      <SafeAreaView className="flex-1">
        <View key={index} className="flex-row items-center mb-10">
          <Image
            source={imageURI}
            className="flex-1 aspect-square"
            resizeMode="contain"
          />
          <Image
            source={reciept} // Using the same receipt for demonstration, you can replace with your actual image source
            className="flex-1 aspect-square"
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          className="bg-black rounded-lg"
          onPress={togglePreview}
        >
          <Text className="p-4 text-center text-white">Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
