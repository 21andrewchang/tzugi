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
    <Modal backdropOpacity={0.9} animationType="fade" isVisible={recieptsModal}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginTop: 20 }}>
          {recieptImages.map((reciept, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <Image
                source={reciept}
                style={{
                  flex: 1,
                  marginRight: 10,
                  aspectRatio: 1,
                  resizeMode: "contain",
                }}
              />
              <Image
                source={reciept} // Using the same receipt for demonstration, you can replace with your actual image source
                style={{
                  flex: 1,
                  marginLeft: 10,
                  aspectRatio: 1,
                  resizeMode: "contain",
                }}
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
