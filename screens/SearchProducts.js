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
} from "react-native";
import { Icon, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchProducts({ navigation }) {
  const [sumc, setSumc] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [product, setProduct] = useState("");

  const SumCarts = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/sumcart.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setSumc(json))
      .catch((error) => console.error(error));
  };
  const Products = () => {
    fetch("https://sricharoen-narathiwat.ml/products.php")
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
    onRefresh();
    Products();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        onRefresh();
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
          <View style={styles.searchView}>
            <View style={styles.inputView}>
              {search.length === 0 ? (
                <View>
                  <Icon name="search" size={24} color="#333" />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SelectProducts", {
                      name: search,
                      id: 0,
                    });
                  }}
                >
                  <Icon name="search" size={24} color="#333" />
                </TouchableOpacity>
              )}

              <TextInput
                defaultValue={search}
                style={styles.input}
                placeholder="ค้นหาสินค้าที่ต้องการ"
                textContentType="name"
                onSubmitEditing={() =>
                  navigation.navigate("SelectProducts", { name: search, id: 0 })
                }
                onChangeText={(text) => {
                  setSearch(text);
                  if (text === "") {
                    return setFilteredUsers([]);
                  }
                  const filtered_users = product.filter((user) =>
                    user.name.toLowerCase().startsWith(text.toLowerCase())
                  );
                  setFilteredUsers(filtered_users);
                }}
                returnKeyType="search"
              />
              {search.length === 0 ? null : (
                <TouchableOpacity
                  onPress={() => {
                    setSearch("");
                    setFilteredUsers([]);
                  }}
                >
                  <Icon name="cancel" size={20} color="#333" />
                </TouchableOpacity>
              )}

              {/* <Icon name="search" type="font-awesome" size={15} color="gray" />
            <TextInput
              style={{ left: 5 }}
              onChangeText={setSearch}
              // value={number}

              placeholder="ค้นหาสินค้าที่ต้องการ"
              keyboardType="email-address"
            /> */}
            </View>
          </View>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
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
          {filteredUsers.length > 0 ? (
            <ScrollView>
              {filteredUsers.map((product) => (
                <TouchableOpacity
                  style={styles.userCard}
                  onPress={() => {
                    navigation.navigate("Products", { id: product.id });
                  }}
                >
                  <View style={styles.userCardRight}>
                    <Text style={{ fontSize: 14 }}>{product.name} </Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View style={{ height: 50 }}></View>
            </ScrollView>
          ) : search.length > 0 ? (
            <View style={styles.messageBox}>
              <Text style={{ textAlign: "center", paddingTop: 10 }}>
                ไม่พบสินค้า
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    width: "115%",
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    // height: 40,
  },
  // inputView: {

  //   height: 40,
  //   backgroundColor: "#ffffff",
  //   // backgroundColor: "#dfe4ea",
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  containerstatusbar: {
    flex: 1,
    backgroundColor: "#e4e4e4",
  },
  container: {
    flex: 1,
    //paddingBottom: 638,

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
  userCard: {
    backgroundColor: "#fafafa",
    paddingVertical: 6,
    paddingHorizontal: 6,
    //borderRadius: 10,
    //marginTop: 10,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userCardRight: {
    paddingHorizontal: 10,
  },
  messageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
