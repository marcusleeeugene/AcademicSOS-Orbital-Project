import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as firebase from "firebase";
//import LoginFB from "../firebase/LoginFireBase.js";
//import HomeFB from "../firebase/HomeFireBase.js";
//import SelectModuleFB from "../firebase/SelectModuleFireBase.js";


export default function LoginScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const [userID, handleUpdateUserID] = useState("");
  const [password, handleUpdatePassword] = useState("");

  login = (userID, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(`${userID}@u.nus.edu`, password)
        .then(() => {
          navigation.navigate("Home", {
            userID: userID,
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("Invalid User ID or blank fields !!!");
              break;
            case "auth/wrong-password":
              alert("Invalid password or blank fields !!!");
              break;
            default:
              alert("Invalid User !!!");
          }
        });
      handleUpdateUserID("");
      handleUpdatePassword("");
    } catch (error) {
      console.log(error.toString());
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.AcademicSOS}> AcademicSOS </Text>
        <Image
          style={styles.nusLogo}
          source={require("../assets/images/NUS_logo_Transparent.png")}
        />
        <View style={styles.loginBackground}>
          <Text style={styles.textInputTitle}> Student ID: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="    Student ID"
            onChangeText={handleUpdateUserID}
            value={userID}
          />
          <Text style={styles.textInputTitle}> Password: </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="    Password"
            onChangeText={handleUpdatePassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => login(userID, password)}
          >
            <Text style={styles.loginBtnText}> LOGIN </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#EF7C00",
  },
  AcademicSOS: {
    marginTop: hp("5%"),
    fontSize: hp("4%"),
    textAlign: "center",
    fontFamily: "SonsieOne-Regular",
    color: "#FFFFFF",
  },
  nusLogo: {
    height: hp("15%"),
    width: wp("45%"),
    resizeMode: "contain",
  },
  loginBackground: {
    backgroundColor: "#003D7C",
    height: hp("30%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
  },
  textInputTitle: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    left: "-15%",
    marginBottom: "2%",
  },
  textInput: {
    borderColor: "black",
    fontSize: hp("1.5%"),
    marginBottom: "5%",
    height: hp("3.5%"),
    width: wp("50%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp("2%"),
  },
  loginBtn: {
    marginTop: "5%",
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnText: {
    marginTop: "-5%",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
});