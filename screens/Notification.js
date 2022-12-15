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

export default function Notification({ navigation }) {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const Noti = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log(uid);
    fetch("https://sricharoen-narathiwat.ml/notification.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  const Notis = async () => {
    let uid = await AsyncStorage.getItem("uid");
    console.log(uid);
    fetch("https://sricharoen-narathiwat.ml/notiread.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Noti();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    Noti();
    Notis();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
      }
    });
    return unsubscribe;
  }, []);
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
          <View style={styles.inputView}>
            {/* <View style={styles.inputView}> */}

            <Text style={{ fontSize: 16, color: "#ffffff" }}>การแจ้งเตือน</Text>
            {/* </View> */}
          </View>
        }
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
          <View
            style={{
              // backgroundColor: "red",
              // paddingHorizontal: 10,
              justifyContent: "center",
              marginHorizontal: 15,
              width: Platform.OS === "ios" ? "20%" : "25%",
            }}
          >
            <Text style={{ alignSelf: "center", color: "#000000" }}>
              การแจ้งเตือน
            </Text>
            <View style={styles.hr}></View>
          </View>
          {/* <View style={{paddingTop: 2.5 , paddingBottom: 2.5}}></View> */}
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
          {/* <View style={styles.AlertListButton}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.msgHeadText}>
                ดำเนินการสั่งซื้อสำเร็จ
              </Text>

              <Text style={styles.msgTitleText}>
                เลขที่คำสั่งซื้อ: SN-00000000000001
              </Text>
              <Text style={styles.msgText}>สั่งซื้อสำเร็จ</Text>
              
            </View>
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 3, left: 15, }}>
            <View style={{justifyContent: 'center', alignItems: "center"}}>
            <Icon
                name="clock-time-five-outline"
                type="material-community"
                size={12}
            />
            </View>
            <Text style={styles.msgTimeText}>
  
              {" "}14/02/2022 01:59</Text>
              </View>
            {/* <View style={styles.itemboxButton}>
             
            <Text
                style={{
                  // left: 25,
                  fontSize: 10,
                  // fontWeight: "bold",
                  color: "#000000",
                }}
              >
                อ่านแล้ว
              </Text>
              
            </View> *
          </View> */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 5 }}>
                {/* <View style={{ paddingTop: 0, paddingBottom: 0 }}></View> */}
                <View style={styles.AlertListButton}>
                  <View
                    style={{ alignItems: "center", flexDirection: "row" }}
                  ></View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.msgHeadText}>{item.title}</Text>

                    <Text style={styles.msgTitleText}>{item.subtitle}</Text>
                    <Text style={styles.msgText}>{item.status}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      bottom: 3,
                      left: 15,
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Icon
                        name="clock-time-five-outline"
                        type="material-community"
                        size={12}
                      />
                    </View>
                    <Text style={styles.msgTimeText}> {item.date}</Text>
                  </View>
                  {/* <View style={styles.itemboxButton}>
             
            <Text
                style={{
                  // left: 25,
                  fontSize: 10,
                  // fontWeight: "bold",
                  color: "#000000",
                }}
              >
                อ่านแล้ว
              </Text>
              
            </View> */}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
    backgroundColor: "#e4e4e4",
  },
  container: {
    flex: 1,
    // paddingBottom: 5,
    // backgroundColor: "blue",
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
    padding: 5,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    marginLeft: 15,
  },
  msgHeadText: {
    position: "absolute",
    top: 0,
    marginHorizontal: 0,
    width: "175%",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  AlertListButton: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    height: 100,
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#f37721",

    // top: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  msgTitleText: {
    top: 22,
    marginHorizontal: 0,
    fontSize: 10,
    fontWeight: "bold",
    color: "#f37721",
  },
  msgText: {
    top: 25,
    fontSize: 10,
    fontWeight: "normal",
    color: "#000000",
    // textDecorationLine: "line-through",
  },
  msgTimeText: {
    // top: 40,
    fontSize: 10,
    fontWeight: "normal",
    color: "#000000",
    // textDecorationLine: "line-through",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  itemboxButton: {
    position: "absolute",
    right: 0,
    top: 70,
    display: "flex",
    // flexDirection: "row",
    // width: "30%",
    // height: 30,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f37721",
    // paddingLeft: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
    // borderRadius: 4,
    // borderTopLeftRadius: 50,
    // elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
  inputView: {
    width: "115%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  hr: {
    // width: "30%",
    height: 2,
    backgroundColor: "#f37721",
    marginTop: 6,
    // marginLeft: 15,
  },
});
