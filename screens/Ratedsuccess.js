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
  Share,
  ToastAndroid,
} from "react-native";
import { Badge, Icon, withBadge, Header, Avatar } from "react-native-elements";

export default function Ratedsuccess({ navigation }) {
  return (
    <View style={styles.containerstatus}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
            paddingTop: 5,
            backgroundColor: "white",

            // borderRadius: 10,
            paddingHorizontal: 10,
            borderTopWidth: 1,
            borderTopColor: "#d1d1d1",
            elevation: 2,
            shadowColor: "#000000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 5,
              // backgroundColor: "yellow",
              width: "10%",
              // height: "25%",
            }}
          >
            <Avatar
              style={styles.Logo}
              source={require("../src/assets/logo.png")}
              overlayContainerStyle={{
                backgroundColor: "red",
                borderRadius: 15,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              // alignItems: "center",
              paddingHorizontal: 5,
              paddingTop: 5,
              // backgroundColor: "pink",
              width: "90%",
              // height: "25%",
            }}
          >
            <View style={{ paddingTop: 5, paddingBottom: 0 }}>
              <Text style={{ fontSize: 10 }}>S********2</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 3,
                alignItems: "center",
              }}
            >
              <Icon
                name="star"
                type="material-community"
                color="#f37721"
                size={15}
              />
              <Icon
                name="star"
                type="material-community"
                color="#f37721"
                size={15}
              />
              <Icon
                name="star"
                type="material-community"
                color="#f37721"
                size={15}
              />
              <Icon
                name="star"
                type="material-community"
                color="#f37721"
                size={15}
              />
              <Icon
                name="star"
                type="material-community"
                color="#f37721"
                size={15}
              />
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 2.5 }}>
              <Text style={{ fontSize: 10 }}>23-10-2022 18:59</Text>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <Text style={{ fontSize: 12 }}>
                สินค้ามีคุณภาพ คุ้มราคา สินค้ามีคุณภาพ คุ้มราคา สินค้ามีคุณภาพ
                คุ้มราคา สินค้ามีคุณภาพ คุ้มราคา สินค้ามีคุณภาพ
              </Text>
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <Image
                source={require("../src/assets/Slide-2.png")}
                style={{ height: 100, width: 100 }}
              />
            </View>
            {/* เริ่มต้น สินค้า */}
            <View
              style={{
                borderTopColor: "#d1d1d1",
                borderTopWidth: 1,
                flexDirection: "row",
                paddingVertical: 10,
              }}
            >
              <View style={{ width: "100%", backgroundColor: "white" }}>
                <View
                  style={{
                    //   backgroundColor: "green",
                    flexDirection: "row",
                    borderLeftWidth: 1,
                    borderLeftColor: "#d1d1d1",
                    borderRightWidth: 1,
                    borderRightColor: "#d1d1d1",
                    borderTopWidth: 1,
                    borderTopColor: "#d1d1d1",
                    borderBottomWidth: 1,
                    borderBottomColor: "#d1d1d1",
                  }}
                >
                  <View
                    style={{
                      //   backgroundColor: "#e1e1e1",
                      width: "25%",
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                    }}
                  >
                    <Image
                      source={require("../src/assets/green_lotus.png")}
                      style={{
                        height: 75,
                        width: 60,
                        alignSelf: "center",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      //   backgroundColor: "#e1e1e1",
                      width: "75%",
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      justifyContent: "center",
                      borderLeftWidth: 1,
                      borderLeftColor: "#d1d1d1",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      ปูนซีเมนต์ตราบัว ปูนซีเมนต์ตราบัวเขียว
                      ปูนซีเมนต์ตราบัวเขียว
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* สิ้นสุด สินค้า */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingBottom: 600,
    backgroundColor: "#e4e4e4",
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
  Logo: {
    width: 25,
    height: 25,
    // left: 7.5,
    // top: 5,
  },
});
