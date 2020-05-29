import React, { Component } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";

const tutor = [
  { key: "John Tan Ah kow" },
  { key: "Peter Lee" },
  { key: "Mary Goh" },
  { key: "Prof Aaron Tan" },
  { key: "Prof Martin Henz" },
  { key: "Prof Henry" },
];

let customFonts = {
  "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
};

export default class BookConsultScreen extends Component {
  state = {
    consultType: "public",
    fontsLoaded: false,
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    modalVisible: false,
    chosenDate: "",
    chosenTime: "",
    chosenTutor: "",
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  updateTutorModalChoice = (data) => {
    this.setState({
      chosenTutor: data,
      modalVisible: !this.state.modalVisible,
    });
  };

  handleDatePicker = (date) => {
    this.setState({
      isDatePickerVisible: false,
      chosenDate: moment(date).format("DD-MMM-YY"),
    });
  };

  handleTimePicker = (time) => {
    this.setState({
      isTimePickerVisible: false,
      chosenTime: moment(time).format("hh:mm A"),
    });
  };

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
    });
  };

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false,
    });
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    const { modalVisible } = this.state;
    if (this.state.fontsLoaded) {
      return (
        <View>
          <KeyboardAwareScrollView
            innerRef={(ref) => {
              this.scroll = ref;
            }}
          >
            <BreadCrumb />
            <ScrollView style={styles.body}>
              <Text style={styles.title}> Fill in consultation details: </Text>

              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                >
                  <View>
                    <View style={styles.modalView}>
                      <Text style={styles.modalTitle}>Teaching Assistant:</Text>
                      <ScrollView>
                        {tutor.map((item) => (
                          <TouchableOpacity
                            style={styles.modalBtn}
                            onPress={() =>
                              this.updateTutorModalChoice(item.key)
                            }
                          >
                            <Text style={styles.modalBtnText}>
                              {" "}
                              {item.key}{" "}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <Text style={styles.itemName}>{"Teaching Assistant:"}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.textBox}
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={this.state.chosenTutor}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  >
                    <Image
                      source={require("../assets/images/teachingassistant.png")}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemName}>{"Date:"}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.dateTimeTextBox}
                    underlineColorAndroid="transparent"
                    value={this.state.chosenDate}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.showDatePicker}
                  >
                    <Image
                      source={require("../assets/images/date.png")}
                      style={styles.imageStyle}
                    />
                    <DateTimePicker
                      isVisible={this.state.isDatePickerVisible}
                      onConfirm={this.handleDatePicker}
                      onCancel={this.hideDatePicker}
                      mode={"date"}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemName}>{"Time:"}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.dateTimeTextBox}
                    underlineColorAndroid="transparent"
                    value={this.state.chosenTime}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.showTimePicker}
                  >
                    <Image
                      source={require("../assets/images/time.png")}
                      style={styles.imageStyle}
                    />

                    <DateTimePicker
                      headerTextIOS="Pick a time"
                      isVisible={this.state.isTimePickerVisible}
                      onConfirm={this.handleTimePicker}
                      onCancel={this.hideTimePicker}
                      mode={"time"}
                      is24Hour={false}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemName}>{"Location:"}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.textBox}
                    underlineColorAndroid="transparent"
                  />
                  <TouchableOpacity style={styles.button}>
                    <Image
                      source={require("../assets/images/location.png")}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={styles.itemName}>{"Students involved:"}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={styles.textBox}
                    underlineColorAndroid="transparent"
                    maxLength={20}
                    numberofLines={5}
                  />
                  <TouchableOpacity style={styles.button}>
                    <Image
                      source={require("../assets/images/student.png")}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.itemName}> Remarks:</Text>
              <View>
                <TextInput
                  multiline={true}
                  maxLength={200}
                  numberofLines={10}
                  style={styles.remarkBox}
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity style={styles.bookBtn}>
                <Text style={styles.bookBtnText}>Book</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#003D7C",
  },
  title: {
    marginTop: "2%",
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    marginBottom: "3%",
  },
  dateTimeTextBox: {
    marginLeft: wp("7%"),
    flex: 1,
    paddingHorizontal: wp("2%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    marginHorizontal: wp("25"),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: hp("3.5%"),
    width: wp("50%"),
    borderRadius: 5,
    margin: hp("2%"),
  },
  textBox: {
    flex: 1,
    paddingHorizontal: wp("1%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  itemName: {
    marginTop: hp("1%"),
    textAlign: "center",
    fontSize: hp("2%"),
    color: "white",
    alignItems: "center",
    height: hp("5%"),
    width: wp("100%"),
    fontFamily: "Righteous-Regular",
    marginBottom: hp("-3%"),
  },
  button: {
    height: hp("3.5%"),
    width: wp("10%"),
    borderRadius: hp("0.8%"),
    borderColor: "black",
    borderWidth: 1.1,
    alignItems: "center",
  },
  imageStyle: {
    height: hp("3%"),
    width: wp("7.5%"),
    resizeMode: "contain",
    alignItems: "center",
  },
  remarkBox: {
    marginTop: "3%",
    marginLeft: "15%",
    flexDirection: "row",
    borderColor: "black",
    fontSize: hp("1.5%"),
    marginBottom: "5%",
    height: hp("8.5%"),
    width: wp("68%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp("2%"),
  },
  bookBtn: {
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    marginTop: "2%",
    marginHorizontal: "40%",
    flexDirection: "column",
    alignItems: "center",
  },
  bookBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    alignItems: "center",
    marginTop: "4%",
  },

  modal: {
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "#CFD8DC",
    flexDirection: "column",
    height: hp("36%"),
  },
  modalTitle: {
    textAlign: "center",
    fontSize: hp("3%"),
    fontFamily: "Righteous-Regular",
    marginBottom: "5%",
  },
  modalBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    height: hp("3.5%"),
    width: wp("45%"),
    justifyContent: "center",
    left: "25%",
    marginBottom: "3%",
  },
  modalBtnText: {
    textAlign: "center",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
});