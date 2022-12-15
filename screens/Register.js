import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  SafeAreaView,
  Button,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import BackButton from "../src/component/BackButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import Recaptcha from "react-native-recaptcha-that-works";

function toThaiDateString(date) {
  let monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  return `${numOfDay} ${month} ${year}`;
}

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [telephone, setTelephone] = useState("");
  // const [idcard, setIdcard] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());

  const [show, setShow] = useState(false);

  const size = "normal";
  const [key, setKey] = useState("<none>");
  const m = Number(birthday.getMonth() + 1);
  const birthdays = birthday.getFullYear() + "-" + m + "-" + birthday.getDate();
  console.log("b: " + birthdays);
  const $recaptcha = useRef();

  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShow(false);
    setBirthday(currentDate);
  };

  const handlePress = async () => {
    try {
      if (!username) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกชื่อผู้ใช้!");
      } else if (username.length<=3) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกชื่อผู้ใช้มากกว่า 4ตัว!");
      } else if (!email) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกอีเมล!");
      } else if (!password) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกรหัสผ่าน!");
      } else if (password.length <6) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกรหัสผ่านมากว่า 6ตัว!");
      } else if (!confirmpassword) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกยืนยันรหัสผ่าน!");
      } else if (password !== confirmpassword) {
        Alert.alert("แจ้งเตือน!", "กรุณายืนยันรหัสผ่านให้ตรงกัน!");
      } else if (!telephone) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกเบอร์โทรศัพท์!");
      } else if (!name) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกชื่อ-นามสกุล!");
      } else if (!gender) {
        Alert.alert("แจ้งเตือน!", "กรุณาเลือกเพศ!");
      } else if (!birthday) {
        Alert.alert("แจ้งเตือน!", "กรุณาเลือกวันเกิด!");
      } else {
        fetch("https://sricharoen-narathiwat.ml/register.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            telephone: telephone,
            //idcard: idcard,
            name: name,
            gender: gender,
            birthday: birthdays,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson === "สมัครสมาชิกสำเร็จ") {
              Alert.alert("แจ้งเตือน!", responseJson);
              navigation.replace("Login");

              //AsyncStorage.setItem("Email", email);
            } else {
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
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
              <Recaptcha
                ref={$recaptcha}
                lang="th"
                // footerComponent={
                //   <SafeAreaView>
                //     <Button title="Close" onPress={handleClosePress} />
                //   </SafeAreaView>
                // }
                //   headerComponent={
                //     <SafeAreaView>
                //       <Text>Footer here</Text>
                //     </SafeAreaView>
                //   }
                loadingComponent={
                  <>
                    <ActivityIndicator color="green" />
                    <Text>Loading reCaptcha...+</Text>
                  </>
                }
                siteKey="6Lc6jvsfAAAAADAHp1FRQgUFJWo0u9xkgnZ2Qwo9"
                baseUrl="http://www.sricharoen-narathiwat.ml"
                size={size}
                theme="light"
                // style={{ backgroundColor: 'rgba(244,0,0,0.7)' }}
                //   onLoad={() => alert('onLoad event')}
                //   onClose={() => alert('onClose event')}
                onError={(err) => {
                  alert("onError event");
                  console.warn(err);
                }}
                onExpire={() => alert("onExpire event")}
                onVerify={(token) => {
                  handlePress();
                  setKey(token);
                }}
              />
              <Text style={styles.registerTitleText}>สมัครสมาชิก</Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
              >
                <View style={styles.hrTop}></View>
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  placeholder="กรุณากรอกชื่อผู้ใช้"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(username) => setUsername(username)}
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  placeholder="กรุณากรอกอีเมล"
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>รหัสผ่าน</Text>
                <TextInput
                  placeholder="กรุณากรอกรหัสผ่าน"
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={(password) => setPassword(password)}
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>ยืนยันรหัสผ่าน</Text>
                <TextInput
                  placeholder="กรุณากรอกยืนยันรหัสผ่าน"
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={(confirmpassword) =>
                    setConfirmpassword(confirmpassword)
                  }
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>ชื่อ-นามสกุล</Text>
                <TextInput
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(name) => setName(name)}
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>เบอร์โทรศัพท์</Text>
                <TextInput
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  style={styles.input}
                  onChangeText={(telephone) => setTelephone(telephone)}
                  maxLength={10}
                  minLength={10}
                  keyboardType="phone-pad"
                />
              </View>

              {/* <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>เลขที่บัตรประชาชน</Text>
                <TextInput
                  placeholder="กรุณากรอกเลขที่บัตรประชาชน"
                  style={styles.input}
                  onChangeText={(idcard) => setIdcard(idcard)}
                  maxLength={13}
                  minLength={13}
                  keyboardType="phone-pad"
                />
              </View> */}

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>เพศ</Text>
                <Picker
                  selectedValue={gender}
                  onValueChange={(gender) => setGender(gender)}
                >
                  <Picker.Item label="กรุณาเลือกเพศ" value="" />
                  <Picker.Item label="ชาย" value="ชาย" />
                  <Picker.Item label="หญิง" value="หญิง" />
                </Picker>
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={birthday}
                  display="default"
                  onChange={onChange}
                />
              )}

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>วัน/เดือน/ปีเกิด</Text>
                <TextInput
                  style={styles.input}
                  onTouchStart={() => setShow(true)}
                  value={toThaiDateString(birthday)}
                  onChangeText={(birthday) => setBirthday(birthday)}
                />
              </View>

              <View style={{ paddingTop: 10 }}></View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => handleOpenPress()}
              >
                <Text style={styles.registerButtonText}>ลงทะเบียน</Text>
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text style={styles.haveregisterText}> มีบัญชีอยู่แล้ว ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.registerText}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerstatusbar: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
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
  registerTitleText: {
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
    fontSize: 10,
  },
  registerButton: {
    backgroundColor: "#F9AF4D",
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  registerButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
  haveregisterText: {
    textAlign: "center",
    fontSize: 12,
  },
  registerText: {
    textAlign: "center",
    color: "#F9AF4D",
    fontSize: 12,
  },
});
