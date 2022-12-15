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
  RefreshControl,
} from "react-native";
import { Icon, Avatar, ListItem, Divider, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const Profile = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/profile.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setProfile(json))
      .catch((error) => console.error(error));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Profile();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    Profile();
    onRefresh();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "android") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("สำเร็จ", "ออกจากระบบแล้ว");
      navigation.replace("Login");
    } catch (e) {
      Alert.alert("Failed to clear the async storage." + e);
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
        centerComponent={
          <TouchableOpacity style={styles.inputView}>
            <Text style={{ fontSize: 16, color: "#ffffff" }}>โปรไฟล์</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View
            style={{ backgroundColor: "#f37721", width: "100%", height: 220 }}
          >
            <View
              style={{
                paddingTop: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {profile.img ? (
                <Image
                  source={{
                    uri: "https://sricharoen-narathiwat.ml/" + profile.img,
                  }}
                  style={{ width: 75, height: 75, borderRadius: 75 }}
                />
              ) : (
                <Icon
                  name="user-circle"
                  type="font-awesome"
                  size={75}
                  color="#fff"
                />
              )}
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 15,
              }}
            >
              <View style={styles.nameButton}>
                <Text style={styles.nameButtonText}>{profile.name}</Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // bottom: 5,
                paddingVertical: 20,
              }}
            >
              <View style={styles.logisticButton}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        paddingLeft: 5,
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#f37721",
                      },
                    ]}
                  >
                    คำสั่งซื้อ
                  </Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("OrderList");
                    }}
                  >
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: "right",
                          paddingRight: 5,
                          paddingTop: 8,
                          fontSize: 8,
                          top: 2,
                        },
                      ]}
                    >
                      ดูทั้งหมด
                    </Text>
                  </TouchableOpacity> */}
                </View>
                {/* รอชำระเงิน ชำระเงินแล้ว จัดส่งแล้ว Start */}

                <View style={styles.logisticContainer}>
                  <TouchableOpacity
                    style={styles.logisticBtn}
                    onPress={() => navigation.navigate("OrderList1")}
                  >
                    <View style={styles.logisticIcon}>
                      <Icon
                        name="credit-card-clock-outline"
                        type="material-community"
                        color="#707070"
                        size={30}
                      />
                      <Text style={styles.logisticBtnTxt}>รอชำระเงิน</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logisticBtn}
                    onPress={() => navigation.navigate("OrderList2")}
                  >
                    <View style={styles.logisticIcon}>
                      <Icon
                        name="credit-card-check-outline"
                        type="material-community"
                        color="#707070"
                        size={30}
                      />
                      <Text style={styles.logisticBtnTxt}>ชำระเงินแล้ว</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logisticBtn}
                    onPress={() => navigation.navigate("OrderList3")}
                  >
                    <View style={styles.logisticIcon}>
                      <Icon
                        name="truck-fast-outline"
                        type="material-community"
                        color="#707070"
                        size={30}
                      />
                      <Text style={styles.logisticBtnTxt}>จัดส่งแล้ว</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logisticBtn}
                    onPress={() => navigation.navigate("OrderList")}
                  >
                    <View style={styles.logisticIcon}>
                      <Icon
                        name="clipboard-text-outline"
                        type="material-community"
                        color="#707070"
                        size={30}
                      />
                      <Text style={styles.logisticBtnTxt}>
                        ประวัติการสั่งซื้อ
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* รอชำระเงิน ชำระเงินแล้ว จัดส่งแล้ว End */}
              </View>
            </View>
          </View>

          <Text></Text>
          <View style={{ paddingTop: Platform.OS === "ios" ? 70 : 65 }}>
            <View>
              <ListItem
                bottomDivider
                onPress={() => navigation.push("EditProfile")}
              >
                <Icon
                  name="account-circle"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    ข้อมูลส่วนตัว
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>

              <ListItem
                bottomDivider
                onPress={() => navigation.push("Feedback")}
              >
                <Icon
                  name="message-alert"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    ติชมบริการ
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>

              <ListItem
                bottomDivider
                onPress={() => navigation.push("Methodofpayment")}
              >
                <Icon
                  name="cash-multiple"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    วิธีการชำระเงิน
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>

              <ListItem
                bottomDivider
                onPress={() => navigation.push("Deliveryterms")}
              >
                <Icon
                  name="truck-fast-outline"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    เงื่อนไขการจัดส่งสินค้า
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>

              <ListItem bottomDivider onPress={() => navigation.push("FAQ")}>
                <Icon
                  name="frequently-asked-questions"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    คำถามที่พบบ่อย
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>

              <ListItem
                bottomDivider
                onPress={() => navigation.push("ContactUs")}
              >
                <Icon
                  name="phone"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    ติดต่อเรา
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </View>
          </View>
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Icon
                name="power-off"
                type="font-awesome"
                size={20}
                color="#fff"
              />
              <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ alignItems: "center", paddingTop: 15, paddingBottom: 15 }}
          >
            <Text style={{ color: "#f37721" }}>version: 1.0.0</Text>
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
  inputView: {
    width: "115%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // paddingBottom: 90,
  },
  textStyle: {
    fontSize: 12,
    color: "black",
    flex: 1,
  },
  logoutButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  logoutButton: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7170b",
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
  nameButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
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

  logisticButton: {
    display: "flex",
    width: "90%",
    // height: "80%",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
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

  logisticContainer: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
    // backgroundColor: "red",
  },
  logisticBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  logisticIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: Platform.OS === "ios" ? 70 : 65,
    height: Platform.OS === "ios" ? 70 : 65,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },

  logisticBtnTxt: {
    alignSelf: "center",
    top: 5,
    fontSize: Platform.OS === "ios" ? 9 : 6.5,
    color: "#707070",
  },
  logisticLogo: {
    width: "55%",
    height: "55%",
  },
});
