import React from "react";
import { useFonts } from "@use-expo/font";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatGrid } from "react-native-super-grid";
import BreadCrumb from "./BreadCrumb";

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const options = [
    {
      name: "Book consultation",
      image: require("../assets/images/bookConsult.png"),
    },
    {
      name: "Public consultation",
      image: require("../assets/images/publicConsult.png"),
    },
    {
      name: "Priority\n Points",
      image: require("../assets/images/priorityPoints.png"),
    },
    {
      name: "Manage Bookings",
      image: require("../assets/images/manageBookings.png"),
    },
    {
      name: "Create Consulation",
      image: require("../assets/images/createConsult.png"),
    },
  ];

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <BreadCrumb />
        <View style={styles.body}>
          <Text style={styles.WelcomeMessage}> Welcome E0407217! </Text>
          <FlatGrid
            itemDimension={130}
            items={options}
            style={styles.gridView}
            renderItem={({ item, index }) => (
              <View style={[styles.optionContainer]}>
                <Text style={styles.optionName}> {item.name} </Text>
                <Image style={styles.optionImage} source={item.image} />
              </View>
            )}
          />
          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutBtnText}> Log out </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#003D7C",
  },
  WelcomeMessage: {
    fontSize: hp("4%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
  },
  optionImage: {
    marginTop: "-15%",
    height: hp("10%"),
    width: wp("50%"),
    resizeMode: "contain",
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  optionContainer: {
    marginLeft: wp("5%"),
    justifyContent: "center",
    borderRadius: 10,
    height: hp("20%"),
    width: hp("19%"),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  optionName: {
    fontSize: hp("2.5%"),
    textAlign: "center",
    height: hp("10%"),
    fontFamily: "Righteous-Regular",
  },
  logoutBtn: {
    marginLeft: wp("40%"),
    marginBottom: hp("20%"),
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    alignItems: "center",
  },
  logoutBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
});
