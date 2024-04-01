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
        <TouchableOpacity
          style={{ position: "absolute", top: 10, left: 10 }}
          onPress={toggleReciepts}
        >
          <Text style={{ color: "white", padding: 10 }}>Close</Text>
        </TouchableOpacity>
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
      </SafeAreaView>
    </Modal>
  );
}
