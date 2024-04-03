import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

const reciept = require("../../assets/testReciept.png");
export default function ImagePreview({
  imageB64,
  imageURI,
  imagePreview,
  togglePreview,
}) {
  return (
    <Modal backdropOpacity={0.9} animationType="slide" isVisible={imagePreview}>
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center mb-10">
          <Image
            source={{ uri: "data:image/jpg;base64," + imageB64 }}
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
