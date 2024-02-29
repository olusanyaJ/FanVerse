import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import SignInWithBtn from "../components/SignInWithBtn";
import COLORS from "../utils/colors";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default GetStartedScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
  });
  const onPressEmail = () => {
    console.log("Email Button Pressed");
  };

  const onPressGoogle = () => {
    console.log("Google Button Pressed");
  };
  const onPressApple = () => {
    console.log("Apple Button Pressed");
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/imgs/getStartedToggleBgImg.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/imgs/getStartedBgLight.png")}
          style={styles.image1}
        />
        <Image
          source={require("../assets/imgs/getStartedBgDark.png")}
          style={styles.image2}
        />
      </View>
      <View style={styles.bodyContent}>
        <View style={styles.heading}>
          <Text style={styles.title}>Get Started</Text>
          <Text style={styles.subtitle}>
            Experience sports like never before.
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={onPressEmail} buttonText={"Continue with Email"} />
        </View>
        <View style={styles.btnContainerMG}>
          <SignInWithBtn
            onPress={onPressGoogle}
            buttonText={"Continue with Google"}
            icon={require("../assets/icons/Google.png")}
          />
        </View>
        <View style={styles.btnContainerMG}>
          <SignInWithBtn
            onPress={onPressApple}
            buttonText={"Continue with Apple"}
            icon={require("../assets/icons/Apple.png")}
          />
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.signInLink}> Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: "47%",
    backgroundColor: COLORS.getStartedBgColor,
  },
  image: {
    width: 375,
    height: 335,
    top: 63.01,
    left: 31.73,
    borderRadius: 20,
    position: "relative",
  },
  image1: {
    zIndex: -1,
    width: 360,
    height: 320,
    top: 85.55,
    left: 32,
    borderRadius: 20,
    position: "absolute",
    opacity: 0.6,
    right: 0,
    bottom: 0,
  },
  image2: {
    zIndex: -2,
    width: 360,
    height: 305,
    top: 102.55,
    left: 16,
    borderRadius: 20,
    opacity: 0.3,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  btnContainer: {
    flexDirection: "row",
    height: 54,
    paddingRight: 24,
    paddingLeft: 24,
  },
  btnContainerMG: {
    marginTop: 16,
    flexDirection: "row",
    height: 54,
    paddingRight: 24,
    paddingLeft: 24,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.appBackgroundColor,
  },
  heading: {
    paddingVertical: 24,
  },
  title: {
    color: COLORS.primaryTextColor,
    fontFamily: "Manrope-Bold",
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 0,
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: 4,
  },
  subtitle: {
    color: COLORS.secondaryTextColor,
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    lineHeight: 27,
    letterSpacing: 0.3,
    fontWeight: 400,
    textAlign: "center",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 41,
  },
  signInText: {
    color: COLORS.secondaryTextColor,
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.3,
    fontWeight: 400,
    textAlign: "center",
  },
  signInLink: {
    fontFamily: "Manrope-Bold",
    fontWeight: 700,
    color: COLORS.thirdTextColor,
  },
});
