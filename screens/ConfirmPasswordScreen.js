import React, { useCallback, useState } from "react";
import { Text, StyleSheet, View, Modal, Pressable } from "react-native";
import Button from "../components/Button";
import COLORS from "../utils/colors";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import InputPassword from "../components/InputPassword";

SplashScreen.preventAutoHideAsync();

export default ConfirmPasswordScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    let errors = {};
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateLogin()) {
      setPassword("");
      setErrors({});
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
        navigation.navigate("LoginScreen");
      }, 2000);
      navigation.navigate("ConfirmPasswordScreen");
    }
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.pageContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.pageTitle}>Confirm New Password</Text>
          <Text style={styles.pageSubtitle}>
            Please re-enter your new password for your account and Get back in!
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <InputPassword
            onChangeText={setPassword}
            value={password}
            style={[
              styles.inputPlaceholder,
              !errors.password && styles.inputPlaceholder,
              errors.password && styles.inputPlaceholderErr,
            ]}
            placeholderTextColor={
              errors.password
                ? COLORS.primaryBtnColor
                : COLORS.secondaryTextColor
            }
            placeholder={errors.password ? `${errors.password}` : "Password"}
          />
        </View>

        <View>
          <Button onPress={handleSubmit} buttonText={"Continue"} />
        </View>

        <View>
          <Modal
            animationType="slide"
            visible={isModalVisible}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>Success</Text>
              </View>
              <Text style={styles.statusMessage}>
                Your new password has been created.
              </Text>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackgroundColor,
  },
  pageContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 44,
  },
  textContainer: {
    marginVertical: 40,
  },
  pageTitle: {
    fontFamily: "Manrope-Bold",
    fontSize: 28,
    // fontWeight: 700,
    lineHeight: 36,
    color: COLORS.primaryTextColor,
    paddingBottom: 8,
  },
  pageSubtitle: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    // fontWeight: 400,
    lineHeight: 23.8,
    letterSpacing: 0.3,
    color: COLORS.secondaryTextColor,
  },
  inputContainer: {
    marginBottom: 80,
  },
  modalContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.modalBgColor,
    borderRadius: 16,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: COLORS.modalTextColor,
    marginRight: 8,
  },
  status: {
    fontFamily: "Manrope-Bold",
    fontSize: 12,
    // fontWeight: 700,
    lineHeight: 18,
    letterSpacing: 0,
    color: COLORS.buttonTextColor,
  },
  statusMessage: {
    fontFamily: "Manrope-Bold",
    fontSize: 14,
    // fontWeight: 700,
    lineHeight: 18,
    letterSpacing: 0,
    color: COLORS.modalMessageTextColor,
  },
  inputPlaceholder: {
    width: "100%",
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    // fontWeight: 400,
    lineHeight: 26,
    letterSpacing: 0.4,
    color: COLORS.primaryTextColor,
  },
  inputPlaceholderErr: {
    fontSize: 18,
  },
});
