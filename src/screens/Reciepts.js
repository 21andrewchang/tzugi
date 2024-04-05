import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function Reciepts({ images, recieptsModal, toggleReciepts }) {
  console.log("image uri", images[0]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  let imageuri = images[0];

  return (
    <Modal
      backdropOpacity={0.9}
      animationType="slide"
      isVisible={recieptsModal}
    >
      <SafeAreaView className="flex-1 justify-center items-center">
        {fullScreenImage && (
          <TouchableOpacity
            className="flex h-50"
            onPress={() => setFullScreenImage(null)}
          >
            <Image
              src={fullScreenImage}
              className="flex-1 aspect-square"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <ScrollView className="flex-1 mt-10">
          {images.map((imageUri, index) => (
            <View key={index} className="flex-row justify-center">
              <TouchableOpacity
                onPressIn={() => setFullScreenImage(imageUri)}
                onPressOut={() => setFullScreenImage(null)}
                className="flex w-40"
              >
                <Image
                  src={imageUri}
                  className="flex-1 aspect-square"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex w-40">
                <Image
                  src={imageUri}
                  className="flex-1 aspect-square"
                  resizeMode="contain"
                />
              </TouchableOpacity>
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
