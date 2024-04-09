import React from "react";
import { useState } from "react";
import {
  Alert,
  Text,
  ImageBackground,
  View,
  AppState,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { Button, Input } from "react-native-elements";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    const { signinError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (signinError) {
      Alert.alert(error.message);
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      if (!session)
        Alert.alert("Please check your inbox for email verification!");
      setLoading(false);
    }
  }
  const bg = require("../../assets/login.png");

  return (
    <ImageBackground source={bg} className="flex-1">
      <SafeAreaView className="flex-1 justify-center">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="justify-between">
            <View className="m-8">
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email"
                autoCapitalize={"none"}
                placeholderTextColor={"#FFF"}
                className="text-white"
              />
            </View>
            <View className="m-8">
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholderTextColor={"#FFF"}
                placeholder="password"
                autoCapitalize={"none"}
                className="text-white/80"
              />
            </View>
            <TouchableOpacity
              className="mx-8 bg-black rounded-xl"
              onPress={() => handleLogin()}
            >
              <Text className="p-4 text-center text-white">Get Started</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
