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
  RefreshControl,
  FlatList,
  ToastAndroid,
  Platform,
} from "react-native";
import {
  Icon,
  Avatar,
  ListItem,
  Divider,
  Header,
  CheckBox,
} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-easy-toast";

export default function Address({ navigation }) {
  const [address, setAddress] = useState(false);
  const [addressCheck, setAddressCheck] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [aid, setAid] = useState("");
  const toastRef = React.useRef();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAid();
    ListAddress();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const GetAid = async () => {
    let aid = await AsyncStorage.getItem("aid");
    setAid(aid);
  };
  const ListAddress = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/listaddress.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setAddress(json))
      .catch((error) => console.error(error));
  };
  const IdAddress = async (id) => {
    //let uid = await AsyncStorage.getItem("aid");
    setAddressCheck(id);
    AsyncStorage.setItem("aid", id);
    navigation.goBack();
  };

  useEffect(() => {
    GetAid();
    ListAddress();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.containerstatus}>
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
          text: "ที่อยู่ในการจัดส่ง",
          style: { color: "#fff" },
        }}
      />
      {/* <View
        style={{
          backgroundColor: "#f37721",
          width: "100%",
          height: "7%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>การแจ้งเตือน</Text>
      </View> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.space}></View>

          <View>
            <FlatList
              data={address}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ListItem
                  style={{ paddingTop: 2.5, paddingBottom: 2.5 }}
                  //   bottomDivider
                  // onPress={() => navigation.push("Address")}
                >
                  {/* <Icon
                name="map-marker-radius-outline"
                type="material-community"
                size={20}
                marginHorizontal={3}
              /> */}
                  <CheckBox
                    containerStyle={{ right: 8 }}
                    checkedIcon="check-circle"
                    uncheckedIcon="circle-o"
                    checked={
                      aid == item.id
                        ? true
                        : addressCheck == item.id
                        ? true
                        : false
                    }
                    checkedColor="#f37721"
                    uncheckedColor="#f37721"
                    onPress={() => IdAddress(item.id)}
                  />

                  <ListItem.Content style={{ right: 20 }}>
                    {/* <ListItem.Title
                  style={{
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  ที่อยู่ในการจัดส่ง
                </ListItem.Title> */}
                    <ListItem.Title style={{ fontSize: 12, width: "100%" }}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Title style={{ fontSize: 12, width: "90%" }}>
                      {item.houseno} หมู่ {item.villageno} ซ.{item.lane}{" "}
                      หมู่บ้าน/อาคาร {item.villageorbuilding} ถ.{item.road} ต.
                      {item.subdistrict}
                      อ.{item.district} จ.{item.province} {item.zipcode}
                    </ListItem.Title>
                    <View style={{ flexDirection: "row",paddingTop:10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("EditAddress", { id: item.id })
                        }
                        style={{
                          fontSize: 12,
                          //paddingRight: 10,
                          // width: "100%",
                          borderRadius:5,
                          backgroundColor:'green',
                          textDecorationLine: "underline",
                        }}
                      >
                       <Text style={{color:'#fff',textAlign:'center',paddingTop:3,paddingBottom:3,paddingLeft:7,paddingRight:7}}>แก้ไข</Text>
                      </TouchableOpacity>
                      <View style={{padding:7}}/>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(`ยืนยันลบที่อยู่นี้ ${item.name}?`, "", [
                            { text: "ยกเลิก" },
                            {
                              text: "ใช่",
                              onPress: () => {
                                fetch(
                                  "https://sricharoen-narathiwat.ml/deladdress.php",
                                  {
                                    method: "POST",
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      id: item.id,
                                    }),
                                  }
                                )
                                  .then((response) => response.json())
                                  .then((responseJson) => {
                                    if (responseJson === "ลบที่อยู่สำเร็จ") {
                                      // Showing response message coming from server after inserting records.
                                      {
                                        Platform.OS === "ios"
                                          ? toastRef.current.show(
                                              responseJson,
                                              3000
                                            )
                                          : ToastAndroid.show(responseJson, 50);
                                      }
                                      onRefresh();
                                    } else {
                                      Alert.alert("แจ้งเตือน!", responseJson);
                                    }
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              },
                            },
                          ]);
                        }}
                        style={{
                          fontSize: 12,
                          // width: "100%",
                          borderRadius:5,
                          backgroundColor:'red',
                          textDecorationLine: "underline",
                        }}
                      >
                        <Text style={{color:'#fff',textAlign:'center',paddingTop:3,paddingBottom:3,paddingLeft:7,paddingRight:7}}>ลบ</Text>
                      </TouchableOpacity>
                    </View>
                  </ListItem.Content>
                  {/* <ListItem.Chevron /> */}
                </ListItem>
              )}
            />
            <View style={{ paddingTop: 2.5 }}></View>

            <ListItem
              bottomDivider
              onPress={() => navigation.push("AddAddress")}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{ fontSize: 12, left: 30, color: "grey" }}
                >
                  เพิ่มที่อยู่ใหม่
                </ListItem.Title>
              </ListItem.Content>
              <Icon
                name="plus"
                type="material-community"
                size={20}
                color="grey"
              />
            </ListItem>
          </View>
        </View>
      </ScrollView>
      {/* <View style={{ alignItems: "center", paddingTop: 5, bottom: 5 }}>
        <TouchableOpacity style={styles.confirmButton} disabled={true}>
          <Text style={styles.confirmButtonText}>ยืนยัน</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 45,
  },
  goBackcontainer: {
    position: "absolute",
    left: 15,
  },
  goBackimage: {
    width: 30,
    height: 30,
  },
  space: {
    paddingTop: 2.5,
    // paddingBottom: 2.5,
  },
  confirmButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  confirmButton: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC87F",
    // backgroundColor: "#f37721",
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
