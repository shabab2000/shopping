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
  FlatList,
  Switch,
  ToastAndroid,
  Platform,
} from "react-native";
import { Icon, Header, ListItem, CheckBox } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from "react-native-simple-dialogs";
import Toast from "react-native-easy-toast";

export default function RateSelectProduct({ navigation, route }) {
  const [switchVal, setSwitchVal] = useState(false);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const toastRef = React.useRef();

  const ratings = (rating) => {
    setRating(rating);
    console.log(rating);
  };

  const Users = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/profile.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((error) => console.error(error));
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  }
  console.log(details);
  const handlePress = async () => {
    try {
      let uid = await AsyncStorage.getItem("uid");
      if (rating == 0) {
        Alert.alert("แจ้งเตือน!", "กรุณาให้คะแนนด้วย!");
      } else {
        if (image == null) {
          setLoading(true);
          fetch("https://sricharoen-narathiwat.ml/addreview.php", {
            method: "POST",
            body: JSON.stringify({
              img: "no",
              id: route.params.id,
              idp: route.params.idp,
              star: rating,
              pub: switchVal,
              details: details,
              uid: uid,
            }),
            headers: {
              Accept: "application/json",
              "content-type": "multipart/form-data",
            },
          })
            .then((response) => response.json())
            .then((responseJson) => {
              setLoading(false);
              {
                Platform.OS === "ios"
                  ? toastRef.current.show(responseJson, 3000)
                  : ToastAndroid.show(responseJson, 1000);
              }
              navigation.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setLoading(true);
          let filename = image.split("/").pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          let formData = new FormData();
          formData.append("photo", { uri: image, name: filename, type });
          formData.append("img", "yes");
          formData.append("id", route.params.id);
          formData.append("idp", route.params.idp);
          formData.append("star", rating);
          formData.append("pub", switchVal);
          formData.append("details", details);
          formData.append("uid", uid);

          fetch("https://sricharoen-narathiwat.ml/addreview.php", {
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
              {
                Platform.OS === "ios"
                  ? toastRef.current.show(responseJson, 3000)
                  : ToastAndroid.show(responseJson, 1000);
              }
              navigation.goBack();
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
    Users();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        Users();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.containerstatus}>
      <ProgressDialog
        title="รอสักครู่"
        activityIndicatorColor="blue"
        activityIndicatorSize="large"
        message="กำลังโหลด..."
        visible={loading}
      />
      <Toast
        ref={toastRef}
        style={{
          backgroundColor: "#333",
          top: 70,
          borderRadius: 20,
          // width: "40%",
        }}
        position="bottom"
        positionValue={200}
        fadeInDuration={300}
        fadeOutDuration={300}
        opacity={0.8}
        textStyle={{ color: "#fff", fontSize: 16, textAlign: "center" }}
      />
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
          text: "ให้คะแนนสินค้า",
          style: { color: "#fff" },
        }}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              handlePress();
            }}
            style={styles.confirmcontainer}
          >
            <Text style={{ color: "white" }}>ยืนยัน</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.container}>
        <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>

        <View
          style={
            {
              // backgroundColor: "red",
              // flexDirection: "row",
              // paddingHorizontal: 5,
            }
          }
        >
          {/* เริ่มต้น สินค้า */}
          <View
            style={{
              borderTopColor: "#d1d1d1",
              borderTopWidth: 1,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "100%", backgroundColor: "white" }}>
              <View
                style={{
                  //   backgroundColor: "green",
                  flexDirection: "row",
                  //   borderLeftWidth: 1,
                  //   borderLeftColor: "#d1d1d1",
                  //   borderRightWidth: 1,
                  //   borderRightColor: "#d1d1d1",
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
                    source={{
                      uri:
                        "https://sricharoen-narathiwat.ml/img_product/" +
                        route.params.img,
                    }}
                    style={{
                      height: 75,
                      width: Platform.OS === "ios" ? 75 : 60,
                      alignSelf: "center",
                    }}
                  />
                </View>
                <View
                  style={{
                    // backgroundColor: "pink",
                    width: "75%",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>{route.params.name}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* สิ้นสุด สินค้า */}
          <View
            style={{
              borderTopColor: "#d1d1d1",
              borderTopWidth: 1,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                elevation: 2,
                shadowColor: "#000",
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
                  //   backgroundColor: "green",
                  flexDirection: "row",
                  //   borderLeftWidth: 1,
                  //   borderLeftColor: "#d1d1d1",
                  //   borderRightWidth: 1,
                  //   borderRightColor: "#d1d1d1",
                }}
              >
                <View
                  style={{
                    // backgroundColor: "pink",
                    width: "100%",
                    // paddingHorizontal: 5,
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Icon
                      name={
                        rating == 1
                          ? "star"
                          : rating == 2
                          ? "star"
                          : rating == 3
                          ? "star"
                          : rating == 4
                          ? "star"
                          : rating == 5
                          ? "star"
                          : "star-outline"
                      }
                      type="material-community"
                      onPress={() => ratings(1)}
                      color="#f37721"
                      size={40}
                    />
                    <Icon
                      name={
                        rating == 2
                          ? "star"
                          : rating == 3
                          ? "star"
                          : rating == 4
                          ? "star"
                          : rating == 5
                          ? "star"
                          : "star-outline"
                      }
                      type="material-community"
                      color="#f37721"
                      size={40}
                      onPress={() => ratings(2)}
                    />
                    <Icon
                      name={
                        rating == 3
                          ? "star"
                          : rating == 4
                          ? "star"
                          : rating == 5
                          ? "star"
                          : "star-outline"
                      }
                      type="material-community"
                      color="#f37721"
                      size={40}
                      onPress={() => ratings(3)}
                    />
                    <Icon
                      name={
                        rating == 4
                          ? "star"
                          : rating == 5
                          ? "star"
                          : "star-outline"
                      }
                      type="material-community"
                      color="#f37721"
                      size={40}
                      onPress={() => ratings(4)}
                    />
                    <Icon
                      name={rating == 5 ? "star" : "star-outline"}
                      type="material-community"
                      color="#f37721"
                      size={40}
                      onPress={() => ratings(5)}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingTop: 15,
                      paddingBottom: 10,
                      //   backgroundColor: "skyblue",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {image ? (
                      <TouchableOpacity onPress={() => pickImage()}>
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 150,
                            height: 300,
                            resizeMode: "contain",
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => openCamera()}
                        style={{
                          // backgroundColor: "yellow",
                          width: "45%",
                          paddingVertical: 5,
                          borderColor: "#f37721",
                          borderWidth: 1,
                        }}
                      >
                        <Icon
                          name="camera"
                          type="material-community"
                          color="#f37721"
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            color: "#f37721",
                          }}
                        >
                          เพิ่มรูปภาพ
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      paddingBottom: 10,
                      //   backgroundColor: "yellow",
                      flexDirection: "row",
                    }}
                  >
                    <TextInput
                      onChangeText={(txt) => setDetails(txt)}
                      style={[
                        styles.input,
                        {
                          height: 125,
                          paddingVertical: 10,
                          textAlignVertical: "top",
                          fontSize: 12,
                          borderColor: "#d1d1d1",
                          borderWidth: 1,
                        },
                      ]}
                      multiline={true}
                      placeholder={
                        "รีวิวของคุณสามารถช่ยให้คนอื่นๆตัดสินใจซื้อสินค้านี้ได้ดีขึ้น มารีวิวเกี่ยวกับสินค้านี้ได้ที่นี่!"
                      }
                    />
                  </View>
                  <View
                    style={{
                      borderTopColor: "#d1d1d1",
                      borderTopWidth: 1,
                      //   flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "100%", backgroundColor: "white" }}>
                      <View
                        style={{
                          //   backgroundColor: "green",
                          flexDirection: "row",
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            // backgroundColor: "pink",
                            width: "75%",
                            paddingHorizontal: 5,
                            paddingTop: 10,
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 12, paddingBottom: 2.5 }}>
                            รีวิวโดยไม่เปิดเผยชื่อ
                          </Text>
                          <Text style={{ fontSize: 10, paddingTop: 2.5 }}>
                            ชื่อที่จะแสดง:{" "}
                            {switchVal
                              ? user.name.substr(0, 1) +
                                "*****" +
                                user.name.substr(-1)
                              : user.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            // backgroundColor: "yellow",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "25%",
                            // paddingHorizontal: 5,
                            // paddingVertical: 5,
                            paddingTop: 10,
                          }}
                        >
                          <Switch
                            trackColor={{ false: "#767577", true: "#f37721" }}
                            thumbColor={switchVal ? "#fff" : "#f4f3f4"}
                            onValueChange={() =>
                              setSwitchVal((prevVal) => !prevVal)
                            }
                            value={switchVal}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  confirmcontainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 10,
    // height: 30,
  },
  input: {
    width: "100%",
    height: 44,
    backgroundColor: "#f1f3f6",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});
