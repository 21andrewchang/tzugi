import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import Navigation from "./src/Navigation";
import Transactions from "./src/Transactions";
import Reciepts from "./src/Reciepts";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recieptsModal, setRecieptsModal] = useState(false);
  const [transactionsModal, setTransactionsModal] = useState(false);

  const reciept1 = require("./assets/testReciept.png");
  const recieptImages = [reciept1, reciept1, reciept1]; // Just using the same receipt for example, you can replace with your array of receipts

  const toggleReciepts = () => {
    setRecieptsModal(!recieptsModal);
  };
  const toggleTransactions = () => {
    setTransactionsModal(!transactionsModal);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center">
      <Camera className="flex-1" type={CameraType.back}>
        <Navigation
          toggleTransactions={toggleTransactions}
          toggleReciepts={toggleReciepts}
        />
        <Transactions
          toggleTransactions={toggleTransactions}
          transactionsModal={transactionsModal}
        />
        <Reciepts
          recieptImages={recieptImages}
          toggleReciepts={toggleReciepts}
          recieptsModal={recieptsModal}
        />
      </Camera>
    </View>
  );
}
