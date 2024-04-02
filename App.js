import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Navigation from "./src/Navigation";
import Transactions from "./src/Transactions";
import Reciepts from "./src/Reciepts";
import { supabase } from "./utils/supabase";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recieptsModal, setRecieptsModal] = useState(false);
  const [transactionsModal, setTransactionsModal] = useState(false);
  const [blur, setBlur] = useState(0);

  const reciept1 = require("./assets/testReciept.png");
  const recieptImages = [reciept1, reciept1, reciept1]; // Just using the same receipt for example, you can replace with your array of receipts

  const toggleReciepts = () => {
    if (!recieptsModal) {
      setBlur(100);
    } else {
      setBlur(0);
    }
    setRecieptsModal(!recieptsModal);
  };
  const toggleTransactions = () => {
    if (!transactionsModal) {
      setBlur(100);
    } else {
      setBlur(0);
    }
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
        <BlurView intensity={blur} tint="light" className="flex-1">
          <Navigation
            toggleTransactions={toggleTransactions}
            toggleReciepts={toggleReciepts}
          />
        </BlurView>
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
