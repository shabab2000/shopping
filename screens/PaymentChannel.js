import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  Alert,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { Icon, Avatar, ListItem, Divider, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentChannel({ navigation, route }) {
  const CreateOrder = async () => {
    let uid = await AsyncStorage.getItem("uid");
    Alert.alert(`ยืนยันชำระเงิน : โอน / ชำระผ่านบัญชีธนาคาร`, "", [
      { text: "ยกเลิก" },
      {
        text: "ตกลง",
        onPress: () => {
          fetch("https://sricharoen-narathiwat.ml/addorder.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item: route.params.item,
              id_address: route.params.id_address,
              id_tax: route.params.id_tax,
              delivery: route.params.delivery,
              ship: route.params.ship,
              totalp: route.params.totalp,
              totals: route.params.totals,
              discount: route.params.discount,
              uid: uid,
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.result === "สั่งซื้อสินค้าสำเร็จ") {
                Alert.alert("แจ้งเตือน!", responseJson.result);

                navigation.replace("Ordersuccess", { id: responseJson.id });
                //AsyncStorage.setItem("Email", email);
              } else {
                Alert.alert("แจ้งเตือน!", responseJson.result);
              }
              // Showing response message coming from server after inserting records.
              //       Alert.alert(responseJson);
              // navigation.navigate('Profile');
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    ]);
  };
  return (
    <View style={styles.containerstatus}>
      <Header
        placement="center"
        backgroundColor="#f37721"
        containerStyle={{ borderBottomWidth: 0 }}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.goBackcontainer}
          >
            <Icon
              style={styles.goBackimage}
              name="angle-left"
              type="font-awesome"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: "ช่องทางการชำระเงิน",
          style: { color: "#fff" },
        }}
      />
      {/* <View
          style={{
            backgroundColor: "#f37721",
            width: "100%",
            height: "7%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>การแจ้งเตือน</Text>
        </View> */}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textstyle}>กรุณาเลือกวิธีการชำระเงิน</Text>
          {/* <View>
            <ListItem bottomDivider>
              <Icon
                name="account-circle"
                type="material-community"
                size={20}
                marginHorizontal={3}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 14 }}>
                  โอน / ชำระเงินผ่านบัญชีธนาคาร
                </ListItem.Title>
                <ListItem.Title style={{ fontSize: 10 }}>.</ListItem.Title>
              </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
              <Icon
                name="qrcode-scan"
                type="material-community"
                size={20}
                marginHorizontal={3}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 14 }}>
                  QR Code
                </ListItem.Title>
                <ListItem.Title style={{ fontSize: 10 }}>
                  จ่ายง่ายๆ ไม่มีค่าธรรมเนียม ไม่ต้องแจ้งโอนเงิน
                  ทำรายการชำระเงินภายใน 15 นาที
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View> */}

          <TouchableOpacity
            style={styles.listpayment}
            onPress={() => CreateOrder()}
          >
            <View style={{ justifyContent: "center", padding: 20 }}>
              <Icon
                name="bank"
                type="material-community"
                size={40}
                marginHorizontal={3}
              />
            </View>
            <View style={{ flexDirection: "column", top: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                โอน / ชำระเงินผ่านบัญชีธนาคาร
              </Text>
              <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
              <View style={{ flexDirection: "row", height: "100%" }}>
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/kbank.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/scb.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/krungsri.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/bangkok.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/krungthai.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/aomsin.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/ttb.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/PP.png")}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* <View style={styles.hr}></View> */}

          {/* <View style={styles.listpayment}>
            <View style={{ justifyContent: "center", padding: 20 }}>
              <Icon
                name="qrcode-scan"
                type="material-community"
                size={40}
                marginHorizontal={3}
              />
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>QR Code</Text>
              <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
              <Text style={{ fontSize: 10, width: "60%" }}>
                จ่ายง่ายๆ ไม่มีค่าธรรมเนียม ไม่ต้องแจ้งโอนเงิน
                ทำรายการชำระเงินภายใน 15 นาที
              </Text>
            </View>
          </View> */}
        </View>
      </ScrollView>

      {/* <View style={{ alignItems: "center", paddingTop: 5, bottom: 5 }}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>ดำเนินการต่อ</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 200,
  },
  goBackcontainer: {
    position: "absolute",
    left: 15,
    top: -2,
  },
  goBackimage: {
    width: 30,
    height: 30,
  },
  textstyle: {
    padding: 10,
    left: 10,
    fontSize: 13,
  },
  hr: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#444",
    alignSelf: "center",
  },
  bankLogo: {
    width: Platform.OS === "ios" ? "7.6%" : "8.1%",
    height: "21%",
    marginLeft: 0.5,
    marginRight: 0.5,
  },
  listpayment: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "80%",
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#90c6a4",
    backgroundColor: "#ffffff",
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    // borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  // confirmButtonText: {
  //   marginHorizontal: 12,
  //   color: "#fff",
  //   fontSize: 10,
  //   fontWeight: "bold",
  // },
  // confirmButton: {
  //   display: "flex",
  //   flexDirection: "row",
  //   width: "98%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // backgroundColor: "#90c6a4",
  //   backgroundColor: "#f37721",
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 2,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.5,
  // },
});
