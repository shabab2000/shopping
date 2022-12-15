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
import * as ImagePicker from "expo-image-picker";
import { ProgressDialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [idcard, setIdcard] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState("");

  // const [user, setUser] = useState(null);

  // const Async = () => {
  //   AsyncStorage.getItem("ُEmail").then((value) => {
  //     if (value !== null) {
  //       setEmail(value);
  //     } else {
  //       setEmail("");
  //     }
  //   });
  // };
  // console.log(email);

  // const load = async () => {
  //   let email = await AsyncStorage.getItem("Email");
  //   fetch("https://sricharoen-narathiwat.ml/profile.php?email=" + email)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setUser(responseJson);
  //       // Showing response message coming from server after inserting records.
  //       //       Alert.alert(responseJson);
  //       // navigation.navigate('Profile');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const Profile = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/profile.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setProfile(json))
      .catch((error) => console.error(error));
  };

  const handlePress = () => {
    try {
      if (image !== null) {
        setLoading(true);
        let filename = image.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append("photo", { uri: image, name: filename, type });
        formData.append("tel", profile.telephone);
        formData.append("name", profile.name);
        formData.append("id", profile.id);
        formData.append("img", "img");

        fetch("https://sricharoen-narathiwat.ml/updateprofile.php", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            Alert.alert("แจ้งเตือน!", responseJson);
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (!profile.name) {
          Alert.alert("แจ้งเตือน!", "กรุณากรอกชื่อ!");
        } else if (!profile.telephone) {
          Alert.alert("แจ้งเตือน!", "กรุณากรอกเอร์โทรศัพท์!");
        } else {
          setLoading(!loading);
          fetch("https://sricharoen-narathiwat.ml/updateprofile.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: profile.name,
              tel: profile.telephone,
              id: profile.id,
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson === "อัปเดทโปรไฟล์สำเร็จ") {
                setLoading(false);
                Alert.alert("แจ้งเตือน!", responseJson);
              } else {
                setLoading(false);
                Alert.alert("แจ้งเตือน!", responseJson);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    Profile();
    (async () => {
      if (Platform.OS !== "android") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    // load();
    // Async();
  }, []);
  // console.log(user);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
          text: "ข้อมูลส่วนตัว",
          style: { color: "#fff" },
        }}
      />

      <ScrollView>
        <View style={styles.container}>
          <View
            style={{ backgroundColor: "#f37721", width: "100%", height: "25%" }}
          >
            <ProgressDialog
              title="รอซักครู่"
              activityIndicatorColor="blue"
              activityIndicatorSize="large"
              message="กำลังโหลด..."
              visible={loading}
            />
            <View
              style={{
                paddingTop: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                ) : profile.img ? (
                  <Image
                    source={{
                      uri: "https://sricharoen-narathiwat.ml/" + profile.img,
                    }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                ) : (
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    size={50}
                    color="#fff"
                  />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <View style={styles.nameButton}>
                <Text style={styles.nameButtonText}>{profile.name}</Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "white" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  // backgroundColor: "orange",
                  width: "40%",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    // paddingLeft: 18,
                    // textAlign: "center",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: "blue",
                    fontSize: 10,
                    color: "black",
                    // flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  รหัสลูกค้า
                </Text>
              </View>
              <View
                style={{
                  // alignItems: "center",
                  paddingHorizontal: 20,
                  // backgroundColor: "pink",
                  width: "60%",
                }}
              >
                <Text
                  style={{
                    color: "#f37721",
                    fontSize: 12,
                    // right: Platform.select({
                    //   android: 117,
                    //   ios: 144,
                    //   default: 117,
                    // }),
                  }}
                >
                  {profile.id}
                </Text>
              </View>
            </View>
            <Divider />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  // backgroundColor: "orange",
                  width: "40%",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    // paddingLeft: 18,
                    // textAlign: "center",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: "blue",
                    fontSize: 10,
                    color: "black",
                    // flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  ชื่อ-นามสกุล<Text style={{ color: "red" }}>*</Text>
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 5,
                  // backgroundColor: "pink",
                  width: "60%",
                }}
              >
                <TextInput
                  style={styles.inputprofile}
                  // value={user.name}
                  textContentType="name"
                  color="#f37721"
                  value={profile ? profile.name : ""}
                  paddingHorizontal={15}
                  fontSize={12}
                  autoCapitalize="none"
                  onChangeText={(txt) => setProfile({ ...profile, name: txt })}
                />
              </View>
            </View>
            <Divider />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  // backgroundColor: "orange",
                  width: "40%",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    // paddingLeft: 18,
                    // textAlign: "center",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: "blue",
                    fontSize: 10,
                    color: "black",
                    // flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  E-mail
                  {/* <Text style={{ color: "red" }}>*</Text> */}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 5,
                  // backgroundColor: "pink",
                  width: "60%",
                }}
              >
                <TextInput
                  style={styles.inputprofileemail}
                  textContentType="emailAddress"
                  // value={user.email}
                  color="#f37721"
                  value={profile.email}
                  editable={false}
                  paddingHorizontal={15}
                  fontSize={12}
                  autoCapitalize="none"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <Divider />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  // backgroundColor: "orange",
                  width: "40%",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    // paddingLeft: 18,
                    // textAlign: "center",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: "blue",
                    fontSize: 10,
                    color: "black",
                    // flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  เบอร์โทรศัพท์<Text style={{ color: "red" }}>*</Text>
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 5,
                  // backgroundColor: "pink",
                  width: "60%",
                }}
              >
                <TextInput
                  style={styles.inputprofile}
                  textContentType="telephoneNumber"
                  // value={user.telephone}
                  color="#f37721"
                  paddingHorizontal={15}
                  fontSize={12}
                  value={profile ? profile.telephone : ""}
                  maxLength={10}
                  minLength={10}
                  keyboardType="phone-pad"
                  onChangeText={(txt) =>
                    setProfile({ ...profile, telephone: txt })
                  }
                />
              </View>
            </View>
            <Divider />

            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                backgroundColor: "white",
              }}
            >
              <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
                เลขที่บัตรประชาชน
              </Text>
              <TextInput
                style={styles.inputprofile}
                textContentType="creditCardNumber"
                color="#f37721"
                paddingHorizontal={15}
                fontSize={12}
                value={profile.idcard}
                editable={false}
                maxLength={13}
                minLength={13}
                keyboardType="phone-pad"
                onChangeText={(idcard) => setIdcard(idcard)}
              />
            </View>
            <Divider /> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  // backgroundColor: "orange",
                  width: "40%",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    // paddingLeft: 18,
                    // textAlign: "center",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: "blue",
                    fontSize: 10,
                    color: "black",
                    // flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  วันเกิด
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 5,
                  // backgroundColor: "pink",
                  width: "60%",
                }}
              >
                <TextInput
                  style={styles.inputprofile}
                  textContentType="telephoneNumber"
                  // value={user.birthday}
                  editable={false}
                  color="#f37721"
                  paddingHorizontal={15}
                  fontSize={12}
                  value={profile.birthday}
                  maxLength={10}
                  minLength={10}
                  keyboardType="phone-pad"
                  onChangeText={(birthday) => setBirthday(birthday)}
                />
              </View>
            </View>
            <Divider />

            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 10,
                    marginHorizontal: 3,
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  * กรุณาป้อนข้อมูล
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>

          <View style={{ alignItems: "center", paddingTop: 5 }}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handlePress()}
            >
              <Text style={styles.saveButtonText}>บันทึก</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", paddingTop: 5 }}>
            <TouchableOpacity
              style={styles.deliveryAddressButton}
              onPress={() => {
                navigation.navigate("Address");
              }}
            >
              <Text style={styles.deliveryAddressButtonText}>
                ที่อยู่ในการจัดส่ง
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", paddingTop: 5 }}>
            <TouchableOpacity
              style={styles.taxInvoiceAddressButton}
              onPress={() => {
                navigation.navigate("TaxAddress");
              }}
            >
              <Text style={styles.taxInvoiceAddressButtonText}>
                ที่อยู่ใบกำกับภาษี
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 10,
    color: "black",
    flex: 1,
    fontWeight: "bold",
  },
  inputprofile: {
    width: "100%",
    height: 35,
    backgroundColor: "#E4E4E4",
    borderRadius: 12,
    // right: 10,
  },
  inputprofileemail: {
    width: "100%",
    height: 35,
    backgroundColor: "#E4E4E4",
    borderRadius: 12,
    // right: 10,
  },
  input: {
    width: "55%",
    height: 35,
    backgroundColor: "#E4E4E4",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 30,
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
  nameButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    color: "#f37721",
  },
  nameButton: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },

  saveButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  saveButton: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#90c6a4",
    backgroundColor: "#2e9b57",
    paddingVertical: 12,
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

  deliveryAddressButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  deliveryAddressButton: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f37721",
    paddingVertical: 12,
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

  taxInvoiceAddressButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  taxInvoiceAddressButton: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#232428",
    paddingVertical: 12,
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
});
