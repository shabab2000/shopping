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
  ToastAndroid,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import { Badge, Icon, withBadge, Header, Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewSlider from "react-native-view-slider";
import { WebView } from "react-native-webview";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");


const onShare = async () => {
  try {
    const result = await Share.share({
      message: "https://sricharoen-narathiwat.ml/connect.php",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function Products({ navigation, route }) {
  const [heart, setHeart] = useState(false);
  const [count, setCount] = useState(1);
  const [pdata, setPdata] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState("");
  const [reviewp, setReviewp] = useState("");
  const [idp, setIdp] = useState(route.params.id);
  const [sumc, setSumc] = useState("");
  const toastRef = React.useRef();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Productd();
    favorite();
    SumCarts();
    //Review();
    Reviews();
    Reviewp();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const OutOfStockAlert = () => Alert.alert("แจ้งเตือน!", "ขออภัย! สินค้าหมด");

  const Productd = () => {
    fetch("https://sricharoen-narathiwat.ml/details-product.php?id=" + idp)
      .then((response) => response.json())
      .then((json) => setPdata(json))
      .catch((error) => console.error(error));
  };

  const Review = () => {
    fetch("https://sricharoen-narathiwat.ml/review.php?id=" + idp)
      .then((response) => response.json())
      .then((json) => setReview(json))
      .catch((error) => console.error(error));
  };
  const Reviews = () => {
    fetch("https://sricharoen-narathiwat.ml/reviews.php?id=" + idp)
      .then((response) => response.json())
      .then((json) => setReviews(json))
      .catch((error) => console.error(error));
  };
  const Reviewp = () => {
    fetch("https://sricharoen-narathiwat.ml/reviewp.php?id=" + idp)
      .then((response) => response.json())
      .then((json) => setReviewp(json))
      .catch((error) => console.error(error));
  };

  const favorite = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch(
      "https://sricharoen-narathiwat.ml/favorites.php?pid=" +
        idp +
        "&uid=" +
        uid
    )
      .then((response) => response.json())
      .then((json) => setHeart(json))
      .catch((error) => console.error(error));
  };

  const SumCarts = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/sumcart.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setSumc(json))
      .catch((error) => console.error(error));
  };

  const AddCart = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/addcart.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: idp,
        uid: uid,
        item: count,
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

  const AddFavorite = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/favorite.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: idp,
        uid: uid,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        {
          Platform.OS === "ios"
            ? toastRef.current.show(responseJson, 3000)
            : ToastAndroid.show(responseJson, 2000);
        }
        //AsyncStorage.setItem("Email", email);
        favorite();

        // Showing response message coming from server after inserting records.
        //       Alert.alert(responseJson);
        // navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Productd();
    favorite();
    SumCarts();
    //Review();
    Reviews();
    Reviewp();
    
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
          text: "รายละเอียดสินค้า",
          style: { color: "#fff" },
        }}
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
              size={25}
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

      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
        <>
          <ViewSlider
            renderSlides={
              <>
                <View style={styles.viewBox}>
                  <Image
                    source={{
                      uri:
                        "https://sricharoen-narathiwat.ml/img_product/" +
                        pdata.img,
                    }}
                    style={{ height: 200, width: 200 }}
                  />
                </View>
              </>
            }
            style={styles.slider} //Main slider container style
            height={200} //Height of your slider
            slideCount={1} //How many views you are adding to slide
            dots={true} // Pagination dots visibility true for visibile
            dotActiveColor="#f37721" //Pagination dot active color
            dotInactiveColor="white" // Pagination do inactive color
            dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
            autoSlide={false} //The views will slide automatically
            slideInterval={3000} //In Miliseconds
          />
        </>
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <View style={styles.ProductnameButton}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontSize: 16, color: "#f37721" }}>
                  ฿{pdata.discount}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {pdata.discount !== pdata.price ? (
                    <Text
                      style={{
                        fontSize: 12,
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        color: "#000000",
                      }}
                    >
                      ฿{pdata.price}
                    </Text>
                  ) : null}
                  {pdata.discount !== pdata.price ? (
                    <Text style={{ left: 10, fontSize: 12 }}>
                      -{pdata.percent}%
                    </Text>
                  ) : null}
                </View>

                <Text style={{ bottom: 0, paddingTop: 5, paddingBottom: 5 }}>
                  {pdata.name}
                </Text>
                {pdata.discount !== pdata.price ? (
                  <View style={styles.flashsale}>
                    <Text style={styles.flashsaletext}>ลดราคา</Text>
                  </View>
                ) : null}
              </View>

              <View>
                {/* จุดเริ่มต้นไม่มีคะแนนดาว */}
                {/* <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "black",
                    paddingTop: 2,
                  }}
                >
                  ยังไม่มีคะแนน
                </Text> */}
                {/* สิ้นสุดไม่มีคะแนนดาว */}
                {/* จุดเริ่มต้นคะแนนดาว */}

                {reviews.star == 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 12,
                        color: "black",
                        paddingTop: 2,
                      }}
                    >
                      ยังไม่มีคะแนน
                    </Text>
                  </View>
                ) : reviews.star >= 5 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 4.5 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-half-full"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 4 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 3.5 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-half-full"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 3 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 2.5 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-half-full"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 2 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 1.5 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-half-full"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 1 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 0.5 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star-half-full"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : reviews.star >= 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                    <Icon
                      name="star-outline"
                      type="material-community"
                      color="#f37721"
                      size={15}
                    />
                  </View>
                ) : null}

                {/* สิ้นสุดคะแนนดาว */}
                {pdata.stock == 0 ? (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 10,
                      color: "red",
                      paddingTop: 5,
                      paddingBottom: 10,
                    }}
                  >
                    สินค้าหมด
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 10,
                      color: "grey",
                      paddingTop: 5,
                      paddingBottom: 10,
                    }}
                  >
                    คลังสินค้า: {pdata.stock}
                  </Text>
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => AddFavorite()}>
                      <Icon
                        type="material-community"
                        color={heart ? "red" : "#545454"}
                        name={heart ? "heart" : "heart-outline"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 10,
                        color: "grey",
                      }}
                    >
                      ถูกใจ
                    </Text>
                  </View>

                  <TouchableOpacity onPress={onShare}>
                    <Icon
                      name="share-variant"
                      type="material-community"
                      color="#545454"
                    />

                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 10,
                        color: "grey",
                      }}
                    >
                      แบ่งปัน
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View>
                <Text style={{ textAlign: "right", fontSize: 12 }}>
                  ยังไม่มีคะแนน
                </Text>
                <Text style={{ textAlign: "right", fontSize: 12 }}>
                  คลังสินค้า 99
                </Text>
              </View> */}
            </View>
            <View style={[styles.ProductdetailsButton, { marginTop: 5 }]}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontSize: 16, color: "#f37721" }}>
                  รายละเอียดสินค้า
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: Platform.OS === "ios" ? 12 : 10,
                  }}
                >
                  {pdata.detail}
                </Text>

                {/* <Text style={{ paddingTop: 5, fontSize: 12 }}>• งานก่ออิฐ</Text>
                <Text style={{ fontSize: 12 }}>• งานฉาบปูน </Text>
                <Text style={{ fontSize: 12 }}>• งานก่อสร้างอาคารขนาดเล็ก</Text> */}
              </View>
            </View>

            <View style={[styles.ProductfeatureButton, { marginTop: 5 }]}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#f37721",
                    paddingBottom: 15,
                  }}
                >
                  คุณสมบัติ
                </Text>
                {/* <Text style={{ paddingTop: 10, fontSize: 12 }}>
                  ดอกบัว ปูนเขียว ขนาด 50 กก.
                </Text> */}
                {pdata.model ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text style={[styles.textStyle, { textAlign: "left" }]}>
                        รุ่น
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.model}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.brand ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        แบรนด์
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.brand}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.width ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        ความกว้าง
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.width}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.length ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        ความยาว
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.length}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.height ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        ความสูง
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.height}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.weight ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        น้ำหนัก
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.weight} {pdata.weight_unit}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.color ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        สี
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.color}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {pdata.unit ? (
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        // borderRightColor: "#d1d1d1",
                        // borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                        borderBottomColor: "#d1d1d1",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        หน่วยนับ
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderLeftColor: "#d1d1d1",
                        borderLeftWidth: 1,
                        borderRightColor: "#d1d1d1",
                        borderRightWidth: 1,
                        borderTopColor: "#d1d1d1",
                        borderTopWidth: 1,
                        borderBottomColor: "#d1d1d1",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            textAlign: "left",
                          },
                        ]}
                      >
                        {pdata.unit}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={[styles.ProductreviewButton, { marginTop: 5 }]}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flexDirection: "row", paddingBottom: 5 }}>
                  <View style={{ width: "75%" }}>
                    <Text style={{ fontSize: 14, color: "#f37721" }}>
                      คะแนนสินค้า
                    </Text>
                    {reviews.star == 0 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "right",
                            fontSize: 12,
                            color: "black",
                            paddingTop: 2,
                          }}
                        >
                          ยังไม่มีคะแนน
                        </Text>
                      </View>
                    ) : reviews.star >= 5 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 4.5 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-half-full"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 4 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 3.5 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-half-full"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 3 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 2.5 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-half-full"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 2 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 1.5 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-half-full"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 1 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 0.5 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star-half-full"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : reviews.star >= 0 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 3,
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Icon
                          name="star-outline"
                          type="material-community"
                          color="#f37721"
                          size={15}
                        />
                        <Text style={{ fontSize: 12, color: "#f37721" }}>
                          {" "}
                          {reviews.star}/5{" "}
                          <Text style={{ fontSize: 12, color: "#000000" }}>
                            ({reviews.total} รีวิว)
                          </Text>
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      // backgroundColor: "red",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ReviewAll", { id: idp });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#f37721",
                          textAlign: "right",
                        }}
                      >
                        ดูทั้งหมด
                        <Icon
                          name="chevron-right"
                          type="material-community"
                          size={15}
                          // color='#ffffff'
                          color="#f37721"
                          top={4}
                          // marginHorizontal={"45%"}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={styles.hr}></View> */}
                {/* เริ่มต้น รีวิว */}
                {/* <Text style={{ paddingTop: 10, fontSize: 12 }}>
                  ยังไม่มีรีวิว
                </Text> */}
                {/* เริ่มต้น สิ้นสุด */}
                {/* เริ่มต้น รีวิว */}
                <FlatList
                  data={reviewp}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        // alignItems: "center",
                        paddingTop: 5,
                        backgroundColor: "#ffffff",
                        // borderRadius: 10,
                        borderTopWidth: 1,
                        borderTopColor: "#d1d1d1",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          paddingTop: 5,
                          // backgroundColor: "yellow",
                          width: "10%",
                          // height: "25%",
                        }}
                      >
                        {item.img == null ? (
                          <Avatar
                            style={styles.Logo}
                            source={require("../src/assets/avatar.png")}
                            overlayContainerStyle={{
                              borderRadius: 15,
                            }}
                          />
                        ) : (
                          <Avatar
                            style={styles.Logo}
                            source={{
                              uri:
                                "https://sricharoen-narathiwat.ml/" + item.img,
                            }}
                            overlayContainerStyle={{
                              borderRadius: 15,
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          // alignItems: "center",
                          paddingHorizontal: 5,
                          paddingTop: 5,
                          // backgroundColor: "pink",
                          width: "90%",
                          // height: "25%",
                        }}
                      >
                        <View style={{ paddingTop: 5, paddingBottom: 0 }}>
                          <Text style={{ fontSize: 10 }}>
                            {item.shows == "NO"
                              ? item.name.substr(0, 1) +
                                "*****" +
                                item.name.substr(-1)
                              : item.name}
                          </Text>
                        </View>
                        {item.star == 5 ? (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 3,
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                          </View>
                        ) : item.star == 4 ? (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 3,
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                          </View>
                        ) : item.star == 3 ? (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 3,
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                          </View>
                        ) : item.star == 2 ? (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 3,
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                          </View>
                        ) : item.star == 1 ? (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 3,
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="star"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                            <Icon
                              name="star-outline"
                              type="material-community"
                              color="#f37721"
                              size={15}
                            />
                          </View>
                        ) : null}
                        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                          <Text style={{ fontSize: 12 }}>{item.details}</Text>
                        </View>
                        {item.imgr ? (
                          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                            <Image
                              source={{
                                uri:
                                  "https://sricharoen-narathiwat.ml/" +
                                  item.imgr,
                              }}
                              style={{
                                width: 100,
                                height: 200,
                                resizeMode: "contain",
                              }}
                            />
                          </View>
                        ) : null}
                        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                          <Text style={{ fontSize: 10 }}>{item.date}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
                {/* เริ่มต้น สิ้นสุด */}
                {/* <View style={styles.hr}></View> */}

                <View
                  style={{
                    marginTop: 10,
                    alignItems: "center",
                    // backgroundColor: "red",
                    borderTopWidth: 1,
                    borderTopColor: "#d1d1d1",
                    paddingTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{ backgroundColor: "white" }}
                    onPress={() => {
                      navigation.navigate("ReviewAll", { id: idp });
                    }}
                  >
                    <Text style={{ color: "#f37721", fontSize: 12 }}>
                      ดูรีวิวทั้งหมด ({reviews.total}){""}
                      <Icon
                        name="chevron-right"
                        type="material-community"
                        size={18}
                        // color='#ffffff'
                        color="#f37721"
                        top={4}
                        // marginHorizontal={"45%"}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {pdata.stock == 0 ? (
        // <View
        //   style={[
        //     styles.AddtoCartButton,
        //     {
        //       backgroundColor: "#f37721",
        //       alignItems: "center",
        //       justifyContent: "center",
        //     },
        //   ]}
        // >
        //   {/* <View style={{ justifyContent: "center", }}> */}
        //   <Text style={{ textAlign: "center", color: "#ffffff" }}>
        //     สินค้าหมด
        //   </Text>
        //   {/* </View> */}
        // </View>
        <View style={styles.AddtoCartButton}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ left: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#d1d1d1" }}
              >
                {" "}
                -{" "}
              </Text>
            </View>
            <Text
              style={{
                left: 50,
                fontSize: 16,
                fontWeight: "bold",
                color: "#d1d1d1",
              }}
            >
              1
            </Text>
            <View style={{ left: 90 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#d1d1d1" }}
              >
                {" "}
                +{" "}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#f37721",
              alignItems: "center",
              justifyContent: "center", //ฟอนต์ เพิ่มตะกร้าสินค้า
              height: Platform.OS === "ios" ? "180%" : "208%",
              width: "210%",
              left: 15,
              borderRadius: 10,
            }}
            onPress={OutOfStockAlert}
          >
            <Icon
              name="cart-outline"
              type="material-community"
              color="#ffffff"
            />

            <Text
              style={{
                fontSize: Platform.OS === "ios" ? 14 : 12,
                color: "#fff",
              }}
            >
              สินค้าหมด
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.AddtoCartButton}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ left: 10 }}
              onPress={() => {
                count == 1 ? null : setCount(count - 1);
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}> - </Text>
            </TouchableOpacity>
            <Text style={{ left: 50, fontSize: 16, fontWeight: "bold" }}>
              {count}
            </Text>
            <TouchableOpacity
              style={{ left: 90 }}
              onPress={() => setCount(count + 1)}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}> + </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#f37721",
              alignItems: "center",
              justifyContent: "center", //ฟอนต์ เพิ่มตะกร้าสินค้า
              height: Platform.OS === "ios" ? "180%" : "208%",
              width: "210%",
              left: 15,
              borderRadius: 10,
            }}
            onPress={() => AddCart()}
          >
            <Icon
              name="cart-outline"
              type="material-community"
              color="#ffffff"
            />

            <Text
              style={{
                fontSize: Platform.OS === "ios" ? 14 : 12,
                color: "#fff",
              }}
            >
              เพิ่มลงตะกร้า
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
    // backgroundColor: "white",
    backgroundColor: "#e4e4e4",
  },
  container: {
    flex: 1,
    paddingBottom: "3%",
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
  Logo: {
    width: 25,
    height: 25,
    // left: 7.5,
    // top: 5,
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
    backgroundColor: "white",
    width: width,
    padding: 10,
    alignItems: "center",
    height: 200,
  },
  slider: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dotContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -12,
  },
  ProductnameButton: {
    display: "flex",
    flexDirection: "row",
    width: "96%",
    // height: "23%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  ProductdetailsButton: {
    display: "flex",
    flexDirection: "row",
    width: "96%",
    // height: "30%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  ProductfeatureButton: {
    display: "flex",
    flexDirection: "row",
    width: "96%",
    // height: "31%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  textStyle: {
    fontSize: 12,
    color: "black",
    flex: 1,
  },
  flashsale: {
    width: "44%",
    // height: "20%",
    backgroundColor: "#e7170b",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  flashsaletext: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  ProductreviewButton: {
    display: "flex",
    flexDirection: "row",
    width: "96%",
    // height: "16%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
    marginBottom: 6,
  },
  AddtoCartButton: {
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    bottom: 5,
    width: "96%",
    height: "8%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
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
  Cartcontainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 10,
  },
  Cartimage: {
    width: 30,
    height: 30,
  },
});
