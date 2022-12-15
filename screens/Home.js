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

export default function Home({ navigation }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState("");
  const numColumns = 2;
  const [sumc, setSumc] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const toastRef = React.useRef();

  const Products = () => {
    fetch("https://sricharoen-narathiwat.ml/products1.php")
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
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

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
    <View>
      <StatusBar animated={true} />
      <Toast
        ref={toastRef}
        style={{
          backgroundColor: "#333",
          top: 50,
          borderRadius: 20,
          // width: "50%",
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
            android: 85,
            ios: 100,
            default: 85,
          }),
        }}
        leftComponent={
          <Avatar
            style={styles.Logo}
            source={require("../src/assets/logo.png")}
            overlayContainerStyle={{
              backgroundColor: "white",
              borderRadius: 15,
            }}
          />
        }
        centerComponent={
          <TouchableOpacity
            style={styles.inputView}
            onPress={() => navigation.navigate("SearchProducts")}
          >
            {/* <View style={styles.inputView}> */}
            <Icon name="search" type="font-awesome" size={15} color="gray" />
            <Text style={{ fontSize: 12, left: 5, color: "grey" }}>
              ค้นหาสินค้าที่ต้องการ
            </Text>
            {/* </View> */}
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.push("Cart");
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

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <>
            <ViewSlider
              renderSlides={
                <>
                  <View style={styles.viewBox}>
                    <Image
                      source={require("../src/assets/Slide-1.png")}
                      style={{ height: 200, width }}
                    />
                  </View>
                  <View style={styles.viewBox}>
                    <Image
                      source={require("../src/assets/Slide-2.png")}
                      style={{ height: 200, width }}
                    />
                  </View>
                  <View style={styles.viewBox}>
                    <Image
                      source={require("../src/assets/Slide-3.png")}
                      style={{ height: 200, width }}
                    />
                  </View>
                </>
              }
              style={styles.slider} //Main slider container style
              height={200} //Height of your slider
              slideCount={3} //How many views you are adding to slide
              dots={true} // Pagination dots visibility true for visibile
              dotActiveColor="#f37721" //Pagination dot active color
              dotInactiveColor="white" // Pagination do inactive color
              dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
              autoSlide={false} //The views will slide automatically
              slideInterval={10000} //In Miliseconds
            />
          </>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={[styles.textStyle, { paddingLeft: 15, paddingTop: 5 }]}
            >
              หมวดหมู่สินค้า
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Category");
              }}
              style={{
                flexDirection: "row",
                width: 100,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { textAlign: "right", paddingRight: 5, paddingTop: 5 },
                ]}
              >
                เพิ่มเติม
              </Text>
              <Icon
                name="chevron-right"
                type="material-community"
                size={15}
                // color='#ffffff'
                color="#000000"
                top={4}
                paddingRight={15}
                // marginHorizontal={"45%"}
              />
            </TouchableOpacity>
          </View>

          <>
            <ViewSlider
              renderSlides={
                <>
                  <View style={styles.categoryViewBox}>
                    <View style={styles.categoryContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "งานโครงสร้าง",
                            id: "a",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-dumper.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>
                            งานโครงสร้าง
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "งานประปา",
                            id: "b",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-watersupply.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>งานประปา</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "งานไฟฟ้า",
                            id: "c",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-plug.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>งานไฟฟ้า</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "งานสี",
                            id: "d",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-paint.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>งานสี</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.categoryViewBox}>
                    <View style={styles.categoryContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "กระเบื้อง",
                            id: "e",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-covering.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>กระเบื้อง</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "งานหลังคา",
                            id: "f",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-roof.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>งานหลังคา</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "สุขภัณฑ์",
                            id: "g",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-toilet.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>สุขภัณฑ์</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องมือช่าง&ฮาร์ดแวร์",
                            id: "h",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={styles.categoryLogo}
                            source={require("../src/assets/category/cate-tool.png")}
                          />
                          <Text style={styles.categoryBtnTxt}>
                            เครื่องมือช่าง&ฮาร์ดแวร์
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              }
              style={styles.categorySlider} //Main slider container style
              height={100} //Height of your slider
              slideCount={2} //How many views you are adding to slide
              dots={true} // Pagination dots visibility true for visibile
              dotActiveColor="#f37721" //Pagination dot active color
              dotInactiveColor="white" // Pagination do inactive color
              dotsContainerStyle={styles.categoryDotContainer} // Container style of the pagination dots
              autoSlide={false} //The views will slide automatically
              slideInterval={15000} //In Miliseconds
            />
          </>

          {/* <View style={{ flexDirection: "row" }}>
            <Text style={[styles.textStyle, { paddingLeft: 5, paddingTop: 5 }]}>
              สินค้าโปรโมชั่น
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.textStyle,
                  { textAlign: "right", paddingRight: 5, paddingTop: 5 },
                ]}
              >
                เพิ่มเติม
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* 
          <View style={styles.promotionViewBox}>
            <View style={styles.promotionContainer}>
              <TouchableOpacity
                style={styles.promotionBtn}
                onPress={() => navigation.navigate("Products")}
              >
                <View
                  style={[styles.promotionIcon, { flexDirection: "column" }]}
                >
                  <Image
                    style={styles.promotionLogo}
                    source={require("../src/assets/green_lotus.png")}
                  />
                  <Text style={styles.promotionBtnTxt}>
                    ดอกบัว ปูนเขียว ขนาด 50 กก.
                  </Text>
                  <Text style={{ fontSize: 14, color: "#f37721" }}>฿140</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.promotionBtn} onPress={() => {}}>
                <View style={styles.promotionIcon}>
                  <Image
                    style={styles.promotionLogo}
                    source={require("../src/assets/truck.png")}
                  />
                  <Text style={styles.promotionBtnTxt}>ปูน</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={{ flexDirection: "row" }}>
            <Text
              style={[styles.textStyle, { paddingLeft: 15, paddingTop: 5 }]}
            >
              สินค้าแบรนด์
            </Text>
          </View>

          <>
            <ViewSlider
              renderSlides={
                <>
                  <View style={styles.categoryViewBox}>
                    <View style={styles.categoryContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "ปูนดอกบัว",
                            id: "brandA",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "60%" }}
                            source={require("../src/assets/slide-brand/lotus.jpg")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>ปูนดอกบัว</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "JBP",
                            id: "brandB",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "60%" }}
                            source={require("../src/assets/slide-brand/JBP.jpg")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>JBP</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "SHERA",
                            id: "brandC",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "50%" }}
                            source={require("../src/assets/slide-brand/shera.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>SHERA</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "DOS",
                            id: "brandD",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "80%", height: "80%" }}
                            source={require("../src/assets/slide-brand/dos.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>DOS</Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.categoryViewBox}>
                    <View style={styles.categoryContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "จระเข้ คอร์เปอเรชั่น",
                            id: "brandE",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "80%", height: "80%" }}
                            source={require("../src/assets/slide-brand/crocodile.jpg")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>
                            จระเข้ คอร์เปอเรชั่น
                          </Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "makita",
                            id: "brandF",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "30%" }}
                            source={require("../src/assets/slide-brand/makita.jpg")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>งานหลังคา</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "ตราเพชร",
                            id: "brandG",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "80%" }}
                            source={require("../src/assets/slide-brand/Diamond.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>สุขภัณฑ์</Text> */}
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "Yale",
                            id: "brandH",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "50%" }}
                            source={require("../src/assets/slide-brand/yale.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>
                            เครื่องมือช่าง&ฮาร์ดแวร์
                          </Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.categoryViewBox}>
                    <View style={styles.categoryContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "Duragres",
                            id: "brandI",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "80%", height: "80%" }}
                            source={require("../src/assets/slide-brand/Duragres.jpg")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>
                            จระเข้ คอร์เปอเรชั่น
                          </Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "CAMPANA",
                            id: "brandJ",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "80%" }}
                            source={require("../src/assets/slide-brand/CAMPANA.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>งานหลังคา</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "Karat",
                            id: "brandK",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "80%" }}
                            source={require("../src/assets/slide-brand/Karat.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>สุขภัณฑ์</Text> */}
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SelectProducts", {
                            name: "stanley",
                            id: "brandL",
                          })
                        }
                        style={styles.categoryBtn}
                      >
                        <View style={styles.categoryIcon}>
                          <Image
                            style={{ width: "100%", height: "60%" }}
                            source={require("../src/assets/slide-brand/stanley.png")}
                          />
                          {/* <Text style={styles.categoryBtnTxt}>
                            เครื่องมือช่าง&ฮาร์ดแวร์
                          </Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              }
              style={styles.categorySlider} //Main slider container style
              height={100} //Height of your slider
              slideCount={3} //How many views you are adding to slide
              dots={true} // Pagination dots visibility true for visibile
              dotActiveColor="#f37721" //Pagination dot active color
              dotInactiveColor="white" // Pagination do inactive color
              dotsContainerStyle={styles.categoryDotContainer} // Container style of the pagination dots
              autoSlide={false} //The views will slide automatically
              slideInterval={10000} //In Miliseconds
            />
          </>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={[styles.textStyle, { paddingLeft: 15, paddingTop: 5 }]}
            >
              สินค้าทั่วไป
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SelectProducts", {
                  id: 999,
                  name: "สินค้าทั่วไป",
                });
              }}
              style={{
                flexDirection: "row",
                width: 100,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { textAlign: "right", paddingRight: 5, paddingTop: 5 },
                ]}
              >
                เพิ่มเติม
              </Text>
              <Icon
                name="chevron-right"
                type="material-community"
                size={15}
                // color='#ffffff'
                color="#000000"
                top={4}
                paddingRight={15}
                // marginHorizontal={"45%"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: 3,
              paddingTop: 5,
              paddingBottom: 5,
              alignSelf: "center",
            }}
          >
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
                              //backgroundColor: "red",
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
                                paddingTop: 4,
                                paddingBottom: 8,
                                // backgroundColor: "yellow",
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
                                paddingBottom: Platform.OS === "ios" ? 11 : 6,
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? "25.6%" : "22%",
  },

  Logo: {
    width: 30,
    height: 30,
    left: 7.5,
    top: 5,
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
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: "center",
    width: width,
    padding: 10,
    alignItems: "center",
    height: 200,
  },
  slider: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  dotContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -10,
  },

  textStyle: {
    fontSize: 12,
    color: "black",
    flex: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "96%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
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

  categoryBtnTxt: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 8,
    color: "#000000",
  },
  categoryLogo: {
    width: "55%",
    height: "55%",
  },

  categoryViewBox: {
    width: width,
    height: 200,
  },
  categorySlider: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryDotContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -15,
  },

  promotionViewBox: {
    width: width,
    height: 200,
    // backgroundColor: "#f37721",
  },
  promotionContainer: {
    flexDirection: "row",
    width: "98%",
    alignSelf: "center",
    top: 5,
  },
  promotionBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  promotionIcon: {
    borderWidth: 0,
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    height: "95%",
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
  promotionLogo: {
    top: 20,
    width: "50%",
    height: "55%",
  },
  promotionpriceBtnTxt: {
    alignSelf: "center",
    fontSize: 10,
    color: "#000000",
    paddingHorizontal: 5,
    top: 30,
  },
  promotionBtnTxt: {
    alignSelf: "center",
    fontSize: 10,
    color: "#000000",
    paddingHorizontal: 5,
    top: 30,
  },
  goBackcontainer: {
    position: "absolute",
    left: 10,
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
    // height: 30,
  },
  Cartimage: {
    width: 30,
    height: 30,
  },
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

  generalViewBox: {
    width: width,
    height: 200,
    backgroundColor: "#f37721",
  },
  generalContainer: {
    flexDirection: "row",
    width: "98%",
    alignSelf: "center",
    top: 5,
  },
  generalBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  generalIcon: {
    borderWidth: 0,
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    height: "95%",
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
  generalLogo: {
    top: 20,
    width: "50%",
    height: "55%",
  },
  generalpriceBtnTxt: {
    alignSelf: "center",
    fontSize: 10,
    color: "#000000",
    paddingHorizontal: 5,
    top: 30,
  },
  generalBtnTxt: {
    alignSelf: "center",
    fontSize: 10,
    color: "#000000",
    paddingHorizontal: 5,
    top: 30,
  },
  boxContainer: {
    // flex: 1,
    display: "flex",
    // flexDirection: "column",
    flexWrap: "wrap",
    padding: 3,
    // borderRadius: 10,
    // backgroundColor: "red",
    // borderRadius: 10,
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
