import React, { useState,useEffect } from "react";
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
} from "react-native";
import { Icon } from "react-native-elements";
import { ProgressDialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

export default function Login({ route, navigation }) {
  const [email, setEmail] = useState("wae-erfarn_2543@hotmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [passwordSecured, setPasswordSecured] = useState(true);

  const load = async () => {
    try {
        let uid = await AsyncStorage.getItem('uid');

        if(uid!== null) {
            //setEmail(email);
            navigation.replace("Index");
        }
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
 load();
}, [])

  const handlePress = async () => {
    try {
      if (!email) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกอีเมล!");
      } else if (!password) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกรหัสผ่าน!");
      } else {
        setLoading(true);
        fetch("https://sricharoen-narathiwat.ml/login.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,

            password: password,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.result === "success") {
              AsyncStorage.getItem("uid").then((value) => {
                if (value == null) {
                  AsyncStorage.setItem("uid", responseJson.uid);
                  navigation.replace("Index");
                } else {
                  navigation.replace("Index");
                }
                //AsyncStorage.setItem("Email", email);
              });
            } else {
              setLoading(false);
              setTimeout;
              Alert.alert("แจ้งเตือน!", responseJson.result);
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

  async function signInWithFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: "370685094633933",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
          .then((response) => response.json())
          .then((responseJson) => {
            setFacebook(responseJson);
            console.log(responseJson);
          });

        navigation.replace("Index");
        Alert.alert("Logged in!", `Hi Facebook`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "714197787759-ss56q7qllj8k12j6d15hgvnj3a73qvq4.apps.googleusercontent.com",
        iosClientId:
          "714197787759-nv6q9r1q0a5nhb9sconciftqvqdmreqm.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result.user);
        navigation.replace("Index");
        Alert.alert("Logged in!", "Hi Google Account");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

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
            <Text style={styles.loginTitleText}>เข้าสู่ระบบ</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <View style={styles.hr}></View>
            </View>

            <View style={{ paddingTop: 10 }}></View>
            <Text style={styles.inputLabel}>Username / Email</Text>
            <View style={styles.inputView}>
              <Icon name="email" type="material-community" size={20} />
              <TextInput
                placeholder="กรุณากรอกชื่อผู้ใช้/อีเมล"
                style={{ flex: 1, paddingHorizontal: 12, fontSize: 12 }}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={{ paddingTop: 5 }}></View>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputView}>
              <Icon name="lock" type="material-community" size={20} />
              <TextInput
                placeholder={"กรุณากรอกรหัสผ่าน"}
                style={{ flex: 1, paddingHorizontal: 12, fontSize: 12 }}
                secureTextEntry={passwordSecured}
                textContentType="password"
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}
              >
                <Icon
                  name={passwordSecured ? "eye" : "eye-off"}
                  type="material-community"
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Forgotpassword")}
              >
                <Text style={styles.forgotPasswordText}>ลืมรหัสผ่าน?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
              <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Text style={styles.haveloginText}> หากยังไม่มีบัญชี ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.loginText}> ลงทะเบียน </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <View style={styles.hr}></View>
            </View>

            {/* <TouchableOpacity
              style={styles.facebookButton}
              onPress={signInWithFacebook}
            >
              <Icon
                name="facebook"
                type="font-awesome"
                size={20}
                color="#fff"
                paddingHorizontal={3}
              />
              <Text style={styles.facebookButtonText}>
                เข้าสู่ระบบด้วย Facebook
              </Text>
            </TouchableOpacity> */}
            <View style={{ paddingTop: 5, paddingBottom: 5 }}></View>

            {/* <TouchableOpacity
              style={styles.googleButton}
              onPress={signInWithGoogleAsync}
            >
              <Icon name="google" type="font-awesome" size={20} color="#fff" />
              <Text style={styles.googleButtonText}>
                เข้าสู่ระบบด้วย Google
              </Text>
            </TouchableOpacity> */}
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
    top: "15%",
  },
  authBox: {
    width: "85%",
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
    backgroundColor: "#000000",
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
  loginTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  hr: {
    width: "80%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  inputView: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
  },

  loginButton: {
    backgroundColor: "#F9AF4D",
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },

  facebookButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C66C4",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  facebookButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  googleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2402B",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  googleButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  haveloginText: {
    textAlign: "center",
    fontSize: 12,
  },
  loginText: {
    textAlign: "center",
    color: "#F9AF4D",
    fontSize: 12,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    textAlign: "right",
    marginTop: 12,
    color: "#F9AF4D",
    fontSize: 12,
  },
});
