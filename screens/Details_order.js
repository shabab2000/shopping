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
import { Icon, Header, ListItem, CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Details_order({ navigation, route }) {
  const [product, setProduct] = useState("");
  const [order, setOrder] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [dates, setDates] = useState("");

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Order();
    Orders();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const Order = async () => {
    fetch("https://sricharoen-narathiwat.ml/order.php?id=" + route.params.id)
      .then((response) => response.json())
      .then((json) => setOrder(json))
      .catch((error) => console.error(error));
  };

  const Orders = async () => {
    fetch(
      "https://sricharoen-narathiwat.ml/order_details.php?id=" + route.params.id
    )
      .then((response) => response.json())
      .then((json) => setProduct(json))
      .catch((error) => console.log(error));
  };

  const Order_date = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch(
      "https://sricharoen-narathiwat.ml/orderdate.php?id=" + route.params.id
    )
      .then((response) => response.json())
      .then((json) => setDates(json))
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

  useEffect(() => {
    Order();
    Orders();
    Order_date();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        Orders();
      }
      {
        Order();
      }
      {
        Order_date();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.containerstatus}>
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
          text: "รายการคำสั่งซื้อของฉัน",
          style: { color: "#fff" },
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
          <View style={styles.Shipped}>
            <Text style={{ fontSize: 10 }}>
              เลขที่ใบสั่งซื้อ #{order.no_id}
            </Text>
            <Text style={{ fontSize: 10 }}>วันที่สั่งซื้อ {order.date}</Text>

            <View style={styles.package}>
              <Text style={{ fontSize: 10, paddingLeft: 5 }}>แพ็กเกจ 1</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 8, paddingLeft: 5 }}>จัดส่งโดย :</Text>
                <Text style={{ fontSize: 8, paddingLeft: 5, color: "#f37721" }}>
                  {order.delivery == "จัดส่ง"
                    ? "จัดส่งสินค้าปกติ"
                    : order.delivery == "จัดส่งสาธารณะ"
                    ? "จัดส่งสาธารณะ"
                    : "มารับสินค้าเอง"}
                </Text>
                <Text style={{ fontSize: 8, paddingLeft: 5 }}>|</Text>
                <Text style={{ fontSize: 8, paddingLeft: 5 }}>
                  {order.delivery == "จัดส่ง"
                    ? "จัดส่งสินค้าภายใน 1-2 วัน"
                    : order.delivery == "จัดส่งสาธารณะ"
                    ? "จัดส่งสินค้าภายใน 3-7 วัน"
                    : "มารับสินค้าภายใน 30 นาที"}{" "}
                </Text>
              </View>
              {/* <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View> */}
              {order.delivery == "จัดส่งสาธารณะ" ? (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 8, paddingLeft: 5 }}>
                    เลขพัสดุ :
                  </Text>
                  {order.track ? (
                    <Text
                      style={{ fontSize: 8, paddingLeft: 5, color: "#f37721" }}
                    >
                      {order.track}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 8, paddingLeft: 5, color: "red" }}>
                      กรุณารอแอดมินสร้างเลขพัสดุ
                    </Text>
                  )}
                </View>
              ) : null}
              <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
              <View style={styles.statusorder}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ left: Platform.OS === "ios" ? 25 : 27 }}>
                    <Icon
                      reverse
                      name="cash"
                      type="material-community"
                      size={18}
                      color={
                        order.status == "ยกเลิกคำสั่งซื้อ"
                          ? "red"
                          : order.status_delivery == "ยืนยันการชำระเงิน"
                          ? "#3ec36f"
                          : order.status_delivery == "กำลังจัดเตรียมสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "กำลังจัดส่งสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb"
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: Platform.OS === "ios" ? "16%" : "15%",
                      height: 3,
                      // backgroundColor: 'red',
                      backgroundColor:
                        order.status_delivery == "กำลังจัดเตรียมสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "กำลังจัดส่งสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb",
                      left: Platform.OS === "ios" ? 18 : 20,
                    }}
                  ></View>

                  <View style={{ right: Platform.OS === "ios" ? -10 : -11 }}>
                    <Icon
                      reverse
                      name="package-variant"
                      type="material-community"
                      size={18}
                      color={
                        order.status_delivery == "กำลังจัดเตรียมสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "กำลังจัดส่งสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb"
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: "15%",
                      height: 3,
                      // backgroundColor: 'pink',
                      backgroundColor:
                        order.status_delivery == "กำลังจัดส่งสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb",
                      left: Platform.OS === "ios" ? 3 : 4,
                    }}
                  ></View>
                  <View style={{ right: Platform.OS === "ios" ? 8 : 10 }}>
                    <Icon
                      reverse
                      name="truck-fast-outline"
                      type="material-community"
                      size={18}
                      color={
                        order.status_delivery == "กำลังจัดส่งสินค้า"
                          ? "#3ec36f"
                          : order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb"
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: Platform.OS === "ios" ? "16%" : "15%",
                      height: 3,
                      // backgroundColor: 'green',
                      backgroundColor:
                        order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb",
                      left: Platform.OS === "ios" ? -15 : -17,
                    }}
                  ></View>

                  <View style={{ right: Platform.OS === "ios" ? 24 : 26 }}>
                    <Icon
                      reverse
                      name="truck-check-outline"
                      type="material-community"
                      size={18}
                      color={
                        order.status_delivery == "จัดส่งสินค้าสำเร็จ"
                          ? "#3ec36f"
                          : "#bbb"
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.statusorder1}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, alignItems: "center", right: 7 }}>
                    <Text
                      style={{
                        fontSize: 8,
                        color: "black",
                      }}
                    >
                      {order.status_delivery == "รอยืนยันการชำระเงิน"
                        ? "รอยืนยันการชำระเงิน"
                        : order.status == "ยกเลิกคำสั่งซื้อ"
                        ? "ยกเลิกคำสั่งซื้อ"
                        : "ยืนยันการชำระเงิน"}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 8,
                        color: "black",
                      }}
                    >
                      กำลังจัดเตรียมสินค้า
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 8,
                        color: "black",
                      }}
                    >
                      กำลังจัดส่งสินค้า
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center", left: 7 }}>
                    <Text
                      style={{
                        fontSize: 8,
                        color: "black",
                      }}
                    >
                      จัดส่งสินค้าสำเร็จ
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.hr}></View>
            <FlatList
              data={product}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.orderListButton}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
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

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      // backgroundColor: "blue",
                      width: 130,
                    }}
                  >
                    <Text style={styles.orderListNameText}>{item.p_name}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      // backgroundColor: "orange",
                      // width: 60,
                    }}
                  >
                    <Text style={styles.orderListItemText}>
                      จำนวน {item.p_item}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      // width: 50,
                      // backgroundColor: "blue",
                    }}
                  >
                    {item.p_discount == item.p_price ? (
                      <Text style={styles.orderListDiscountText}>
                        {item.p_discount}฿
                      </Text>
                    ) : (
                      <Text style={styles.orderListDiscountText}>
                        {item.p_discount}฿{" "}
                        <Text style={styles.orderListPriceText}>
                          {item.p_price}฿
                        </Text>
                      </Text>
                    )}
                  </View>
                </View>
              )}
            />

            <View style={styles.hr0}></View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[styles.textStyle, { paddingLeft: 5, paddingTop: 8 }]}
              >
                สินค้ารวม
              </Text>
              <View>
                <Text
                  style={[
                    styles.textStyle,
                    { textAlign: "right", paddingRight: 10, paddingTop: 8 },
                  ]}
                >
                  <Text style={{ color: "#f37721" }}>฿{order.totalp}</Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[styles.textStyle, { paddingLeft: 5, paddingTop: 8 }]}
              >
                ค่าจัดส่ง
              </Text>
              <View>
                <Text
                  style={[
                    styles.textStyle,
                    { textAlign: "right", paddingRight: 10, paddingTop: 8 },
                  ]}
                >
                  <Text style={{ color: "#f37721" }}>฿{order.ship}</Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[styles.textStyle, { paddingLeft: 5, paddingTop: 8 }]}
              >
                จำนวนสินค้าทั้งหมด {order.item} ชิ้น
              </Text>
              <View>
                <Text
                  style={[
                    styles.textStyle,
                    { textAlign: "right", paddingRight: 10, paddingTop: 8 },
                  ]}
                >
                  รวมราคาทั้งหมด{" "}
                  <Text style={{ color: "#f37721" }}>฿{order.totals}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.hr}></View>
          </View>
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>

          <View style={styles.Shipped1}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 10,
                  color: "black",
                  flex: 1,
                  paddingLeft: 5,
                  paddingTop: 8,
                }}
              >
                วิธีการชำระเงิน :{" "}
              </Text>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textAlign: "right",
                    paddingRight: 10,
                    paddingTop: 18,
                    color: "black",
                  },
                ]}
              >
                {order.payment_date !== null
                  ? " ชำระเงินวันที่ : " + order.payment_date
                  : null}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 5 }}>
              <Text style={{ fontSize: 8, paddingLeft: 5, fontWeight: "bold" }}>
                {order.payment}
              </Text>
              <Text style={{ fontSize: 8, paddingLeft: 5 }}>
                ({order.payment})
              </Text>
            </View>
            {order.status == "รอชำระเงิน" ? (
              <View style={styles.hr0}></View>
            ) : null}
            {order.status == "รอชำระเงิน" ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    //justifyContent: "flex-start",
                    // backgroundColor: 'red'
                  }}
                >
                  {dates == false ? (
                    <View style={{ padding: 5 }}>
                      <TouchableOpacity
                        style={styles.ImgpaymentSlipButtons}
                        onPress={() => {
                          CancelOrder();
                        }}
                      >
                        <Text style={styles.ImgpaymentSlipButtonText}>
                          ยกเลิกคำสั่งซื้อ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    width: "50%",
                    //justifyContent: "flex-end",
                    // backgroundColor: 'red'
                  }}
                >
                  <View style={{ padding: 5 }}>
                    <TouchableOpacity
                      style={styles.ImgpaymentSlipButton}
                      onPress={() => {
                        navigation.navigate("Ordersuccess", { id: order.id });
                      }}
                    >
                      <Text style={styles.ImgpaymentSlipButtonText}>
                        ชำระเงิน
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
          <View style={styles.Shipped1}>
            {order.status == "ส่งสินค้าแล้ว" ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    //justifyContent: "flex-start",
                    // backgroundColor: 'red'
                  }}
                ></View>
                <View
                  style={{
                    width: "50%",
                    //justifyContent: "flex-end",
                    // backgroundColor: 'red'
                  }}
                >
                  <View style={{ padding: 5 }}>
                    <TouchableOpacity
                      style={styles.ImgpaymentSlipButton}
                      onPress={() => {
                        navigation.navigate("RateAllProduct", { id: order.id });
                      }}
                    >
                      <Text style={styles.ImgpaymentSlipButtonText}>
                        ให้คะแนน
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
        </View>
        {/* <View style={styles.hr}></View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "165%",
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
  Shipped: {
    backgroundColor: "white",
    padding: 5,
  },
  Shipped1: {
    backgroundColor: "white",
    // paddingLeft: 0,
  },
  package: {
    backgroundColor: "white",
    // backgroundColor: "red",
    padding: 5,
    // height: "100%",
  },
  textStyle: {
    fontSize: 8,
    color: "black",
    flex: 1,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    // right: 10,
    marginHorizontal: 10,
  },
  orderListNameText: {
    alignItems: "center",
    marginHorizontal: 10,
    // width: 50,

    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
    color: "#000000",
  },
  orderListItemText: {
    alignItems: "center",
    marginHorizontal: 5,
    // width: 50,

    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
    color: "#000000",
  },
  orderListDiscountText: {
    alignItems: "center",
    marginHorizontal: 5,
    // width: 50,

    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    color: "#f37721",
  },
  orderListPriceText: {
    alignItems: "center",
    marginHorizontal: 12,
    // width: 50,

    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
    color: "#000000",
    textDecorationLine: "line-through",
  },
  orderListButton: {
    // display: "flex",
    flexDirection: "row",
    // width: "100%",
    // height: "20%",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // top: 20,
    // paddingVertical: 8,
    // paddingHorizontal: 20,
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
  statusorder: {
    // display: "flex",
    // flex: 1,
    // justifyContent: "space-around",

    flexDirection: "row",
    // width: "100%",
    // height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // top: 75,
    // paddingVertical: 8,
    // paddingHorizontal: 20,
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
  statusorder1: {
    // display: "flex",
    // flex: 1,
    // justifyContent: "space-around",

    // flexDirection: "row",
    // width: "100%",
    // height: "30%",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // top: 75,
    // paddingVertical: 8,
    // paddingHorizontal: 20,
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

  hr1: {
    width: "25%",
    height: 3,
    backgroundColor: "#3ec36f",
    // marginTop: 6,
    left: 7,
  },
  hr2: {
    width: "25%",
    height: 3,
    backgroundColor: "#3ec36f",
    // marginTop: 6,
    right: 7,
  },
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  hr0: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
  },
  ImgpaymentSlipButtonText: {
    // marginHorizontal: 12,
    textAlign: "center",
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  ImgpaymentSlipButton: {
    // top: 10,
    right: 2.5,
    // display: "flex",
    //flexDirection: "row",
    // width: "50%",
    // height: "70%",
    padding: 2.5,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#f37721",
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },

  ImgpaymentSlipButtons: {
    // top: 10,
    // right: 5,
    // display: "flex",
    //flexDirection: "row",
    // width: "40%",
    // height: "70%",
    padding: 2.5,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "red",
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 1,
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
