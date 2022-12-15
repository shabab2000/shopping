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

export default function Deliveryterms({ navigation }) {
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
          text: "เงื่อนไขการจัดส่ง",
          style: { color: "#fff" },
        }}
      />

      <View style={styles.container}>
        <View style={{ padding: 5 }}></View>
        <View
          style={{
            // backgroundColor: "red",
            // paddingHorizontal: 10,
            justifyContent: "center",
            marginHorizontal: 15,
            width: Platform.select({
              android: "33%",
              ios: "25%",
              default: "33%",
            }),
          }}
        >
          <Text style={{ alignSelf: "center", color: "#000000" }}>
            เงื่อนไขการจัดส่ง
          </Text>
          <View style={styles.hr}></View>
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
  textStyle: {
    fontSize: 14,
    color: "black",
    flex: 1,
  },
  hr: {
    // width: "32%",
    height: 2,
    backgroundColor: "#f37721",
    marginTop: 6,
    // marginLeft: 15,
  },
});
