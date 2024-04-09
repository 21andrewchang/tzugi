import React from "react";
import {
  Image,
  ImageBackground,
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
    <Modal
      backdropOpacity={0.9}
      className="m-0"
      animationType="slide"
      isVisible={imagePreview}
      presentationStyle="overFullScreen"
    >
      <View className="flex-1 rounded-xl">
        <ImageBackground
          className="flex-1 items-center"
          source={{ uri: "data:image/jpg;base64," + imageB64 }}
        >
          <View className="flex-row flex-1 items-end mb-10">
            <TouchableOpacity
              className="mx-4 bg-black rounded-lg"
              onPress={togglePreview}
            >
              <Text className="p-4 text-center text-white">Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mx-4 bg-black rounded-lg">
              <Text className="p-4 text-center text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}
