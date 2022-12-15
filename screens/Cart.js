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
  RefreshControl,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Header } from "react-native-elements";
import { Checkbox } from "react-native-paper";
import { color } from "react-native-elements/dist/helpers";
import Toast from "react-native-easy-toast";

export default function Cart({ navigation }) {
  const [data, setPcart] = useState("");
  const [sumc, setSumc] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [count, setCount] = React.useState(1);

  const toastRef = React.useRef();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Carts();
    SumCarts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const Carts = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/cart.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setPcart(json))
      .catch((error) => console.error(error));
  };
  const SumCarts = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/sumcart.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setSumc(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Carts();
    SumCarts();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
      }
      {
        Carts();
      }
      {
        SumCarts();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.containerstatusbar}>
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
            onPress={() => navigation.goBack()}
            style={styles.goBackcontainer}
          >
            <Icon
              style={styles.goBackimage}
              name="angle-left"
              type="font-awesome"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={styles.inputView}>
            {/* <View style={styles.inputView}> */}

            <Text style={{ fontSize: 16, color: "#ffffff" }}>ตะกร้าสินค้า</Text>
            {/* </View> */}
          </View>
        }
      />
      {data.length < 1 ? (
        <View style={{ justifyContent: "center", height: 609 }}>
          <Icon
            name="cart"
            type="material-community"
            size={75}
            // color='#ffffff'
            color="#d6d6d6"

            // marginHorizontal={"45%"}
          />
          <Text
            style={{
              alignItems: "center",
              alignSelf: "center",
              top: 20,
              color: "#d6d6d6",
              fontSize: 12,
            }}
          >
            ยังไม่มีสินค้าอยู่ในตะกร้า
          </Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
                  <View style={styles.orderListButton}>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        right: 20,
                      }}
                    >
                      <Image
                        style={styles.tinyLogo}
                        source={{
                          uri:
                            "https://sricharoen-narathiwat.ml/img_product/" +
                            item.img,
                        }}
                      />
                    </View>
                    <View style={{ flexDirection: "column", right: 15 }}>
                      <Text style={styles.orderListButtonText}>
                        {item.name}
                      </Text>

                      {item.discount == item.price ? (
                        <Text style={styles.orderPriceDiscountButtonText}>
                          ฿{item.discount}
                        </Text>
                      ) : (
                        <Text style={styles.orderPriceDiscountButtonText}>
                          ฿{item.discount}{" "}
                          <Text style={styles.orderPriceButtonText}>
                            ฿{item.price}
                          </Text>
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.trashboxButton}
                      onPress={() => {
                        Alert.alert(`ยืนยันลบสินค้า ${item.name}?`, "", [
                          { text: "ยกเลิก" },
                          {
                            text: "ใช่",
                            onPress: () => {
                              fetch(
                                "https://sricharoen-narathiwat.ml/cartdel.php",
                                {
                                  method: "POST",
                                  headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    cid: item.cid,
                                  }),
                                }
                              )
                                .then((response) => response.json())
                                .then((responseJson) => {
                                  if (
                                    responseJson === "ลบสินค้าในตะกร้าสำเร็จ"
                                  ) {
                                    // Showing response message coming from server after inserting records.
                                    {
                                      Platform.OS === "ios"
                                        ? toastRef.current.show(
                                            responseJson,
                                            3000
                                          )
                                        : ToastAndroid.show(responseJson, 50);
                                    }
                                    Carts();
                                    SumCarts();
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
                    >
                      <View style={styles.trash}>
                        <Icon
                          name="trash-can-outline"
                          type="material-community"
                          size={20}
                          color="#ffffff"
                          // marginHorizontal={"45%"}
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={styles.itemboxButton}>
                      {item.items > 1 ? (
                        <TouchableOpacity
                          style={{
                            bottom: 0,
                            // backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            right: Platform.OS === "ios" ? 10 : 0,
                            width: Platform.OS === "ios" ? "35%" : "30%",
                          }}
                          onPress={() => {
                            fetch(
                              "https://sricharoen-narathiwat.ml/cartminus.php",
                              {
                                method: "POST",
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  cid: item.cid,
                                }),
                              }
                            )
                              .then((response) => response.json())
                              .then((responseJson) => {
                                if (responseJson === "อัปเดทสินค้าสำเร็จ") {
                                  // Showing response message coming from server after inserting records.
                                  {
                                    Platform.OS === "ios"
                                      ? toastRef.current.show(
                                          responseJson,
                                          3000
                                        )
                                      : ToastAndroid.show(responseJson, 50);
                                  }
                                  Carts();
                                  SumCarts();
                                } else {
                                  Alert.alert("แจ้งเตือน!", responseJson);
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          <Text
                            style={{
                              fontSize: Platform.OS === "ios" ? 16 : 14,
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {" "}
                            -{" "}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View
                          style={{
                            bottom: 0,
                            // backgroundColor: "green",
                            justifyContent: "center",
                            alignItems: "center",
                            right: Platform.OS === "ios" ? 10 : 0,
                            width: Platform.OS === "ios" ? "35%" : "30%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: Platform.OS === "ios" ? 16 : 14,
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {" "}
                            -{" "}
                          </Text>
                        </View>
                      )}
                      <View
                        style={{
                          position: "absolute",
                          left: Platform.OS === "ios" ? 42 : 45,
                          bottom: Platform.OS === "ios" ? 5.25 : 4,
                          width: Platform.OS === "ios" ? "90%" : "70%",
                          justifyContent: "center",
                          alignItems: "center",
                          // backgroundColor: "pink",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: Platform.OS === "ios" ? 16 : 14,
                            fontWeight: "bold",
                            color: "#ffffff",
                            textAlign: "center",
                          }}
                        >
                          {item.items}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          bottom: Platform.OS === "ios" ? 0 : 0,
                          left: Platform.OS === "ios" ? 33 : 46.5,
                          // backgroundColor: "skyblue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: Platform.OS === "ios" ? "35%" : "30%",
                        }}
                        onPress={() => {
                          fetch(
                            "https://sricharoen-narathiwat.ml/cartplus.php",
                            {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                cid: item.cid,
                              }),
                            }
                          )
                            .then((response) => response.json())
                            .then((responseJson) => {
                              if (responseJson === "อัปเดทสินค้าสำเร็จ") {
                                // Showing response message coming from server after inserting records.
                                {
                                  Platform.OS === "ios"
                                    ? toastRef.current.show(responseJson, 3000)
                                    : ToastAndroid.show(responseJson, 50);
                                }
                                Carts();
                                SumCarts();
                              } else {
                                Alert.alert("แจ้งเตือน!", responseJson);
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: Platform.OS === "ios" ? 16 : 14,
                            fontWeight: "bold",
                            color: "#ffffff",
                          }}
                        >
                          {" "}
                          +{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
      {data.length < 1 ? null : (
        <View style={styles.AddtoCartButton}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ fontSize: 14, right: 5 }}>
              ทั้งหมด ({sumc.total})
            </Text>
            <Text
              style={{
                right: 5,
                paddingLeft: 5,
                top: Platform.OS === "ios" ? 2 : 0,
                color: "#f37721",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              ฿{sumc.sums}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#f37721",
              alignItems: "center",
              justifyContent: "center", //ฟอนต์ เพิ่มตะกร้าสินค้า
              top: Platform.OS === "ios" ? 41.25 : "0%",
              height: Platform.OS === "ios" ? "400%" : "208%",
              width: "210%",
              left: 15,
              // borderRadius: 10,
              borderTopLeftRadius: Platform.OS === "ios" ? 75 : 50,
            }}
            onPress={() =>
              navigation.replace("Makeorder", { total: sumc.sums })
            }
          >
            <Text
              style={{
                fontSize: Platform.OS === "ios" ? 24 : 16,
                color: "#fff",
                bottom: Platform.OS === "ios" ? 40 : 0,
                left: 10,
                fontWeight: "bold",
              }}
            >
              สั่งสินค้า
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatusbar: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4",
  },
  goBackcontainer: {
    width: 30,
    height: 30,
    left: 7.5,
    top: 5,
  },
  goBackimage: {
    width: 30,
    height: 30,
  },
  Cartcontainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 10,
  },
  Cartimage: {
    width: 30,
    height: 30,
  },
  listAllButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  listAllButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 40,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // top: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    // borderRadius: 4,
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
    paddingVertical: 5,
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  orderPriceDiscountButtonText: {
    top: 65,
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#f37721",
  },
  orderPriceButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    textDecorationLine: "line-through",
  },
  trashboxButton: {
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex",
    // flexDirection: "row",
    width: "10%",
    height: 30,
    alignItems: "center",
    backgroundColor: "#f37721",
    // paddingLeft: 100,
    paddingVertical: 8,
    paddingHorizontal: 22,
    // borderRadius: 4,
    borderBottomLeftRadius: 20,
    // borderTopLeftRadius: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  trash: {
    position: "absolute",
    // backgroundColor: "red",
    top: 5,
    left: Platform.OS === "ios" ? 13 : 15,
    // justifyContent: "center",
    display: "flex",
    // flexDirection: "row",
    // width: 50,
    // height: 50,
    alignItems: "center",
  },
  itemboxButton: {
    position: "absolute",
    // backgroundColor: "red",
    // flex: 1,
    right: 0,
    top: 70,
    display: "flex",
    flexDirection: "row",
    width: Platform.OS === "ios" ? "32%" : "36%",
    height: Platform.OS === "ios" ? 30 : 30,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#f37721",
    // paddingLeft: 100,
    paddingVertical: 0,
    paddingHorizontal: Platform.OS === "ios" ? 35 : 25,
    // borderRadius: 4,
    borderTopLeftRadius: Platform.OS === "ios" ? 50 : 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  AddtoCartButton: {
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    // bottom: 5,
    width: "100%",
    height: "8%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
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
  inputView: {
    width: "115%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
