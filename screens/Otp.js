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
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Icon } from "react-native-elements";

const Otp = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(route.params.email);
  const [ref, setRef] = useState("");

  const handlePress = async () => {
    try {
      if (!otp) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอก OTP !");
      }else if (otp.length !=6) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอก OTP 6ตัว ! ");
      } else {
        fetch("https://sricharoen-narathiwat.ml/otp.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
            ref: ref.ref,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson === "success") {
              navigation.navigate("Resetpassword", { email: email });
            } else {
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

  useEffect(() => {
    fetch("https://sricharoen-narathiwat.ml/ref.php", {
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

      .then((json) => setRef(json))

      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(ref.ref);

  return (
    <SafeAreaView style={styles.containerstatusbar}>
      <View style={styles.container}>
        <StatusBar animated={true} />

        <View>
          <TouchableOpacity
            onPress={() => navigation.replace("Forgotpassword")}
            style={styles.goBackcontainer}
          >
            <Image
              style={styles.goBackimage}
              source={require("../src/assets/arrow_back.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bigrightCircle}></View>
        <View style={styles.bigleftCircle}></View>
        <View style={styles.smallleftCircle}></View>
        <View style={styles.smallrightCircle}></View>
        <View style={styles.centerizedView}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
            <Image
                source={require("../src/assets/logo.png")}
                style={{ width: 75, height: 75 }}
              />
            </View>
            <Text style={styles.resetpasswordTitleText}>OTP</Text>
            <View style={styles.hrTop}></View>
            <View style={{ paddingTop: 15 }}>
              <Text style={styles.inputLabel}>อีเมล :</Text>
              <Text style={{ fontSize: 12, paddingLeft: 11 }}>
                {route.params.email}
              </Text>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>รหัส OTP :</Text>
              <TextInput
                placeholder="กรุณากรอกรหัส OTP"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={6}
                textContentType="telephoneNumber"
                onChangeText={(otp) => setOtp(otp)}
              />
            </View>

            <TouchableOpacity
              style={styles.resetpasswordButton}
              onPress={handlePress}
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

            <View style={{ paddingTop: 15 }}>
              <Text style={styles.inputLabel}>รหัสอ้างอิง : {ref.ref}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;

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
    paddingHorizontal: 10,
  },
  resetpasswordButton: {
    backgroundColor: "#F9AF4D",
    marginTop: 15,
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

  goBackcontainer: {
    position: "absolute",
    top: 5 + getStatusBarHeight(),
    left: 15,
  },
  goBackimage: {
    width: 25,
    height: 25,
  },
});
