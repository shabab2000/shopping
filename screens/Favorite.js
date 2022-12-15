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
import { Icon, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-easy-toast";

export default function Favorite({ navigation }) {
  const [sumc, setSumc] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProduct] = useState("");
  const toastRef = React.useRef();

  const SumCarts = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/sumcart.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setSumc(json))
      .catch((error) => console.error(error));
  };
  const Products = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/favorite1.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setProduct(json))
      .catch((error) => console.error(error));
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SumCarts();
    Products();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    SumCarts();
    Products();
    onRefresh();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
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
            onPress={() => {
              navigation.replace("Index");
            }}
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
          <TouchableOpacity style={styles.inputView}>
            {/* <View style={styles.inputView}> */}

            <Text style={{ fontSize: 16, color: "#ffffff" }}>รายการโปรด</Text>
            {/* </View> */}
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Cart");
            }}
            style={styles.Cartcontainer}
          >
            <Icon
              style={styles.Cartimage}
              name="cart-outline"
              type="material-community"
              size={30}
              color="#ffffff"
            />
            {sumc.total !== null ? (
              <View style={[styles.iconCountView, { right: -6.5 }]}>
                <Text style={styles.iconCountText}>{sumc.total}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        }
      />
      {products.length < 1 ? (
        <View
          style={{
            justifyContent: "center",
            // height: Platform.OS === "ios" ? 665 : 589,
            paddingVertical: Platform.OS === "ios" ? "74%" : "68.6%",
          }}
        >
          <Icon
            name="package-variant"
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
            ไม่มีรายการสินค้า
          </Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            {/* <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View> */}

            <FlatList
              data={products}
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
                    <View
                      style={{
                        flexDirection: "column",
                        right: 15,
                        width: "60%",
                      }}
                    >
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
                    <View style={styles.trashboxButton}>
                      <TouchableOpacity
                        style={styles.trash}
                        onPress={() => {
                          Alert.alert(`ยืนยันลบสินค้า ${item.name}?`, "", [
                            { text: "ยกเลิก" },
                            {
                              text: "ใช่",
                              onPress: () => {
                                fetch(
                                  "https://sricharoen-narathiwat.ml/fivoritedel.php",
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
                                    if (
                                      responseJson ===
                                      "ลบออกจากรายการโปรดสำเร็จ"
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
                                      Products();
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
                        <Icon
                          name="trash-can-outline"
                          type="material-community"
                          size={20}
                          color="#ffffff"
                          // marginHorizontal={"45%"}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.itemboxButton}>
                      <View
                        style={{
                          position: "absolute",
                          top: 9,
                          right: -28.5,
                          display: "flex",
                          // flexDirection: "row",
                          width: 100,
                          height: 100,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Products", { id: item.pid })
                          }
                        >
                          <Icon
                            name="cart-plus"
                            type="material-community"
                            size={24}
                            color="#ffffff"
                            // marginHorizontal={"45%"}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
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
    // paddingBottom: "162.8%",
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
    top: 5,
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
    width: 95,
    height: 95,
    marginLeft: 10,
    // backgroundColor: "red",
  },
  orderListButtonText: {
    position: "absolute",
    // top: 5,
    marginHorizontal: 10,
    // backgroundColor: "yellow",
    width: 190,
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
    top: 58,
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#f37721",
    // backgroundColor: "pink",
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
    width: "15%",
    height: 30,
    alignItems: "center",
    backgroundColor: "#f37721",
    // paddingLeft: 100,
    paddingVertical: 8,
    paddingHorizontal: 22,
    // borderRadius: 4,
    borderBottomLeftRadius: 50,
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
    top: 3,
    right: Platform.OS === "ios" ? -26 : -33,
    display: "flex",
    // flexDirection: "row",
    width: 100,
    height: 100,
    alignItems: "center",
  },
  itemboxButton: {
    position: "absolute",
    right: 5,
    top: 53,
    display: "flex",
    flexDirection: "row",
    width: "10%",
    height: "50%",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#f37721",
    // paddingLeft: 100,
    paddingVertical: 8,
    paddingHorizontal: 22,
    // borderRadius: 4,
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
  iconCountView: {
    position: "absolute",
    zIndex: 3,
    // right: -2,
    left: 12,
    top: -9,
    // paddingHorizontal: 5,
    // width: 30,
    height: 25,
    borderRadius: 30,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 12 : 10,
  },
  inputView: {
    width: "115%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
