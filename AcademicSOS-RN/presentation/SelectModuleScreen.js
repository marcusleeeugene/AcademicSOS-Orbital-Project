import React, { useState, useEffect } from "react";
import { useFonts } from "@expo-google-fonts/inter";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from "react-native";
import { AppLoading } from "expo";
import { FlatGrid } from "react-native-super-grid";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import { YellowBox } from "react-native";
import SelectModuleFB from "../firebase/SelectModuleFireBase.js";
import { role } from "../firebase/FireBaseConfig.js";

export default function SelectModuleScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "SonsieOne-Regular": require("../assets/fonts/SonsieOne-Regular.ttf"),
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  YellowBox.ignoreWarnings([
    //Ignores flatlist warning on rendering
    "VirtualizedLists should never be nested", // TODO: Remove when fixed in future updates
  ]);

  const { firstScreen, secondScreen, userID } = route.params;
  const [modules, setModules] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
  ];

  useEffect(() => {
    var tempModules = [];
    const colourCodes = ["#90CAF9", "#FFF59D", "#A5D6A7", "#FFAB91", "#B39DDB", "#80CBC4", "#c5e1a5", "#fff59d", "#ffcc80", "#bcaaa4"];
    SelectModuleFB.loadUserModules(userID, secondScreen).then((data) => {
      for (var i = 0; i < data.length; i++) {
        tempModules.push({ name: data[i], code: colourCodes[i] });
      }
      setModules(tempModules);
      setLoading(false);
    });
  }, []);

  const nextAction = (modCode) => {
    SelectModuleFB.checkBanDateRelease(userID, modCode).then((banDate) => {
      if (banDate == "" || secondScreen == "Priority Points" || role(userID) == "professors") {
        navigation.navigate(secondScreen, {
          thirdScreen: modCode,
          secondScreen: secondScreen,
          firstScreen: firstScreen,
          userID: userID,
          moduleCode: modCode,
        });
      } else if (banDate == "permanent") {
        Alert.alert(`You are permanently banned from ${modCode} consultation bookings`, "Check Priority Points for more information.", [
          {
            text: "Ok",
          },
        ]);
      } else {
        Alert.alert(`You are banned from ${modCode} consultation bookings until ${banDate}`, "Check Priority Points for more information.", [
          {
            text: "Ok",
          },
        ]);
      }
    });
  };

  const loadingJSX = (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <ActivityIndicator animating={isLoading} color="#FFFFFF" size="large" style={styles.activityIndicator} />
      </Modal>
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        {loadingJSX}
        <BreadCrumb navHistory={navHistory} />
        <View style={styles.body}>
          <Text style={styles.title}> Select a module </Text>
          <FlatGrid
            itemDimension={130}
            data={modules}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <TouchableOpacity onPress={() => nextAction(item.name)}>
                  <Text style={styles.itemName}> {item.name} </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#003D7C",
  },
  title: {
    marginTop: hp("1.8%"),
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: hp("20%"),
    textAlign: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    height: hp("10%"),
    fontFamily: "Righteous-Regular",
  },
});
