import { Camera, CameraType } from "expo-camera";
import { TouchableWithoutFeedback } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Button, Text, View, SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import Navigation from "./src/components/Navigation";
import Transactions from "./src/screens/Transactions";
import Reciepts from "./src/screens/Reciepts";
import { supabase } from "./utils/supabase";
import ImagePreview from "./src/screens/ImagePreview";
import UtilityBar from "./src/components/UtilityBar";
import Home from "./src/screens/Home";

export default function App() {
  return <Home />;
}
