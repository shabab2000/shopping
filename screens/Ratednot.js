import React from "react";
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
import { Icon, Header } from "react-native-elements";

export default function Ratednot({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 5,
          paddingVertical: 5,
          borderTopWidth: 1,
          borderTopColor: "#d1d1d1",
        }}
      >
        <View
          style={{
            // backgroundColor: "yellow",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontSize: 10 }}>เลขที่ใบสั่งซื้อ: SN-16516515661</Text>
          <Text style={{ textAlign: "right", fontSize: 10, color: "#f37721" }}>
            สำเร็จ
          </Text>
        </View>
        {/* เริ่มต้นสินค้า */}
        <View
          style={{
            // backgroundColor: "green",
            flexDirection: "row",

            // paddingHorizontal: 5,
            // paddingVertical: 5,
            borderTopWidth: 1,
            borderTopColor: "#d1d1d1",
          }}
        >
          <View
            style={{
              // backgroundColor: "green",
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
              // backgroundColor: "pink",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              ปูนซีเมนต์ตราบัว ปูนซีเมนต์ตราบัวเขียว ปูนซีเมนต์ตราบัวเขียว
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: "skyblue",
              width: "25%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "right" }}>฿250</Text>
            <Text style={{ fontSize: 12, textAlign: "right" }}>x1</Text>
          </View>
        </View>
        {/* สิ้นสุดสินค้า */}
        <View
          style={{
            // backgroundColor: "green",
            flexDirection: "row",

            // paddingHorizontal: 5,
            // paddingVertical: 5,
            borderTopWidth: 1,
            borderTopColor: "#d1d1d1",
          }}
        >
          <View
            style={{
              // backgroundColor: "green",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "left" }}>ค่าจัดส่ง</Text>
          </View>

          <View
            style={{
              // backgroundColor: "skyblue",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "right" }}>฿200</Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "green",
            flexDirection: "row",

            // paddingHorizontal: 5,
            // paddingVertical: 5,
            borderTopWidth: 1,
            borderTopColor: "#d1d1d1",
          }}
        >
          <View
            style={{
              // backgroundColor: "green",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          ></View>

          <View
            style={{
              // backgroundColor: "skyblue",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "right" }}>
              รวมค่าสินค้า 1 ชิ้น : ฿450
            </Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "green",
            flexDirection: "row",

            // paddingHorizontal: 5,
            // paddingVertical: 5,
            // borderTopWidth: 1,
            // borderTopColor: "grey",
          }}
        >
          <View
            style={{
              // backgroundColor: "green",
              width: "70%",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 10 }}>กรุณาให้คะแนนภายใน 24-04-2022</Text>
            <Text style={{ fontSize: 10, color: "#f37721" }}>
              ให้คะแนนและเขียนรีวิว
            </Text>
          </View>

          <View
            style={{
              // backgroundColor: "skyblue",
              width: "30%",
              paddingHorizontal: 5,
              paddingVertical: 5,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ backgroundColor: "#f37721", borderRadius: 2 }}
              onPress={() => {
                navigation.navigate("RateAllProduct");
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  paddingVertical: 5,
                  color: "white",
                }}
              >
                ให้คะแนน
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 600,
    backgroundColor: "#e4e4e4",
  },
});
