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
  Share,
  FlatList,
} from "react-native";

import { Icon, Header } from "react-native-elements";
import ViewSlider from "react-native-view-slider";

const { width, height } = Dimensions.get("window");

export default function Category({ navigation }) {
  const [category, setCatergory] = useState("1");
  const [data, setData] = useState("");

  const Cates = () => {
    fetch("https://sricharoen-narathiwat.ml/category.php")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Cates();
  }, []);

  console.log(data);

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
        centerComponent={
          <View style={styles.inputView}>
            {/* <View style={styles.inputView}> */}

            <Text style={{ fontSize: 16, color: "#ffffff" }}>
              หมวดหมู่สินค้า
            </Text>
            {/* </View> */}
          </View>
        }
      />
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* style={{ width: 100, height: 100, backgroundColor: "red" }} */}
            <View style={{ paddingRight: 5 }}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                pagingEnabled={true}
                renderItem={({ item }) => (
                  <View iew style={styles.categoryViewBox}>
                    <TouchableOpacity
                      // style={styles.categoryBtn}
                      onPress={() => setCatergory(item.id)}
                    >
                      <View style={styles.categoryContainer}>
                        {category == item.id ? (
                          <View style={styles.categoryIcon}>
                            <Image
                              style={styles.categoryLogo}
                              tintColor="#f37721"
                              source={{
                                uri:
                                  "https://sricharoen-narathiwat.ml/img_category/" +
                                  item.img,
                              }}
                            />
                            <Text
                              style={{
                                alignSelf: "center",
                                textAlign: "center",
                                // backgroundColor: "blue",
                                fontSize: 8,
                                color: "#f37721",
                              }}
                            >
                              {item.name}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.categoryIcon1}>
                            <Image
                              style={styles.categoryLogo}
                              tintColor="#000000"
                              source={{
                                uri:
                                  "https://sricharoen-narathiwat.ml/img_category/" +
                                  item.img,
                              }}
                            />
                            <Text style={styles.categoryBtnTxt}>
                              {item.name}
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </ScrollView>

          <ScrollView style={{ width: "73%", backgroundColor: "#ffffff" }}>
            {category == 1 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 263,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    วัสดุสินค้าโครงสร้าง
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เหล็ก",
                            id: 1,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-steel.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            เหล็ก
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ทราย",
                            id: 2,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sand.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            ทราย
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "หิน",
                            id: 3,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-stone.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            หิน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อิฐ อิฐมวลเบา",
                            id: 4,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-brick.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            อิฐ อิฐมวลเบา
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ปูนซีเมนต์ถุง",
                            id: 5,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-cement.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            ปูนซีเมนต์ถุง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เสาเข็มและแผ่นพื้น",
                            id: 6,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-stake.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            เสาเข็มและแผ่นพื้น
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 2 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    งานระบบหลังคา
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "หลังคา",
                            id: 7,
                          });
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-roof.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={3}
                          >
                            หลังคา
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "รางน้ำฝน",
                            id: 8,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-trough.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={3}
                          >
                            รางน้ำฝน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ฉนวนกันความร้อน",
                            id: 9,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-insulation.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={3}
                          >
                            ฉนวนกันความร้อน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 3 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    งานระบบไฟฟ้า
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "รางปลั๊กและอแดปเตอร์",
                            id: 10,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-powerstrip.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            รางปลั๊กและอแดปเตอร์
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กริ่ง",
                            id: 11,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-buzzer.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            กริ่ง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สายไฟ",
                            id: 12,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-wire.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สายไฟ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ระบบโซล่าเซลล์",
                            id: 13,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-solarcells.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ระบบโซล่าเซลล์
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ท่อร้อยและรางสายไฟฟ้า",
                            id: 14,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-electriccable.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ท่อร้อยและรางสายไฟฟ้า
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เบรกเกอร์และตู้ไฟ",
                            id: 15,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-breaker.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เบรกเกอร์และตู้ไฟ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ไฟฉายและไฟฉุกเฉิน",
                            id: 16,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-flashlight.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ไฟฉายและไฟฉุกเฉิน
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ปลั๊กและสวิตซ์ไฟฟ้า",
                            id: 17,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-lightswitch.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            ปลั๊กและสวิตซ์ไฟฟ้า
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 4 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    งานระบบประปา
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ท่อน้ำ ท่อระบบน้ำ",
                            id: 18,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-waterpipe.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ท่อน้ำ ท่อระบบน้ำ
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ก๊อกน้ำสนาม",
                            id: 19,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-fieldfaucet.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            ก๊อกน้ำสนาม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ท่อ PVC",
                            id: 20,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-pvcpipe.jpg")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ท่อ PVC
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องทำน้ำอุ่น",
                            id: 21,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-waterheater.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องทำน้ำอุ่น
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ท่อน้ำทิ้ง",
                            id: 22,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sewer.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ท่อน้ำทิ้ง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อ่างล้างจานและอุปกรณ์",
                            id: 23,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sink.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อ่างล้างจานและอุปกรณ์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ปั๊มน้ำ มิเตอร์น้ำ",
                            id: 24,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-waterpump.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ปั๊มน้ำ มิเตอร์น้ำ
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "แท้งค์น้ำและถังบำบัด",
                            id: 25,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-watertanks.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            แท้งค์น้ำและถังบำบัด
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "วาล์วน้ำ",
                            id: 26,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-watervalve.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            วาล์วน้ำ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์เดินท่อ",
                            id: 27,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-pipefittings.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={2}
                          >
                            อุปกรณ์เดินท่อ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 5 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    เคมีภัณฑ์
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กาวซีเมนต์",
                            id: 28,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-cementglue.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กาวซีเมนต์
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "วัสดุประสาน และอุดรอยรั่ว",
                            id: 29,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-caulk.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            วัสดุประสาน และอุดรอยรั่ว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กันซึม",
                            id: 30,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-waterproofing.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กันซึม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "น้ำยาเคลือบผิว",
                            id: 31,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-coatingsolution.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            น้ำยาเคลือบผิว
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กาวยาแนว",
                            id: 32,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sealant.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กาวยาแนว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 6 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    สีทาพื้นผิว
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีพ่นเฟอร์นิเจอร์",
                            id: 33,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-furniturespraypaint.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีพ่นเฟอร์นิเจอร์
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีทาพื้น ถนน สนาม",
                            id: 34,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-floorpaintroad.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีทาพื้น ถนน สนาม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีกันสนิม",
                            id: 35,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-rustproofpaint.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีกันสนิม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีอีพ็อกซี่/สีทนทานสูง",
                            id: 36,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-epoxypaint.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีอีพ็อกซี่/สีทนทานสูง
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีทาฝ้าเพดาน",
                            id: 37,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-ceilingpaint.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีทาฝ้าเพดาน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีเคลือบเงา",
                            id: 38,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-varnishpaint.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีเคลือบเงา
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีทาไม้",
                            id: 39,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-woodpaint.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีทาไม้
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ทาสี",
                            id: 40,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-paintequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ทาสี
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีทาอาคาร",
                            id: 41,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-buildingpaint.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีทาอาคาร
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สีรองพื้น",
                            id: 42,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-primer.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สีรองพื้น
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 7 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    ประตูและหน้าต่าง
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "หน้าต่างและวงกบ",
                            id: 43,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-windowsandjambs.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            หน้าต่างและวงกบ
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ประตูและวงกบ",
                            id: 44,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-doorandjamb.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ประตูและวงกบ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ประตู",
                            id: 45,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-doordevice.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ประตู
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์เสริม",
                            id: 46,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-dooraccessories.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์เสริม
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 8 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    วัสดุปิดผิว
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "แผ่นซีเมนต์บอร์ด",
                            id: 47,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-cementboard.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            แผ่นซีเมนต์บอร์ด
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กาวปูกระเบื้อง",
                            id: 48,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-tileadhesive.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กาวปูกระเบื้อง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เมทัลชีท",
                            id: 49,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-metalsheet.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เมทัลชีท
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สังกะสี",
                            id: 50,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-zinc.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สังกะสี
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "พื้นไวนิล",
                            id: 51,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-vinylfloor.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            พื้นไวนิล
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "วัสดุปูพื้นและผนัง",
                            id: 52,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-floorandwallmaterials.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            วัสดุปูพื้นและผนัง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ไม้เทียม",
                            id: 53,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-artificialwood.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ไม้เทียม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "บล๊อกแก้ว",
                            id: 54,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-glassblock.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            บล๊อกแก้ว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "พื้นลามิเนต",
                            id: 55,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-laminateflooring.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            พื้นลามิเนต
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "แผ่นยิปซั่มบอร์ด",
                            id: 56,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-gypsumboard.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            แผ่นยิปซั่มบอร์ด
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กระเบื้องพื้นและผนัง",
                            id: 57,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-floorandwalltiles.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กระเบื้องพื้นและผนัง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "โมเสค",
                            id: 58,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-mosaic.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            โมเสค
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์พื้นและผนัง",
                            id: 59,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-floorandwallequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์พื้นและผนัง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 9 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    เครื่องมือช่าง ฮาร์ดแวร์
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องมือไฟฟ้า",
                            id: 60,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-powertools.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องมือไฟฟ้า
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กาว",
                            id: 61,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-glue.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กาว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องปั่นไฟ",
                            id: 62,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-generator.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องปั่นไฟ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ยึดติด",
                            id: 63,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-fixingdevice.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ยึดติด
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "น๊อต สกรู",
                            id: 64,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-nutscrew.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            น๊อต สกรู
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "บันได",
                            id: 65,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-stairs.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            บันได
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์เชื่อมและบัดกรี",
                            id: 66,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-weldingandsolderingequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์เชื่อมและบัดกรี
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กล่องเครื่องมือ",
                            id: 67,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-toolbox.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กล่องเครื่องมือ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ประดับยนต์",
                            id: 68,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-autoaccessories.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ประดับยนต์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องมือลม",
                            id: 69,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-windinstrument.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องมือลม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์เคลื่อนย้าย",
                            id: 70,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-movingdevice.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์เคลื่อนย้าย
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ชุดและอุปกรณ์เซฟตี้",
                            id: 71,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-safetyclothing.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ชุดและอุปกรณ์เซฟตี้
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องมือช่างและโยธา",
                            id: 72,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-toolsandcivil.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องมือช่างและโยธา
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 10 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/electricity.jpg")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/electricity.jpg")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    หลอดไฟและโคมไฟ
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "โคมไฟภายใน",
                            id: 73,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-interiorlamp.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            โคมไฟภายใน
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ดาวน์ไลท์",
                            id: 74,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-neonrailandstarlight.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ดาวน์ไลท์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "โคมไฟโซล่าเซลล์",
                            id: 75,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-solarcelllamp.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            โคมไฟโซล่าเซลล์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "โคมไฟภายนอก",
                            id: 76,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-exteriorlamp.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            โคมไฟภายนอก
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์หลอดไฟ",
                            id: 77,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-lampequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์หลอดไฟ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "หลอดไฟ",
                            id: 78,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-lamp.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            หลอดไฟ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 11 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    ห้องน้ำ
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ฉากกั้นอาบน้ำ",
                            id: 79,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-showerscreen.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ฉากกั้นอาบน้ำ
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อ่างล้างหน้า",
                            id: 80,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-basin.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อ่างล้างหน้า
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ผ้าเช็ดตัวและชุดคลุมอาบน้ำ",
                            id: 81,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-towelsandbathrobes.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ผ้าเช็ดตัวและชุดคลุมอาบน้ำ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ก๊อกน้ำ",
                            id: 82,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-tap.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ก๊อกน้ำ
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สายฉีดชำระ",
                            id: 83,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sprinkler.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สายฉีดชำระ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ห้องน้ำ",
                            id: 84,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-bathroomaccessories.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ห้องน้ำ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "กระจก",
                            id: 85,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-bathroommirror.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            กระจก
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "โถปัสสาวะ",
                            id: 86,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-urinal.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            โถปัสสาวะ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ฝักบัว",
                            id: 87,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-shower.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ฝักบัว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อะไหล่ห้องน้ำ",
                            id: 88,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-bathroomparts.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อะไหล่ห้องน้ำ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "วาล์วและสต๊อปวาล์ว",
                            id: 89,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-stopvalves.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            วาล์วและสต๊อปวาล์ว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "สุขภัณฑ์",
                            id: 90,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sanitaryware.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            สุขภัณฑ์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อ่างอาบน้ำ",
                            id: 91,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-bath.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อ่างอาบน้ำ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ม่านห้องน้ำ",
                            id: 92,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-bathroomcurtain.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ม่านห้องน้ำ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 12 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    ห้องครัวและอุปกรณ์
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ชุดครัวสำเร็จรูป",
                            id: 93,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-kitchenset.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ชุดครัวสำเร็จรูป
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์จัดเก็บในครัว",
                            id: 94,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-kitchenstorage.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์จัดเก็บในครัว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องกรองน้ำและไส้กรอง",
                            id: 95,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-waterfiltersandfilters.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องกรองน้ำและไส้กรอง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องใช้ไฟฟ้าในครัว",
                            id: 96,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-kitchenappliances.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องใช้ไฟฟ้าในครัว
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เฟอร์นิเจอร์ครัว",
                            id: 97,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-kitchenfurniture.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เฟอร์นิเจอร์ครัว
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อ่างล้างจานและอุปกรณ์",
                            id: 98,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-sinkandequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อ่างล้างจานและอุปกรณ์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องครัวและอุปกรณ์",
                            id: 99,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-kitchenutensilsandequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องครัวและอุปกรณ์
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ภาชนะบรรจุอาหาร",
                            id: 100,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-foodcontainer.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ภาชนะบรรจุอาหาร
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์บนโต๊ะอาหาร",
                            id: 101,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-tableware.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์บนโต๊ะอาหาร
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : category == 13 ? (
              <View>
                <View style={styles.imgname}>
                  <>
                    <ViewSlider
                      renderSlides={
                        <>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.viewBox}>
                            <Image
                              source={require("../src/assets/slide-category/constrution.png")}
                              style={{
                                height: 100,
                                width: Platform.OS === "ios" ? 292.45 : 270,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </>
                      }
                      style={styles.slider} //Main slider container style
                      height={100} //Height of your slider
                      slideCount={2} //How many views you are adding to slide
                      dots={true} // Pagination dots visibility true for visibile
                      dotActiveColor="#f37721" //Pagination dot active color
                      dotInactiveColor="gray" // Pagination do inactive color
                      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
                      // autoSlide={true} //The views will slide automatically
                      // slideInterval={8000} //In Miliseconds
                    />
                  </>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "5%",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    // alignSelf: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#f37721",
                      // fontWeight: "bold",
                      left: 10,
                    }}
                  >
                    สวนและอุปกรณ์ตกแต่ง
                  </Text>
                </View>
                <View style={styles.categoryIconname}>
                  <View style={styles.boxContainer}>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ตกแต่งสวน",
                            id: 102,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-gardendecoration.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ตกแต่งสวน
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์แค้มปิ้ง",
                            id: 103,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-campingequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์แค้มปิ้ง
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ทำสวน",
                            id: 104,
                          });
                        }}
                        style={{
                          // backgroundColor: "orange",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-gardeningequipment.png")}
                          />
                          <Text
                            style={{
                              // textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ทำสวน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์สำหรับสัตว์เลี้ยง",
                            id: 105,
                          });
                        }}
                        style={{
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          {/* <View> */}
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-petsupplies.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์สำหรับสัตว์เลี้ยง
                            {/* {item.name} */}
                          </Text>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "จักรยาน",
                            id: 106,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-bicycle.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            จักรยาน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เฟอร์นิเจอร์นอกบ้าน",
                            id: 107,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-outdoorfurniture.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เฟอร์นิเจอร์นอกบ้าน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์จัดเก็บสวน",
                            id: 108,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-gardenstorageequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์จัดเก็บสวน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ของเล่นสนาม",
                            id: 109,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-fieldtoys.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ของเล่นสนาม
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "ต้นไม้และเมล็ดพันธ์ุ",
                            id: 110,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-treeandseed.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            ต้นไม้และเมล็ดพันธ์ุ
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "เครื่องมือทำสวน",
                            id: 111,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-gardentools.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            เครื่องมือทำสวน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์รดน้ำต้นไม้",
                            id: 112,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-plantwateringequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์รดน้ำต้นไม้
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SelectProducts", {
                            name: "อุปกรณ์ทำอาหารนอกบ้าน",
                            id: 113,
                          });
                        }}
                        style={{
                          // backgroundColor: "blue",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 90,
                        }}
                      >
                        <View style={styles.boxAlign}>
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../src/assets/sub-category/sub-cate-outdoorcookingequipment.png")}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 8,
                              // fontWeight: "bold",
                              // width: 150,
                            }}
                            numberOfLines={1}
                          >
                            อุปกรณ์ทำอาหารนอกบ้าน
                            {/* {item.name} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: "115%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  containerstatusbar: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    // backgroundColor: "#E4E4E4",
    // backgroundColor: "orange",
    width: "27%",
    // marginBottom: 10,
    // marginTop: 10,
  },
  categorytopbottom: {
    marginBottom: 5,

    marginTop: 5,
  },

  categoryViewBox: {
    width: width,

    height: 80,
    // backgroundColor: "red",
  },
  categoryContainer: {
    width: "25%",
    // top: 2.5,
    // bottom: 2.5,
    // backgroundColor: "red",
  },
  categoryBtn: {
    flex: 1,
    width: "25%",
    marginHorizontal: 0,
    backgroundColor: "red",
  },
  imgname: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // left: 7,
    // top: 10,
    width: "100%",
    // height: "17%",
    paddingVertical: 5,
    // backgroundColor: "red",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },

  categoryIconname: {
    borderWidth: 0,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    // left: 7,
    // top: 10,
    // width: "95%",
    height: 500,
    // marginBottom: 30,
    backgroundColor: "#ffffff",
    // borderRadius: 8,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },

  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    // left: 7,
    // width: Platform.OS === "ios" ? 92 : 85,
    height: 85,
    // backgroundColor: "#ffffff",
    // backgroundColor: "blue",
    // borderRadius: 8,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
  categoryIcon1: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: 'row',
    // left: 7,
    // width: Platform.OS === "ios" ? 92 : 85,
    height: 85,
    backgroundColor: "white",
    // borderRadius: 8,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },

  categoryBtnTxt: {
    alignSelf: "center",
    textAlign: "center",
    // backgroundColor: "blue",
    fontSize: 8,
    color: "#000000",
  },
  categoryLogo: {
    width: "55%",
    height: "55%",
  },
  imgContainer: {
    flexDirection: "row",
    width: "96%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  imgBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  imgIcon: {
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

  imgLogo: {
    width: "367%",
    height: "145%",
    top: 5,
    borderRadius: 10,
  },

  imgViewBox: {
    // width: 258,
    // height: 200,
    paddingHorizontal: 10,
    justifyContent: "center",
    width: width,
    alignItems: "center",
    height: 150,
  },
  imgSlider: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    // borderRadius: 10,
  },
  imgDotContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -10,
  },
  viewBox: {
    // paddingHorizontal: 10,
    // justifyContent: "center",
    // width: "100%",
    // backgroundColor: "pink",
    // alignItems: "center",
    // height: 100,
    // borderRadius: 10,
  },
  slider: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
    width: "100%",
    borderRadius: 10,
  },
  dotContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -10,
  },
  boxContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    // padding: 3,
    // backgroundColor: "blue",
    flexWrap: "wrap",
  },
  box: {
    height: "16.67%",
    // backgroundColor: "red",
    flexDirection: "row",
    width: "33.3333333333333000%",
    // borderRadius: 10,
    justifyContent: "center",
  },
  boxAlign: {
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
  },
});
