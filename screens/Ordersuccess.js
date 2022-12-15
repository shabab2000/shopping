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
  ToastAndroid,
  Clipboard,
  Platform,
} from "react-native";
//import * as Clipboard from 'expo-clipboard';
import { Icon, Avatar, ListItem, Divider, Header } from "react-native-elements";
//import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-easy-toast";

export default function Ordersuccess({ navigation, route }) {
  const toastRef = React.useRef();

  const copy1 = () => {
    Clipboard.setString("468-0-66437-5");
    {
      Platform.OS === "ios"
        ? toastRef.current.show("คัดลอกเรียบร้อย", 3000)
        : ToastAndroid.show("คัดลอกเรียบร้อย", 100);
    }
  };
  const copy2 = () => {
    Clipboard.setString("468-0-66437-6");
    {
      Platform.OS === "ios"
        ? toastRef.current.show("คัดลอกเรียบร้อย", 3000)
        : ToastAndroid.show("คัดลอกเรียบร้อย", 100);
    }
  };
  const copy3 = () => {
    Clipboard.setString("468-0-66437-7");
    {
      Platform.OS === "ios"
        ? toastRef.current.show("คัดลอกเรียบร้อย", 3000)
        : ToastAndroid.show("คัดลอกเรียบร้อย", 100);
    }
  };
  const [order, setOrder] = useState("");
  const [orderp, setOrderp] = useState("");
  const [dates, setDates] = useState("");

  const Order_date = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch(
      "https://sricharoen-narathiwat.ml/orderdate.php?id=" + route.params.id
    )
      .then((response) => response.json())
      .then((json) => setDates(json))
      .catch((error) => console.error(error));
  };
  const Orders = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/myorder.php?id=" + route.params.id)
      .then((response) => response.json())
      .then((json) => setOrder(json))
      .catch((error) => console.error(error));
  };

  const CancelOrder = async () => {
    let uid = await AsyncStorage.getItem("uid");
    Alert.alert(`ยืนยันยกเลิกคำสั่งซื้อ`, "", [
      { text: "ยกเลิก" },
      {
        text: "ตกลง",
        onPress: () => {
          fetch("https://sricharoen-narathiwat.ml/cancelorder.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: route.params.id,
              no_id: order.no_id,
              uid: uid,
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson === "ยกเลิกคำสั่งซื้อสำเร็จ") {
                Alert.alert("แจ้งเตือน!", responseJson);
                navigation.goBack();
                //navigation.replace('Ordersuccess',{id:responseJson.id});
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
        },
      },
    ]);
  };
  const Ordersp = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch(
      "https://sricharoen-narathiwat.ml/myorderproduct.php?id=" +
        route.params.id
    )
      .then((response) => response.json())
      .then((json) => setOrderp(json))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    Orders();
    Ordersp();
    Order_date();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        Orders();
      }
      {
        Ordersp();
      }
      {
        Order_date();
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
          text: "คำสั่งซื้อสำเร็จ",
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
      <ScrollView>
        <View style={styles.container}>
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>

          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              paddingBottom: 5,
              // height: 140,
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingTop: 10, paddingLeft: 10, fontSize: 14 }}>
                เลขที่ใบสั่งซื้อ
              </Text>
              <Text
                style={{
                  paddingTop: Platform.OS === "ios" ? 12 : 10,
                  paddingLeft: 5,
                  fontSize: 14,
                }}
              >
                #{order.no_id}
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  paddingLeft: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </Text>
            </View>
            <View>
              <Text style={{ paddingTop: 5, paddingLeft: 10, fontSize: 12 }}>
                กรุณาชำระค่าสินค้าและส่งหลักฐานการชำระเงินภายใน 24 ชั่วโมง
                หากท่านไม่ชำระค่าสินค้าภายในเวลาที่กำหนด
                คำสั่งซื้อจะถูกยกเลิกอัตโนมัติ
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 5,
                }}
              >
                <Text
                  style={{
                    paddingTop: 15,
                    paddingLeft: 10,
                    fontSize: 18,
                    color: "#f37721",
                    fontWeight: "bold",
                  }}
                >
                  ยอดชำระ ฿{order.totals}
                </Text>
                {order.status == "รอชำระเงิน" ? (
                  <TouchableOpacity
                    style={styles.paymentSlipButton}
                    onPress={() => {
                      navigation.navigate("AddSlip", {
                        id: order.id,
                        no_id: order.no_id,
                      });
                    }}
                  >
                    <Text style={styles.paymentSlipButtonText}>
                      แนบสลิปชำระเงิน
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.paymentSlipButtons}
                    onPress={() => {
                      navigation.navigate("AddSlip", {
                        id: order.id,
                        no_id: order.no_id,
                      });
                    }}
                  >
                    <Text style={styles.paymentSlipButtonText}>ดูสลิป</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          {/* <View>
                <ListItem bottomDivider>
                  <Icon
                    name="account-circle"
                    type="material-community"
                    size={20}
                    marginHorizontal={3}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 14 }}>
                      โอน / ชำระเงินผ่านบัญชีธนาคาร
                    </ListItem.Title>
                    <ListItem.Title style={{ fontSize: 10 }}>.</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
    
                <ListItem bottomDivider>
                  <Icon
                    name="qrcode-scan"
                    type="material-community"
                    size={20}
                    marginHorizontal={3}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 14 }}>
                      QR Code
                    </ListItem.Title>
                    <ListItem.Title style={{ fontSize: 10 }}>
                      จ่ายง่ายๆ ไม่มีค่าธรรมเนียม ไม่ต้องแจ้งโอนเงิน
                      ทำรายการชำระเงินภายใน 15 นาที
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View> */}

          {/* <TouchableOpacity
            style={styles.listpayment}
            onPress={() => navigation.navigate("Ordersuccess")}
          >
            <View style={{ justifyContent: "center", padding: 20 }}>
              <Icon
                name="bank"
                type="material-community"
                size={40}
                marginHorizontal={3}
              />
            </View>
            <View style={{ flexDirection: "column", top: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                โอน / ชำระเงินผ่านบัญชีธนาคาร
              </Text>
              <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
              <View style={{ flexDirection: "row", height: "100%" }}>
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/kbank.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/scb.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/krungsri.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/bangkok.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/krungthai.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/aomsin.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/ttb.png")}
                />
                <Image
                  style={styles.bankLogo}
                  source={require("../src/assets/PP.png")}
                />
              </View>
            </View>
          </TouchableOpacity> */}

          {/* <View style={styles.hr}></View>

          <View style={styles.listpayment}>
            <View style={{ justifyContent: "center", padding: 20 }}>
              <Icon
                name="qrcode-scan"
                type="material-community"
                size={40}
                marginHorizontal={3}
              />
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>QR Code</Text>
              <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
              <Text style={{ fontSize: 10, width: "60%" }}>
                จ่ายง่ายๆ ไม่มีค่าธรรมเนียม ไม่ต้องแจ้งโอนเงิน
                ทำรายการชำระเงินภายใน 15 นาที
              </Text>
            </View>
          </View> */}
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              // height: "36%",
              paddingBottom: 5,
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
            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                fontSize: Platform.OS === "ios" ? 14 : 12,
                fontWeight: "bold",
              }}
            >
              บัญชีโอนเงิน ชื่อบัญชี บริษัท ศรีเจริญ นราธิวาส จำกัด
            </Text>
            <View style={styles.hr}></View>
            <View
              style={{ flexDirection: "row", alignItems: "center", left: 10 }}
            >
              <Image
                style={styles.bankLogo}
                source={require("../src/assets/kbank.png")}
              />
              <View
                style={{
                  left: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontSize: 12 }}>ธนาคารกสิกรไทย</Text>
                <Text style={{ fontSize: 12 }}>เลขที่บัญชี 468-0-66437-5</Text>
              </View>
              <TouchableOpacity onPress={() => copy1()}>
                <Text
                  style={{
                    fontSize: 12,
                    left: Platform.OS === "ios" ? 110 : 50,
                    textDecorationLine: "underline",
                  }}
                >
                  คัดลอกเลขบัญชี
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.hr}></View>
            <View
              style={{ flexDirection: "row", alignItems: "center", left: 10 }}
            >
              <Image
                style={styles.bankLogo}
                source={require("../src/assets/bangkok.png")}
              />
              <View
                style={{
                  left: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontSize: 12 }}>ธนาคารกรุงเทพ</Text>
                <Text style={{ fontSize: 12 }}>เลขที่บัญชี 468-0-66437-6</Text>
              </View>
              <TouchableOpacity onPress={() => copy2()}>
                <Text
                  style={{
                    fontSize: 12,
                    left: Platform.OS === "ios" ? 110 : 50,
                    textDecorationLine: "underline",
                  }}
                >
                  คัดลอกเลขบัญชี
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}></View>
            <View
              style={{ flexDirection: "row", alignItems: "center", left: 10 }}
            >
              <Image
                style={styles.bankLogo}
                source={require("../src/assets/scb.png")}
              />
              <View
                style={{
                  left: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontSize: 12 }}>ธนาคารไทยพาณิชย์</Text>
                <Text style={{ fontSize: 12 }}>เลขที่บัญชี 468-0-66437-7</Text>
              </View>
              <TouchableOpacity onPress={() => copy3()}>
                <Text
                  style={{
                    fontSize: 12,
                    left: Platform.OS === "ios" ? 110 : 50,
                    textDecorationLine: "underline",
                  }}
                >
                  คัดลอกเลขบัญชี
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.hr}></View>
          </View>

          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>

          <View
            style={{
              backgroundColor: "white",
              width: "100%",
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
              style={
                {
                  // backgroundColor: "white",
                  // width: "100%",
                }
              }
            >
              <Text
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                จัดส่งสินค้าปกติ
              </Text>
              <View style={styles.hrorder}></View>
              {/* <View style={styles.hr}></View> */}

              {/* <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View> */}
            </View>

            <View style={{}}>
              <FlatList
                data={orderp}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.orderListButton}>
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <Image
                        style={styles.tinyLogo}
                        source={{
                          uri:
                            "https://sricharoen-narathiwat.ml/img_product/" +
                            item.p_img,
                        }}
                      />
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.orderListButtonText}>
                        {item.p_name}
                      </Text>
                      {item.p_discount == item.p_price ? (
                        <Text style={styles.orderPriceDiscountButtonText}>
                          ฿{item.p_discount}
                        </Text>
                      ) : (
                        <Text style={styles.orderPriceDiscountButtonText}>
                          ฿{item.p_discount}{" "}
                          <Text style={styles.orderPriceButtonText}>
                            ฿{item.p_price}
                          </Text>
                        </Text>
                      )}
                    </View>
                    <View style={styles.itemboxButton}>
                      <Text
                        style={{
                          // left: 3,
                          fontSize: 12,
                          fontWeight: "bold",
                          left: Platform.OS === "ios" ? 7 : 5,
                          bottom: Platform.OS === "ios" ? 17 : 3,
                          color: "#ffffff",
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>x</Text>
                        {item.p_item}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.orderlist}>
              <View style={styles.hrorder1}></View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 10 }}>
                  รายการสั่งซื้อ ({order.item} รายการ)
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingTop: 15,
                    fontSize: 10,
                    paddingRight: 10,
                  }}
                >
                  ฿{order.totalp}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ paddingLeft: 10, fontSize: 10 }}>ส่วนลด</Text>
                <Text
                  style={{ paddingLeft: 10, fontSize: 10, paddingRight: 10 }}
                >
                  ฿{order.discount}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ paddingLeft: 10, fontSize: 10 }}>ค่าจัดส่ง</Text>
                <Text
                  style={{ paddingLeft: 10, fontSize: 10, paddingRight: 10 }}
                >
                  ฿{order.ship}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingBottom: 5,
                    fontSize: 14,
                    color: "#f37721",
                  }}
                >
                  ยอดสุทธิ
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontSize: 14,
                    color: "#f37721",
                  }}
                >
                  ฿{order.totals}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ paddingTop: 5, paddingBottom: 5 }}></View>

          {order.status == "รอชำระเงิน" ? (
            dates == false ? (
              <View style={{ alignItems: "center", paddingBottom: 10 }}>
                <TouchableOpacity
                  style={styles.cancelorderButton}
                  onPress={() => CancelOrder()}
                >
                  <Text style={styles.cancelorderButtonText}>
                    ยกเลิกคำสั่งซื้อ
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          ) : null}
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
    // paddingBottom: "17%",
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
  textstyle: {
    padding: 10,
    left: 10,
    fontSize: 13,
  },
  hr: {
    width: "95%",
    height: 1.5,
    backgroundColor: "#444",
    alignSelf: "center",
  },
  hrorder: {
    width: "95%",
    height: 1.5,
    backgroundColor: "#444",
    alignSelf: "center",
    top: 0,
  },
  hrorder1: {
    width: "95%",
    height: 1.5,
    backgroundColor: "#444",
    alignSelf: "center",
    top: 10,
  },
  bankLogo: {
    width: Platform.OS === "ios" ? "9%" : "9.7%",
    height: Platform.OS === "ios" ? "67%" : "60.5%",
  },
  listpayment: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "45%",
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#90c6a4",
    backgroundColor: "#ffffff",
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    // borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  paymentSlipButtonText: {
    // marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  paymentSlipButton: {
    top: 17,
    right: 8,
    display: "flex",
    flexDirection: "row",
    width: "32%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f37721",
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  paymentSlipButtons: {
    top: 17,
    right: 8,
    display: "flex",
    flexDirection: "row",
    width: "32%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  orderlist: {
    backgroundColor: "white",
    width: "100%",
    // height: "46%",
    // elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
  cancelorderButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  cancelorderButton: {
    display: "flex",
    flexDirection: "row",
    width: "96%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    //backgroundColor: "#D3D3D3",
    // backgroundColor: "#f37721",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    marginLeft: 15,
  },
  orderListButtonText: {
    position: "absolute",
    // top: 5,
    marginHorizontal: 12,
    // backgroundColor: "blue",
    width: 170,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  orderListButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 100,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // top: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    // borderRadius: 4,
    // elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
  orderPriceDiscountButtonText: {
    top: 62,
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#f37721",
  },
  orderPriceButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    textDecorationLine: "line-through",
  },
  itemboxButton: {
    position: "absolute",
    right: 0,
    top: 70,
    display: "flex",
    flexDirection: "row",
    width: "30%",
    // height: Platform.OS === "ios" ? 65 : 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f37721",
    // paddingLeft: 100,
    paddingVertical: 8,
    paddingHorizontal: Platform.OS === "ios" ? 35 : 25,
    // borderRadius: 4,
    borderTopLeftRadius: Platform.OS === "ios" ? 40 : 40,
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
