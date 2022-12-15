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
} from "react-native";
import { Icon, Header, ListItem, CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaxAddress from "./TaxAddress";

export default function Makeorder({ navigation, route }) {
  const [taxCheck, setTaxCheck] = useState(false);
  const [count, setCount] = React.useState(1);
  const [address, setAddress] = useState("");
  const [tax, setTax] = useState("");
  const [id_tax, setId_tax] = useState("");
  const [id_address, setId_address] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [pcart, setPcart] = useState("");
  const [sumc, setSumc] = useState("");
  const [did, setDid] = useState("");
  const [ship, setShip] = useState("");
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState();
  const [weight, setWeight] = useState("");
  const totals = Number(sumc.sums) + ship - discount;

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Carts();
    SumCarts();
    Weights();
    ListAddress();
    ListTaxs();
    GetDid();
    Delivery();
    //ListTax();
    ListTax();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const Weights = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/weight.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setWeight(json))
      .catch((error) => console.error(error));
  };

  const ListAddress = async () => {
    let id = await AsyncStorage.getItem("aid");
    let did = await AsyncStorage.getItem("did");
    setId_address(id);
    fetch("https://sricharoen-narathiwat.ml/myaddress.php?id=" + id)
      .then((response) => response.json())
      .then((json) => {
        setAddress(json);

        if (did == "จัดส่ง") {
          SumCarts();

          if (route.params.total >= 50000) {
            setShip(0);
          } else {
            if (json.zipcode == 96000) {
              setShip(200);
            } else if (json.zipcode == 96110) {
              setShip(500);
            } else if (json.zipcode == 96120) {
              setShip(700);
            } else if (json.zipcode == 96130) {
              setShip(450);
            } else if (json.zipcode == 96140) {
              setShip(650);
            } else if (json.zipcode == 96150) {
              setShip(450);
            } else if (json.zipcode == 96160) {
              setShip(800);
            } else if (json.zipcode == 96170) {
              setShip(400);
            } else if (json.zipcode == 96180) {
              setShip(300);
            } else if (json.zipcode == 96190) {
              setShip(700);
            } else if (json.zipcode == 96210) {
              setShip(550);
            } else if (json.zipcode == 96220) {
              setShip(500);
            } else if (json.zipcode == 94110) {
              setShip(600);
            } else if (json.zipcode == 94230) {
              setShip(400);
            } else if (json.zipcode == 94220) {
              setShip(450);
            } else if (json.zipcode == 95140) {
              setShip(550);
            } else {
              setShip(1000);
            }
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const ListTaxs = async () => {
    let id = await AsyncStorage.getItem("tax");
    setId_tax(id);
    fetch("https://sricharoen-narathiwat.ml/mytaxs.php?id=" + id)
      .then((response) => response.json())
      .then((json) => setTax(json))
      .catch((error) => console.error(error));
  };

  const ListTax = async () => {
    let id = await AsyncStorage.getItem("tax");
    if (id !== null) {
      setTaxCheck(true);
    } else {
      setTaxCheck(false);
    }
    // fetch("https://sricharoen-narathiwat.ml/myaddress.php?id="+id)
    //   .then((response) => response.json())
    //   .then((json) => setAddress(json))
    //   .catch((error) => console.error(error));
  };

  const Taxs = async () => {
    setTaxCheck(!taxCheck);
    navigation.navigate("TaxAddress");
  };

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

  const Delivery = async () => {
    let uid = await AsyncStorage.getItem("uid");
    let did = await AsyncStorage.getItem("did");
    fetch("https://sricharoen-narathiwat.ml/check_delivery.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => {
        if (json == true) {
          if (did == "จัดส่งสาธารณะ") {
            AsyncStorage.setItem("did", "");
            GetDid();
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const GetDid = async () => {
    let did = await AsyncStorage.getItem("did");
    let uid = await AsyncStorage.getItem("uid");
    setDid(did);
    if (did == "จัดส่ง") {
      SumCarts();

      if (route.params.total >= 50000) {
        setShip(0);
      } else {
        if (address.zipcode == 96000) {
          setShip(200);
        } else if (json.zipcode == 96110) {
          setShip(500);
        } else if (json.zipcode == 96120) {
          setShip(700);
        } else if (json.zipcode == 96130) {
          setShip(450);
        } else if (json.zipcode == 96140) {
          setShip(650);
        } else if (json.zipcode == 96150) {
          setShip(450);
        } else if (json.zipcode == 96160) {
          setShip(800);
        } else if (json.zipcode == 96170) {
          setShip(400);
        } else if (json.zipcode == 96180) {
          setShip(300);
        } else if (json.zipcode == 96190) {
          setShip(700);
        } else if (json.zipcode == 96210) {
          setShip(550);
        } else if (json.zipcode == 96220) {
          setShip(500);
        } else if (address.zipcode == 94110) {
          setShip(600);
        } else if (address.zipcode == 94230) {
          setShip(400);
        } else if (address.zipcode == 94220) {
          setShip(450);
        } else if (address.zipcode == 95140) {
          setShip(550);
        } else {
          setShip(1000);
        }
      }
    } else if (did == "จัดส่งสาธารณะ") {
      SumCarts();
      if (route.params.total >= 5000) {
        setShip(0);
      } else {
        fetch("https://sricharoen-narathiwat.ml/weight.php?uid=" + uid)
          .then((response) => response.json())
          .then((json) => {
            if (json <= 1) {
              setShip(60);
            } else if (json <= 2) {
              setShip(80);
            } else if (json <= 7) {
              setShip(125);
            } else if (json <= 10) {
              setShip(140);
            } else if (json <= 15) {
              setShip(255);
            } else if (json <= 20) {
              setShip(350);
            } else if (json > 20) {
              setShip(1000);
            }
          })
          .catch((error) => console.error(error));
      }
    } else {
      setShip(0);
    }
  };

  const Pays = async () => {
    if (id_address == null) {
      Alert.alert("แจ้งเตือน!", "กรุณาเลือกที่อยู่");
    } else if (did == null) {
      Alert.alert("แจ้งเตือน!", "กรุณาเลือกรูปแบบการจัดส่ง");
    } else {
      navigation.replace("PaymentChannel", {
        id_address: id_address,
        id_tax: id_tax,
        delivery: did,
        ship: ship,
        item: sumc.total,
        totalp: sumc.sums,
        totals: totals,
        discount: discount,
      });
    }
  };

  useEffect(() => {
    Carts();
    Delivery();
    SumCarts();
    ListAddress();
    ListTaxs();
    Weights();
    GetDid();
    //ListTax();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
      }
      {
        ListTax();
      }
      {
        ListTaxs();
      }
      {
        GetDid();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.containerstatusbar}>
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
              navigation.replace("Cart");
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
          text: "ทำการสั่งซื้อสินค้า",
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
          {/* <View style={styles.listAllButton}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color="#f37721"
            />
            <Text style={styles.listAllButtonText}>เลือกสินค้าทั้งหมด</Text>
            <TouchableOpacity>
              <Icon
                name="trash-can-outline"
                type="material-community"
                size={20}
                marginHorizontal={"45%"}
              />
            </TouchableOpacity>
          </View> */}
          <View>
            {address.length < 1 ? (
              <ListItem
                //   bottomDivider
                onPress={() => navigation.push("Address")}
              >
                <Icon
                  name="map-marker-radius-outline"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      fontSize: 12,
                      width: "100%",
                    }}
                  >
                    ที่อยู่ในการจัดส่ง
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ) : (
              <ListItem
                //   bottomDivider
                onPress={() => navigation.push("Address")}
              >
                <Icon
                  name="map-marker-radius-outline"
                  type="material-community"
                  size={20}
                  marginHorizontal={3}
                />
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      fontSize: 12,
                      width: "100%",
                    }}
                  >
                    ที่อยู่ในการจัดส่ง
                  </ListItem.Title>
                  <ListItem.Title style={{ fontSize: 10, width: "100%" }}>
                    {address.name}
                  </ListItem.Title>
                  <ListItem.Title style={{ fontSize: 10, width: "90%" }}>
                    {address.houseno} หมู่ {address.villageno} ซ.{address.lane}{" "}
                    หมู่บ้าน/อาคาร {address.villageorbuilding} ถ.{address.road}{" "}
                    ต.{address.subdistrict} อ.{address.district} จ.
                    {address.province} {address.zipcode}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )}
            <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>

            <ListItem
            //   bottomDivider
            // onPress={() => navigation.push("TaxAddress")}
            >
              <CheckBox
                containerStyle={{ right: 17 }}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                checked={taxCheck}
                checkedColor="#f37721"
                uncheckedColor="#f37721"
                onPress={() => Taxs()}
              />
              <ListItem.Content style={{ right: 38 }}>
                <ListItem.Title
                  style={{
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  ต้องการใบกำกับภาษี
                </ListItem.Title>
                <ListItem.Title
                  style={{ fontSize: 10, width: "90%", color: "red" }}
                >
                  กรณีลูกค้าเลือกไม่รับใบกำกับภาษีแล้ว
                  หากต้องการขอใบกำกับภาษีเต็มรูป
                  สามารถขอได้ภายในวันที่ซื้อสินค้าเท่านั้น
                </ListItem.Title>
                {tax.id ? (
                  <ListItem.Title style={{ fontSize: 10 }}>
                    {tax.id
                      ? tax.types == 0
                        ? "เลขประจำตัวผู้เสียภาษี : " + tax.taxid
                        : "เลขประจำตัวผู้เสียภาษี : " + tax.idcard
                      : null}

                    {"\n"}

                    {tax.id
                      ? tax.types == 0
                        ? tax.name_office
                        : tax.name
                      : null}

                    {"\n"}

                    {tax.id
                      ? tax.address == 0
                        ? address.houseno +
                          " หมู่ " +
                          address.villageno +
                          " ซ." +
                          address.lane +
                          " หมู่บ้าน/อาคาร " +
                          address.villageorbuilding +
                          " ถ." +
                          address.road +
                          " ต." +
                          address.subdistrict +
                          " อ." +
                          address.district +
                          " จ." +
                          address.province +
                          " " +
                          address.zipcode
                        : null
                      : null}
                    {tax.id
                      ? tax.address == 1
                        ? "ห้องเลขที่ " +
                          tax.room_no +
                          " ชั้นที่ " +
                          tax.floor +
                          " อาคาร " +
                          tax.building_name +
                          " หมู่ " +
                          tax.villageno +
                          " ซ." +
                          tax.lane +
                          " หมู่บ้าน " +
                          tax.villageorbuilding +
                          " ถ." +
                          tax.road +
                          " ต." +
                          tax.subdistrict +
                          " อ." +
                          tax.district +
                          " จ." +
                          tax.province +
                          " " +
                          tax.zipcode
                        : null
                      : null}
                  </ListItem.Title>
                ) : null}
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>
          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
          <FlatList
            data={pcart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.orderListButton}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri:
                        "https://sricharoen-narathiwat.ml/img_product/" +
                        item.img,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.orderListButtonText}>{item.name}</Text>

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
                <View style={styles.itemboxButton}>
                  <View
                    style={{
                      // backgroundColor: "red",
                      // paddingVertical: 5,
                      left: Platform.OS === "ios" ? 7 : 5,
                      bottom: Platform.OS === "ios" ? 17 : 4,
                      width: Platform.OS === "ios" ? 50 : 70,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        // left: 25,
                        fontSize: Platform.OS === "ios" ? 16 : 14,
                        fontWeight: "bold",
                        color: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: Platform.OS === "ios" ? 14 : 12 }}
                      >
                        x
                      </Text>
                      {item.items}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
          {/* <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View> */}

          <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
          {did ? (
            <ListItem
              //   bottomDivider
              onPress={() => navigation.navigate("DeliveryForm")}
              containerStyle={{ backgroundColor: "#fff" }}
            >
              <Icon
                name="truck-fast-outline"
                type="material-community"
                color="#000"
                size={20}
                marginHorizontal={3}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 14,
                    width: "100%",
                    color: "#000",
                  }}
                >
                  รูปแบบการจัดส่ง
                </ListItem.Title>
                <ListItem.Title
                  style={{
                    fontSize: 10,
                    width: "100%",
                    color: "#000",
                  }}
                >
                  {did == "จัดส่ง"
                    ? "จัดส่งสินค้าปกติ รับสินค้าภายใน 1 - 2 วันทำการ"
                    : did == "จัดส่งสาธารณะ"
                    ? "จัดส่งสินค้าโดยขนส่งเอกชน"
                    : "รับสินค้าที่สำนักงานใหญ่ ต.โคกเคียน อ.เมือง จ.นราธิวาส"}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron iconStyle={{ color: "#000" }} />
            </ListItem>
          ) : (
            <ListItem
              //   bottomDivider
              onPress={() => navigation.navigate("DeliveryForm")}
              containerStyle={{ backgroundColor: "#f37721" }}
            >
              <Icon
                name="truck-fast-outline"
                type="material-community"
                color="#ffffff"
                size={20}
                marginHorizontal={3}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontSize: 12,
                    width: "100%",
                    color: "#ffffff",
                  }}
                >
                  โปรดเลือก รูปแบบการจัดส่ง
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron iconStyle={{ color: "white" }} />
            </ListItem>
          )}
        </View>
      </ScrollView>
      <View style={styles.PriceMakeorderButton}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ paddingLeft: 10, fontSize: 10 }}>
            รายการสั่งซื้อ ({sumc.total} รายการ)
          </Text>
          <Text style={{ paddingLeft: 10, fontSize: 10 }}>฿{sumc.sums}</Text>
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
          <Text style={{ paddingLeft: 10, fontSize: 10 }}>฿{discount}</Text>
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
          <Text style={{ paddingLeft: 10, fontSize: 10 }}>
            {" "}
            {ship == 0 ? "ฟรี" : "฿" + ship}
          </Text>
        </View>
      </View>
      <View style={styles.MakeorderButton}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ paddingLeft: 10, fontSize: 12 }}>ยอดสุทธิ</Text>
          <Text
            style={{
              position: "absolute",
              top: Platform.OS === "ios" ? 2 : 0,
              paddingLeft: 95,
              color: "#f37721",
              fontSize: 12,
            }}
          >
            ฿{Number(sumc.sums) + ship - discount}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f37721",
            alignItems: "center",
            justifyContent: "center",
            top: Platform.OS === "ios" ? 41.25 : "0%",
            height: Platform.OS === "ios" ? "486%" : "246%",
            width: "210%",
            left: 15,
            // borderRadius: 10,
            borderTopLeftRadius: Platform.OS === "ios" ? 75 : 50,
          }}
          onPress={() => Pays()}
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
            ชำระเงิน
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatusbar: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingBottom: "30%",
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
  PriceMakeorderButton: {
    // alignSelf: "center",
    // alignItems: "center",
    display: "flex",
    // flexDirection: "row",
    // bottom: 5,
    width: "100%",
    height: "10%",
    backgroundColor: "white",
    paddingVertical: 10,
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
  MakeorderButton: {
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    // bottom: 5,
    width: "100%",
    height: "7%",
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
});
