import React, { useState } from "react";
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
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import BackButton from "../src/component/BackButton";
import { ProgressDialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Forgotpassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotPress = async () => {
    try {
      if (!email) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกอีเมล!");
      } else {
        setLoading(false);
        fetch("https://sricharoen-narathiwat.ml/forgotpassword.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson === "ส่งรหัสยืนยันในอีเมลสำเร็จ") {
              Alert.alert("แจ้งเตือน!", responseJson);
              navigation.replace("Otp", { email: email });
            } else {
              setLoading(false);
              setTimeout;
              Alert.alert("แจ้งเตือน!", responseJson);
            }
            // Showing response message coming from server after inserting records.
            //       Alert.alert(responseJson);
            // navigation.navigate('Profile');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.containerstatusbar}>
      <View style={styles.container}>
        <ProgressDialog
          title="รอสักครู่"
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          message="กำลังโหลด..."
          visible={loading}
        />
        <StatusBar animated={true} />
        <BackButton goBack={navigation.goBack} />
        <View style={styles.bigrightCircle}></View>
        <View style={styles.bigleftCircle}></View>
        <View style={styles.smallleftCircle}></View>
        <View style={styles.smallrightCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
            <Image
                source={require("../src/assets/logo.png")}
                style={{ width: 75, height: 75 }}
              />
            </View>
            <Text style={styles.resetpasswordTitleText}>รีเซ็ตรหัสผ่าน</Text>
            <View style={styles.hrTop}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>อีเมล</Text>
              <TextInput
                style={styles.input}
                placeholder="กรุณากรอกอีเมล"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={styles.inputBox}></View>
            <TouchableOpacity
              style={styles.resetpasswordButton}
              onPress={forgotPress}
            >
              <Text style={styles.resetpasswordButtonText}>รีเซ็ตรหัสผ่าน</Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <View style={styles.hrLow}></View>
            </View>
            <Text style={styles.resetpasswordlinkText}>
              คุณจะได้รับรหัส OTP ผ่านอีเมล
            </Text>
            <Text style={styles.resetpasswordText}>เพื่อรีเซ็ตรหัสผ่าน</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerstatusbar: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bigrightCircle: {
    width: Dimensions.get("window").height * 0.3,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "#F9AF4D",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width * -0.2,
    right: Dimensions.get("window").width * -0.3,
    top: 0,
  },
  bigleftCircle: {
    width: Dimensions.get("window").height * 0.3,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "#F9AF4D",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width * -0.2,
    left: Dimensions.get("window").width * -0.3,
  },
  smallleftCircle: {
    width: Dimensions.get("window").height * 0.2,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#F9AF4D",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width * -0.2,
    left: Dimensions.get("window").width * -0.3,
    top: 175,
  },
  smallrightCircle: {
    width: Dimensions.get("window").height * 0.2,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#F9AF4D",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width * -0.2,
    right: Dimensions.get("window").width * -0.3,
    bottom: 160,
  },
  centerizedView: {
    width: "100%",
    top: "30%",
  },
  authBox: {
    width: "80%",
    backgroundColor: "#fafafa",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -50,
    marginBottom: -50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  resetpasswordTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  hrTop: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  hrLow: {
    width: "80%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  resetpasswordButton: {
    backgroundColor: "#F9AF4D",
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 4,
  },
  resetpasswordButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
  resetpasswordlinkText: {
    textAlign: "center",
    fontSize: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  resetpasswordText: {
    textAlign: "center",
    fontSize: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
});
