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
  session,
  image,
  imagePreview,
  togglePreview,
}) {
  let imageURI = image;
  if (image.uri) {
    imageURI = image.uri;
  }

  async function uploadPhoto() {
    console.log("Uploading...");

    const accessToken = session.access_token;

    let formData = new FormData();
    formData.append("fileUpload", {
      uri: imageURI,
      type: "image/jpeg",
      name: "upload.jpg",
    });

    try {
      let response = await fetch("http://localhost:5173/api/receipt", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        let responseJson = await response.json();
        console.log("Upload successful", responseJson);
      } else {
        console.error("Upload failed", response.status);
      }
    } catch (error) {
      console.error("Error during upload: ", error);
    }
  }

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
          className="flex-1 items-center h-full"
          source={{ uri: imageURI }}
        >
          <Image source={imageURI} />
          <View className="flex-row flex-1 items-end mb-10">
            <TouchableOpacity
              className="mx-4 bg-black rounded-lg"
              onPress={togglePreview}
            >
              <Text className="p-4 text-center text-white">Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={uploadPhoto}
              className="mx-4 bg-black rounded-lg"
            >
              <Text className="p-4 text-center text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}
