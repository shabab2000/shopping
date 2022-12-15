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
import MapView, { Callout, Marker } from "react-native-maps";
import Communications from "react-native-communications";

export default function ContactUs({ navigation }) {
  return (
    <View style={styles.containerstatus}>
      <Header
        placement="center"
        backgroundColor="#f37721"
        containerStyle={{
          borderBottomWidth: 0,
          height: Platform.select({
            android: 80,
            ios: 100,
            default: 80,
          }),
        }}
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
          text: "ติดต่อเรา",
          style: { color: "#fff" },
        }}
      />

      <View style={styles.container}>
        <View style={{ padding: 5 }}></View>
        <View
          style={{
            // backgroundColor: "yellow",
            // paddingHorizontal: 10,
            justifyContent: "center",
            marginHorizontal: 15,
            width: Platform.select({
              android: "18%",
              ios: "14%",
              default: "18%",
            }),
          }}
        >
          <Text style={{ alignSelf: "center", color: "#000000" }}>
            ติดต่อเรา
          </Text>
          <View style={styles.hr}></View>
        </View>

        <View style={styles.box}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>สำนักงานใหญ่</Text>
          <Text style={{ fontSize: 12, paddingTop: 10 }}>
            85/3 หมู่ 2 ตำบลโคกเคียน อำเภอเมืองนราธิวาส
          </Text>
          <Text style={{ fontSize: 12 }}>
            จังหวัดนราธิวาส รหัสไปรษณีย์ 96000
          </Text>
          <Text style={{ fontSize: 12 }}>
            โทร :{" "}
            <Text
              style={{ color: "#f37721", textDecorationLine: "underline" }}
              onPress={() => Communications.phonecall("073541199", true)}
            >
              073-541-199
            </Text>{" "}
            หรือ{" "}
            <Text
              style={{ color: "#f37721", textDecorationLine: "underline" }}
              onPress={() => Communications.phonecall("0817383061", true)}
            >
              081-738-3061
            </Text>
          </Text>
          <Text style={{ fontSize: 12 }}>
            แฟกซ์ :{" "}
            <Text
              style={{ color: "#f37721", textDecorationLine: "underline" }}
              onPress={() => Communications.phonecall("073541198", true)}
            >
              073-541-198
            </Text>
          </Text>
          <Text style={{ fontSize: 12 }}>เวลาทำการ :</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12, paddingLeft: 78 }}>
              จันทร์-พฤหัสบดี
            </Text>
            <Text style={{ fontSize: 12, paddingLeft: 10 }}>
              เวลา 8.00-17.30 น.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12, paddingLeft: 78 }}>เสาร์</Text>
            <Text style={{ fontSize: 12, paddingLeft: 75 }}>
              เวลา 8.00-17.30 น.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12, paddingLeft: 78 }}>อาทิตย์</Text>
            <Text style={{ fontSize: 12, paddingLeft: 60 }}>
              เวลา 8.00-15.00 น.
            </Text>
          </View>
        </View>
        {/* <View style={{ alignItems: "center", paddingTop: 30 }}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 6.489338,
              longitude: 101.775617,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{ latitude: 6.489338, longitude: 101.775617 }}
              pinColor="#f37721"
            >
              <Callout>
                <Text>ร้านอยู่ตรงนี้</Text>
              </Callout>
            </Marker>
          </MapView>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: "70%",
  },
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
  textStyle: {
    fontSize: 14,
    color: "black",
    flex: 1,
  },
  hr: {
    // width: "17%",
    height: 2,
    backgroundColor: "#f37721",
    marginTop: 6,
    // marginLeft: 15,
  },
  box: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});
