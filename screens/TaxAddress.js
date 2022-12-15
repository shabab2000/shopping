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
  RefreshControl,
  ToastAndroid
} from "react-native";
import {
  Icon,
  Avatar,
  ListItem,
  Divider,
  Header,
  CheckBox,
} from "react-native-elements";
import Toast from "react-native-easy-toast";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaxAddress({ navigation }) {
  const [taxAddressCheck, setTaxAddressCheck] = useState(false);

  const [address, setAddress] = useState(false);
  const [addressCheck, setAddressCheck] = useState(0);
  const [refreshing,setRefreshing]= useState(false);
  const [aid,setAid] = useState('');

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const toastRef = React.useRef();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAid()
    ListTaxAddress()
    wait(2000).then(() => setRefreshing(false));
    }, []);
console.log(aid)
    const GetAid = async() => {
      let aid = await AsyncStorage.getItem("tax");
      setAid(aid);
    }
    const ListTaxAddress = async() => {
      let uid = await AsyncStorage.getItem("uid");
      fetch("https://sricharoen-narathiwat.ml/taxaddress.php?uid="+uid)
        .then((response) => response.json())
        .then((json) => setAddress(json))
        .catch((error) => console.error(error));
    };
    const IdTaxAddress = async(id) => {
      //let uid = await AsyncStorage.getItem("aid");
    if(aid==null){
       AsyncStorage.setItem("tax", id);
      await setAddressCheck(id);
      //navigation.goBack();
    }else{
      await AsyncStorage.removeItem("tax");
      await setAddressCheck(0);
      await onRefresh();
     // navigation.goBack();
    }
       // navigation.goBack();
    }

  useEffect(() => {
    GetAid();
    ListTaxAddress()
    const unsubscribe = navigation.addListener('focus', () => {
      {onRefresh()}
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.containerstatus}>
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
          text: "ข้อมูลใบกำกับภาษี",
          style: { color: "#fff" },
        }}
      />
      {/* <View
        style={{
          backgroundColor: "#f37721",
          width: "100%",
          height: "7%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>การแจ้งเตือน</Text>
      </View> */}
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}>
        <View style={styles.container}>
          <View style={styles.space}></View>

          <View>
          <FlatList
              data={address}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
            <ListItem
            //   bottomDivider
            // onPress={() => navigation.push("Address")}
            >
              {/* <Icon
                name="map-marker-radius-outline"
                type="material-community"
                size={20}
                marginHorizontal={3}
              /> */}
              <CheckBox
                containerStyle={{ right: 8 }}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                checked={aid == item.id ? true : addressCheck == item.id ? true:false}
                checkedColor="#f37721"
                uncheckedColor="#f37721"
                onPress={() => IdTaxAddress(item.id)}              />

              <ListItem.Content style={{ right: 20 }}>
                {/* <ListItem.Title
                  style={{
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  ที่อยู่ในการจัดส่ง
                </ListItem.Title> */}
                
                <ListItem.Title
                  style={{
                    fontSize: 12,
                    width: "100%",
                    fontFamily: "sans-serif",
                  }}
                >{item.taxid?
                  'เลขประจำตัวผู้เสียภาษี' :'เลขบัตรประชาชน'} : {item.taxid ? item.taxid : item.idcard}
                </ListItem.Title>
                <ListItem.Title style={{ fontSize: 12, width: "100%" }}>
                  {item.name ? item.name : item.name_office}
                </ListItem.Title>
                <ListItem.Title style={{ fontSize: 12, width: "90%" }}>
                {item.address == 0? 'ใช้ที่อยู่เดียวกับที่จัดส่ง' : 
                  'ห้องเลขที่ '+item.room_no + ' ชั้นที่ '+item.floor+ ' อาคาร '+ item.building_name+ ' หมู่ '+ item.villageno + ' ซ.'+ item.lane +' หมู่บ้าน'+ item.villageorbuilding + ' ถ.'+item.road + ' ต.'+item.subdistrict+
                  ' อ.'+item.district+ ' จ.'+item.province+' '+ item.zipcode }
                </ListItem.Title>
                <View style={{ flexDirection: "row",paddingTop:10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditTaxAddress",{id:item.id})}
                    style={{
                      fontSize: 12,
                      //paddingRight: 10,
                      // width: "100%",
                      backgroundColor:'green',
                      borderRadius:5,
                      textDecorationLine: "underline",
                    }}
                  >
                   <Text style={{color:'#fff',textAlign:'center',paddingTop:3,paddingBottom:3,paddingLeft:7,paddingRight:7}}>แก้ไข</Text>
                  </TouchableOpacity>
                  <View style={{ padding:7 }}/>
                  <TouchableOpacity
                    // onPress={() => navigation.push("Address")}
                    onPress={() => {
                          Alert.alert(`ยืนยันลบที่อยู่นี้ ${item.name ? item.name : item.name_office}?`, "", [
                            { text: "ยกเลิก" },
                            {
                              text: "ใช่",
                              onPress: () => {
                                fetch(
                                  "https://sricharoen-narathiwat.ml/deladdresstax.php",
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
                                    if (responseJson === "ลบที่อยู่ใบกำกับภาษีสำเร็จ") {
                                      // Showing response message coming from server after inserting records.
                                      {
                                        Platform.OS === "ios"
                                          ? toastRef.current.show(
                                              responseJson,
                                              3000
                                            )
                                          : ToastAndroid.show(responseJson, 50);
                                      }
                                      onRefresh();
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

                    style={{
                      fontSize: 12,
                      // width: "100%",
                      backgroundColor:'red',
                      borderRadius:5,
                      textDecorationLine: "underline",
                    }}
                  >
                    <Text style={{color:'#fff',textAlign:'center',paddingTop:3,paddingBottom:3,paddingLeft:7,paddingRight:7}}>ลบ</Text>
                  </TouchableOpacity>
                </View>
              </ListItem.Content>
              {/* <ListItem.Chevron /> */}
            </ListItem>
              )}/>
            <View style={{ paddingTop: 2.5, paddingBottom: 2.5 }}></View>
            <ListItem
              bottomDivider
              onPress={() => navigation.push("AddTaxAddress")}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{ fontSize: 12, left: 30, color: "grey" }}
                >
                  เพิ่มที่อยู่ใบกำกับภาษี
                </ListItem.Title>
              </ListItem.Content>
              <Icon
                name="plus"
                type="material-community"
                size={20}
                color="grey"
              />
            </ListItem>
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: "center", paddingTop: 5, bottom: 5 }}>
        <TouchableOpacity style={styles.confirmButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.confirmButtonText}>ยืนยัน</Text>
        </TouchableOpacity>
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
    paddingBottom: 45,
  },
  goBackcontainer: {
    position: "absolute",
    left: 15,
  },
  goBackimage: {
    width: 30,
    height: 30,
  },
  space: {
    padding: 5,
  },
  confirmButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  confirmButton: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#FFC87F",
     backgroundColor: "#f37721",
    paddingVertical: 12,
    paddingHorizontal: 20,
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
});
