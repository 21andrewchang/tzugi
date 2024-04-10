import { Camera, CameraType } from "expo-camera";
import { Modal, TouchableWithoutFeedback, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRef, useEffect, useState } from "react";
import { Button, Text, View, SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import Navigation from "../components/Navigation";
import Transactions from "./Transactions";
import Reciepts from "./Reciepts";
import { supabase } from "../../utils/supabase";
import ImagePreview from "./ImagePreview";
import UtilityBar from "../components/UtilityBar";

// TODO: Uploading photos from cameraroll
export default function Home({ session }) {
  // States
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recieptsModal, setRecieptsModal] = useState(false);
  const [transactionsModal, setTransactionsModal] = useState(false);
  const [imagePreview, setPreview] = useState(false);
  const [blur, setBlur] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [images, setImages] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState();
  const [image, setImage] = useState(null);

  let cameraRef = useRef();

  useEffect(() => {
    // Fetch transactions from supabase
    const getTransactions = async () => {
      try {
        const { data: transactions, error } = await supabase
          .from("transactions")
          .select("*");

        if (error) {
          console.error("Error fetching transactions:", error.message);
          return;
        }

        if (transactions && transactions.length > 0) {
          setTransactions(transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    // Fetch reciepts from supabase
    const getReciepts = () => {
      try {
        const { data } = supabase.storage
          .from("reciepts")
          .getPublicUrl("autist.PNG");

        if (data.publicUrl) {
          setImages([data.publicUrl]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
    getReciepts();
  }, []);

  const toggleReciepts = () => {
    if (!recieptsModal) {
      setBlur(100);
      setNavVisible(false);
    } else {
      setNavVisible(true);
      setBlur(0);
    }
    setRecieptsModal(!recieptsModal);
  };

  const toggleTransactions = () => {
    if (!transactionsModal) {
      setBlur(100);
      setNavVisible(false);
    } else {
      setBlur(0);
      setNavVisible(true);
    }
    setTransactionsModal(!transactionsModal);
  };

  const handleCameraReady = (state) => {
    setCameraReady(state);
  };
  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    if (cameraReady && cameraRef.current) {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
      togglePreview();
    }
  };
  const togglePreview = () => {
    setPreview(!imagePreview);
  };

  // Camera Permissions
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      height: 0,
      quality: 1,
    });

    console.log("selected photo: ", result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      togglePreview();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={takePicture}>
      <View className="flex-1 justify-center">
        <Camera
          ref={cameraRef}
          className="flex-1"
          type={CameraType.back}
          onCameraReady={() => {
            handleCameraReady(true);
          }}
        >
          <BlurView
            intensity={blur}
            tint="light"
            className="flex-1 justify-between"
          >
            <UtilityBar session={session} visible={navVisible} />

            {image && (
              <Image
                source={{ uri: image }}
                className="flex-1 w-20 h-800"
                resizeMode="cover"
              />
            )}
            <Navigation
              visible={navVisible}
              pickImage={pickImage}
              toggleTransactions={toggleTransactions}
              toggleReciepts={toggleReciepts}
            />
          </BlurView>
          <Transactions
            toggleTransactions={toggleTransactions}
            transactionsModal={transactionsModal}
            transactions={transactions}
          />
          <Reciepts
            images={images}
            toggleReciepts={toggleReciepts}
            recieptsModal={recieptsModal}
          />
          <ImagePreview
            image={photo}
            togglePreview={togglePreview}
            imagePreview={imagePreview}
          />
        </Camera>
      </View>
    </TouchableWithoutFeedback>
  );
}
