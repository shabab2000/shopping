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
} from "react-native";
import { Icon, Header, ListItem, CheckBox } from "react-native-elements";

export default function RateAllProduct({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState("");

  const Orders = async () => {
    let id = route.params.id;
    fetch("https://sricharoen-narathiwat.ml/order_details.php?id=" + id)
      .then((response) => response.json())
      .then((json) => setOrder(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Orders();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        Orders();
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
          text: "ให้คะแนนสินค้า",
          style: { color: "#fff" },
        }}
        // rightComponent={{
        //   text: "ยืนยัน",
        //   style: { color: "#fff" },
        // }}
      />

      <View style={styles.container}>
        <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>

        <View
          style={
            {
              // backgroundColor: "red",
              // flexDirection: "row",
              // paddingHorizontal: 5,
            }
          }
        >
          {/* เริ่มต้น สินค้า */}
          <FlatList
            data={order}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  borderTopColor: "#d1d1d1",
                  borderTopWidth: 1,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "80%", backgroundColor: "white" }}>
                  <View
                    style={{
                      // backgroundColor: "green",
                      flexDirection: "row",
                      borderLeftWidth: 1,
                      borderLeftColor: "#d1d1d1",
                    }}
                  >
                    <View
                      style={{
                        // backgroundColor: "green",
                        width: "27%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                      }}
                    >
                      <Image
                        source={{
                          uri:
                            "https://sricharoen-narathiwat.ml/img_product/" +
                            item.p_img,
                        }}
                        style={{
                          height: 75,
                          width: 75,
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        // backgroundColor: "pink",
                        width: "73%",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                      }}
                    >
                      <Text style={{ fontSize: 12 }}>{item.p_name}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "20%",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderLeftColor: "#d1d1d1",
                    borderRightWidth: 1,
                    borderRightColor: "#d1d1d1",
                  }}
                >
                  {item.review == "NO" ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#f37721",
                        borderRadius: 2,
                        width: "90%",
                      }}
                      onPress={() => {
                        navigation.navigate("RateSelectProduct", {
                          id: item.id,
                          name: item.p_name,
                          img: item.p_img,
                          idp: item.id_p,
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          paddingVertical: 5,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        ให้คะแนน
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={{
                        fontSize: 10,
                        paddingVertical: 5,
                        textAlign: "center",
                        color: "#f37721",
                      }}
                    >
                      ให้คะแนนแล้ว
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
          {/* สิ้นสุด สินค้า */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingBottom: 600,
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
  textStyle: {
    fontSize: 14,
    color: "black",
    flex: 1,
  },
});
