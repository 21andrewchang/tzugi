import { Camera, CameraType } from "expo-camera";
import { TouchableWithoutFeedback } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Navigation from "./src/components/Navigation";
import Transactions from "./src/screens/Transactions";
import Reciepts from "./src/screens/Reciepts";
import { supabase } from "./utils/supabase";
import ImagePreview from "./src/screens/ImagePreview";
import UtilityBar from "./src/components/UtilityBar";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [recieptsModal, setRecieptsModal] = useState(false);
  const [transactionsModal, setTransactionsModal] = useState(false);
  const [imagePreview, setPreview] = useState(false);
  const [blur, setBlur] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  const [transactions, setTransactions] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images);

  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState();

  let cameraRef = useRef();

  useEffect(() => {
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
          console.log("trans set");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    const getReciepts = () => {
      try {
        const { data } = supabase.storage
          .from("reciepts")
          .getPublicUrl("autist.PNG");

        if (data.publicUrl) {
          setImages([data.publicUrl]);
          console.log("set image");
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
      console.log(newPhoto.uri);
      togglePreview();
    }
  };
  const togglePreview = () => {
    setPreview(!imagePreview);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
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
            <UtilityBar visible={navVisible} />
            <Navigation
              visible={navVisible}
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
            imageURI={photo ? photo.uri : ""}
            imageB64={photo ? photo.base64 : ""}
            togglePreview={togglePreview}
            imagePreview={imagePreview}
          />
        </Camera>
      </View>
    </TouchableWithoutFeedback>
  );
}
