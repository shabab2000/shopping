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
  TouchableHighlight,
  TextInput,
  FlatList,
  LogBox,
  RefreshControl,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { Icon, Header, Avatar } from "react-native-elements";

import ViewSlider from "react-native-view-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");

export default function SelectProducts({ navigation, route }) {
  const [products, setProducts] = useState("");
  const numColumns = 2;
  const [sumc, setSumc] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const name = route.params.name;
  const id = route.params.id;
  const toastRef = React.useRef();

  console.log("id :" + id);

  const Products = () => {
    fetch(
      "https://sricharoen-narathiwat.ml/productc.php?id=" + id + "&name=" + name
    )
      .then((response) => response.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error(error));
  };
  const SumCarts = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/sumcart.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setSumc(json))
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

  const AddCart = async (id) => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/addcart.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: id,
        uid: uid,
        item: 1,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "เพิ่มสินค้าในตะกร้าแล้ว") {
          {
            Platform.OS === "ios"
              ? toastRef.current.show(responseJson, 3000)
              : ToastAndroid.show(responseJson, 2000);
          }
          //AsyncStorage.setItem("Email", email);
          SumCarts();
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
  };

  useEffect(() => {
    Products();
    SumCarts();
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
          // <View style={styles.searchView}>
          <View style={styles.inputView}>
            <TouchableOpacity
              // onPress={() => navigation.goBack()}
              onPress={() => navigation.navigate("SearchProducts")}
            >
              <View>
                <Icon name="search" size={24} color="#333" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.goBack()}
              onPress={() => navigation.navigate("SearchProducts")}
              style={styles.input}
            >
              <TextInput
                defaultValue={name}
                style={styles.inputtext}
                placeholder="ค้นหาสินค้าที่ต้องการ"
                editable={false}
                onPress={() => navigation.goBack()}
                value={name}
                textContentType="name"
                returnKeyType="search"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              // onPress={() => navigation.goBack()}
              onPress={() => navigation.navigate("SearchProducts")}
            >
              <Icon name="cancel" size={20} color="#333" />
            </TouchableOpacity>

            {/* <Icon name="search" type="font-awesome" size={15} color="gray" />
            <TextInput
              style={{ left: 5 }}
              onChangeText={setSearch}
              // value={number}

              placeholder="ค้นหาสินค้าที่ต้องการ"
              keyboardType="email-address"
            /> */}
          </View>
          // </View>
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
      <View
        style={{
          backgroundColor: "#f37721",
          paddingBottom: 2,
          paddingTop: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // alignSelf: "center",
            // paddingHorizontal: 15,
            marginHorizontal: 15,
            bottom: 3,
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              width: "75%",
              //   bottom: 5,
              // backgroundColor: "blue",
            }}
          >
            {name}
          </Text>
          {/* <TouchableOpacity
            style={{
              flexDirection: "row",
              //   backgroundColor: "blue",
              width: "20%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Icon
              //   style={styles.filterimage}
              name="filter"
              type="font-awesome"
              size={20}
              color="#fff"
            />
            <Text> </Text>
            <Text
              style={{
                color: "#ffffff",
                // bottom: 5,
              }}
            >
              กรอง
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        style={{ backgroundColor: "#e4e4e4" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: 3,
              paddingTop: 5,
              paddingBottom: 5,
              alignSelf: "center",
            }}
          >
            {products ? (
              products.length > 0 ? (
                <FlatList
                  data={products}
                  numColumns={numColumns}
                  // columnWrapperStyle={{ justifyContent: "space-between" }}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.boxContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Products", { id: item.id })
                        }
                      >
                        <View style={styles.box}>
                          <View style={styles.boxAlign}>
                            {/* {item.percent !== null ? (
                              <View
                                style={{
                                  backgroundColor: "#f37721",
                                  alignSelf: "flex-end",
                                  // borderTopLeftRadius: 10,
                                  borderBottomLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  justifyContent: "center",
                                  width: 40,
                                  height: 18,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: "#000000",
                                    textAlign: "center",
                                  }}
                                >
                                  {item.percent}%
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  width: 40,
                                  height: 18,
                                }}
                              ></View>
                            )} */}
                            {item.discount != item.price ? (
                              <View
                                style={{
                                  backgroundColor: "#f37721",
                                  alignSelf: "flex-end",
                                  // borderTopLeftRadius: 10,
                                  borderBottomLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  justifyContent: "center",
                                  width: 40,
                                  height: 18,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: "#000000",
                                    textAlign: "center",
                                  }}
                                >
                                  {item.percent}%
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  width: 40,
                                  height: 18,
                                }}
                              ></View>
                            )}
                            <View
                              style={{
                                width: 150,
                                height: 140,
                                justifyContent: "center",
                                alignItems: "center",
                                // backgroundColor: "red",
                              }}
                            >
                              <Image
                                style={{
                                  width: "100%",
                                  height: 125,
                                  // backgroundColor: "red",
                                }}
                                source={{
                                  uri:
                                    "https://sricharoen-narathiwat.ml/img_product/" +
                                    item.img,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                width: 155,
                                height: 45,
                                // backgroundColor: "blue",
                                // justifyContent: "center",
                                // alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "#000000",
                                  fontWeight: "bold",
                                  // width: 150,
                                  // height: 40,
                                  // paddingTop: 3,
                                  // paddingBottom: 3,
                                  paddingVertical: 5,
                                }}
                                numberOfLines={2}
                              >
                                {item.name}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              {item.discount == item.price ? (
                                <View
                                  style={{
                                    width: 77.5,
                                    height: 53,
                                    justifyContent: "center",
                                    paddingTop: 6,
                                    paddingBottom: 8,
                                    // backgroundColor: "red",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: "orange",
                                    }}
                                  >
                                    ฿{item.discount}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    width: 77.5,
                                    justifyContent: "center",
                                    paddingTop: Platform.OS === "ios" ? 11 : 6,
                                    paddingBottom:
                                      Platform.OS === "ios" ? 11 : 6,
                                    // backgroundColor: "red",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: "orange",
                                    }}
                                  >
                                    ฿{item.discount}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: "black",
                                      textDecorationLine: "line-through",
                                    }}
                                  >
                                    ฿{item.price}
                                  </Text>
                                </View>
                              )}

                              <View
                                style={{
                                  width: 77.5,
                                  // paddingTop: 4,
                                  // paddingBottom: 8,
                                  // backgroundColor: "blue",
                                  justifyContent: "center",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => AddCart(item.id)}
                                  style={{
                                    backgroundColor: "#f37721",
                                    // right: 5,
                                    alignSelf: "flex-end",
                                    borderBottomRightRadius: 50,
                                    borderBottomLeftRadius: 50,
                                    borderTopLeftRadius: 50,
                                    borderTopRightRadius: 50,
                                  }}
                                >
                                  <Icon
                                    style={{
                                      alignSelf: "center",
                                      // alignItems: "center",
                                      justifyContent: "center",
                                      // backgroundColor: "blue",
                                      width: 40,
                                      height: 40,
                                    }}
                                    name="cart-outline"
                                    type="material-community"
                                    size={25}
                                    color="#ffffff"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <View style={{ justifyContent: "center", height: 607.5 }}>
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
                    ขออภัยไม่พบรายการสินค้า
                  </Text>
                </View>
              )
            ) : (
              <View style={{ justifyContent: "center", height: 607.5 }}>
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
                  ขออภัยไม่พบรายการสินค้า
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: "115%",
    height: 40,
    backgroundColor: "#ffffff",
    // backgroundColor: "#dfe4ea",
    borderRadius: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
  },
  inputtext: {
    fontSize: 12,
    height: 40,
  },
  containerstatusbar: {
    flex: 1,
  },
  container: {
    //flex: 1,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    // backgroundColor: "red",
  },
  goBackcontainer: {
    // position: "absolute",
    // left: 15,
    // top: -2,
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
  boxContainer: {
    // flex: 1,
    display: "flex",
    // flexDirection: "column",
    flexWrap: "wrap",
    padding: 3,
    // borderRadius: 10,
    // backgroundColor: "red",
  },
  box: {
    // height: 240,
    width: Platform.OS === "ios" ? 185 : 170,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    // width: "100%",
    borderRadius: 10,
    justifyContent: "center",
  },
  boxAlign: {
    justifyContent: "center",
    width: Platform.OS === "ios" ? 185 : 170,
    alignItems: "center",
  },
});
