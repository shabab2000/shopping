import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  LogBox,
  RefreshControl,
  FlatList,
} from "react-native";
import { Icon, Header, Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Shipped({ navigation }) {
  const [order, setOrder] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const Orders = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/shipped.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setOrder(json))
      .catch((error) => console.error(error));
  };
  // const Orderp = async() => {

  //     fetch("https://sricharoen-narathiwat.ml/listorder.php?uid="+uid)
  //       .then((response) => response.json())
  //       .then((json) => setOrder(json))
  //       .catch((error) => console.error(error));
  //   };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Orders();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    Orders();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        data={order}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Details_order", {
                  id: item.id,
                  no_id: item.no_id,
                  item: item.item,
                  total: item.totals,
                  payment: item.payment,
                  payment_date: item.payment_date,
                  date: item.date,
                  ship: item.ship,
                  status_delivery: item.status_delivery,
                });
              }}
            >
              <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
              <View style={styles.waitforpay}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.textStyle,
                      { paddingLeft: 5, paddingTop: 5 },
                    ]}
                  >
                    เลขที่ใบสั่งซื้อ #{item.no_id} วันที่ {item.date}
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: "right",
                          paddingRight: 10,
                          paddingTop: 5,
                          color: "#f37721",
                        },
                      ]}
                    >
                      สถานะ :{" "}
                      <Text style={{ color: "#f37721" }}>{item.status}</Text>
                    </Text>
                  </View>
                </View>

                {/* <View style={styles.orderListButton}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                // backgroundColor: "blue",
                // width: 100,
              }}
            >
              <Image
                style={styles.tinyLogo}
                source={require("../src/assets/paint.png")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "red",
                width: 120,
              }}
            >
              <Text style={styles.orderListNameText}>
                Pumpkin Pro แปรงลูกกลิ้งทาสี ปิกัสโซ่ ขนาด 10 นิ้ว
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "blue",
              }}
            >
              <Text style={styles.orderListItemText}>จำนวน 9999</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // alignContent: "center",
                // alignSelf: "center",
                // backgroundColor: "red",

                width: 75,
              }}
            >
              <Text style={styles.orderListDiscountText}>
                4500฿ <Text style={styles.orderListPriceText}>5000฿</Text>
              </Text>
            </View>
          </View> */}
                <View style={styles.hr}></View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      { paddingLeft: 5, paddingTop: 8 },
                    ]}
                  >
                    ช่องทางการชำระเงิน
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.textStyle,
                        { textAlign: "right", paddingRight: 10, paddingTop: 8 },
                      ]}
                    >
                      <Text style={{ color: "#f37721" }}>{item.payment}</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      { paddingLeft: 5, paddingTop: 8 },
                    ]}
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
                      <Text style={{ color: "#f37721" }}>฿{item.totalp}</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      { paddingLeft: 5, paddingTop: 8 },
                    ]}
                  >
                    ส่วนลด
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.textStyle,
                        { textAlign: "right", paddingRight: 10, paddingTop: 8 },
                      ]}
                    >
                      <Text style={{ color: "#f37721" }}>฿{item.discount}</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      { paddingLeft: 5, paddingTop: 8 },
                    ]}
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
                      <Text style={{ color: "#f37721" }}>฿{item.ship}</Text>
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", height: 30 }}>
                  <Text
                    style={[
                      styles.textStyle,
                      { paddingLeft: 5, paddingTop: 8 },
                    ]}
                  >
                    จำนวนสินค้าทั้งหมด {item.item} ชิ้น
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.textStyle,
                        { textAlign: "right", paddingRight: 10, paddingTop: 8 },
                      ]}
                    >
                      รวมราคาทั้งหมด{" "}
                      <Text style={{ color: "#f37721" }}>฿{item.totals}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.hr}></View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 30,
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.textStyle, { paddingLeft: 5 }]}>
                    {item.delivery == "จัดส่ง"
                      ? item.slip == null
                        ? "ลูกค้าสามารถชำระเงินภายใน 30 นาที"
                        : "จัดส่งสินค้าภายใน 1-2 วัน"
                      : item.delivery == "จัดส่งสาธารณะ"
                      ? "จัดส่งสินค้าภายใน 3-7 วัน"
                      : "ลูกค้าสามารถมารับสินค้าภายใน 30 นาที"}
                  </Text>
                  <View>
                    <View
                      style={styles.ImgpaymentSlipButton}
                      onPress={() => {
                        //   navigation.navigate("ImgpaymentSlip");
                      }}
                    >
                      <Text style={styles.ImgpaymentSlipButtonText}>
                        {item.slip != null ? "ชำระเงินสำเร็จ" : "รอชำระเงิน"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingBottom: "100%",
    backgroundColor: "#e4e4e4",
  },
  waitforpay: {
    backgroundColor: "white",
    // width: "100%",
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
    //height: "30%",
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
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    // marginTop: 6,
  },
  ImgpaymentSlipButtonText: {
    // marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  ImgpaymentSlipButton: {
    // top: 10,
    right: -46,
    display: "flex",
    flexDirection: "row",
    width: "65%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
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
});
