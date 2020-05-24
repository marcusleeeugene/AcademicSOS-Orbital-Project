import React from "react";
import LoginScreen from "./presentation/LoginScreen.js";
import SelectModuleScreen from "./presentation/SelectModuleScreen.js";
import BookConsultScreen from "./presentation/BookConsultScreen.js";
import HomeScreen from "./presentation/HomeScreen.js";
import CreateConsultScreen from "./presentation/CreateConsultScreen.js";
import ManageBookingScreen from "./presentation/ManageBookingScreen.js";
import PublicConsultScreen from "./presentation/PublicConsultScreen.js";
import ConsultDetailScreen from "./presentation/ConsultDetailScreen.js";
import RadioButton from "./components/RadioButton.js";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
const options = [
  {
    key: "public",
    text: "Public",
  },
  {
    key: "private",
    text: "Private",
  },
];

//Testing: Always uncomment whatever component you would like to show.
export default function App() {
  return (
    //<LoginScreen></LoginScreen>
    //<HomeScreen></HomeScreen>
    //<SelectModuleScreen></SelectModuleScreen>
    //<BreadCrumb></BreadCrumb>
    //<CreateConsultScreen></CreateConsultScreen>
    //<PublicConsultScreen></PublicConsultScreen>
    <ManageBookingScreen></ManageBookingScreen>
    //<ConsultDetailScreen></ConsultDetailScreen>
  );
}
