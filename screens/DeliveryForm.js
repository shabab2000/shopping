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
  RefreshControl,
  ScrollView,
  Button,
} from "react-native";
import { Icon, Avatar, ListItem, Divider, Header } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeliveryForm({ navigation }) {

  const [checked, setChecked] = React.useState("");
  const [refreshing,setRefreshing]= useState(false);
  const [did, setDid] = useState('');
  const [delivery,setDelivery] = useState('');
  const [address, setAddress] = useState('');
  const [show, setShow] = useState('');

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetDid()
    Delivery()
    ListAddress()
    wait(2000).then(() => setRefreshing(false));
    }, []);

    const Delivery = async () => {
      let uid = await AsyncStorage.getItem("uid");
      fetch("https://sricharoen-narathiwat.ml/check_delivery.php?uid=" + uid)
        .then((response) => response.json())
        .then((json) => setDelivery(json))
        .catch((error) => console.error(error));
    };

    const ListAddress = async () => {
      let id = await AsyncStorage.getItem("aid");
      fetch("https://sricharoen-narathiwat.ml/myaddress.php?id=" + id)
        .then((response) => response.json())
        .then((json) => {
          if(json.zipcode==96000){
            setShow(true);
          }else if(json.zipcode==96110){
            setShow(true);
          }else if(json.zipcode==96150){
            setShow(true);
          }else if(json.zipcode==96170){
            setShow(true);
          }else if(json.zipcode==96180){
            setShow(true);
          }else if(json.zipcode==94110){
            setShow(true);
          }else if(json.zipcode==94230){
            setShow(true);
          }else if(json.zipcode==94220){
            setShow(true);
          }else if(json.zipcode==95140){
            setShow(true);
          }else{
            setShow(false);
          }
        })
        .catch((error) => console.error(error));
    };

  const GetDid = async() => {
    let did = await AsyncStorage.getItem("did");
    setDid(did);
  }

  const IdDelivery = async(id) => {
    //let uid = await AsyncStorage.getItem("aid");
    setChecked(id)
    AsyncStorage.setItem("did", id);
    onRefresh()
    //navigation.goBack();
  }

  useEffect(() => {
    GetDid();
    Delivery();
    ListAddress();
    const unsubscribe = navigation.addListener('focus', () => {
      {onRefresh()}
    });
    return unsubscribe;
  }, []);

  console.log(address.zipcode)

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
          text: "รูปแบบการจัดส่ง",
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
        {show ==true?
          <ListItem
            bottomDivider

            // onPress={() => navigation.push("DeliveryForm")}
            // containerStyle={{ backgroundColor: "#f37721" }}
          >
            <View style={{ right: 5 }}>
              <RadioButton
                value={did}
                status={did == 'จัดส่ง'? 'checked' : checked == 'จัดส่ง'? 'checked':'unchecked'}
                onPress={() => IdDelivery('จัดส่ง')}
                color="#f37721"
              />
            </View>
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 12,
                  width: "100%",
                  right: 5,
                  // color: "#ffffff",
                }}
              >
                ทางร้านเป็นผู้จัดส่ง รับสินค้าภายใน 1 - 2 วันทำการ
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          :null}
          <ListItem
            bottomDivider
            // onPress={() => navigation.push("DeliveryForm")}
            // containerStyle={{ backgroundColor: "#f37721" }}
          >
            <View style={{ right: 5 }}>
              <RadioButton
                value={did}
                status={did == 'รับเอง'? 'checked' : checked == 'รับเอง'? 'checked':'unchecked'}
                onPress={() => IdDelivery('รับเอง')}
                color="#f37721"
              />
            </View>
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 12,
                  width: "100%",
                  right: 5,
                  // color: "#ffffff",
                }}
              >
                รับสินค้าที่สำนักงานใหญ่ โคกเคียน นราธิวาส{" "}
                <Text style={{ color: "#f37721", fontWeight: "bold" }}>
                  :ฟรี{" "}
                </Text>
                ตั้งแต่เวลา 08.00-17.00 น. (วันเสาร์-วันพฤหัสบดี) | แจ้งชำระเงินภายใน 16.00 น.{" "}
                <ListItem.Title
                  style={{
                    fontSize: 12,
                    width: "100%",
                    right: 5,
                    color: "red",
                  }}
                >
                  *รอรับสินค้าหลังจากแจ้งชำระเงิน 30 นาที
                  *กรณีลูกค้าชำระเงินหลังเวลา 16.00 น.
                  สามารถรับสินค้าที่สำนักงานใหญ่ในวันถัดไป
                </ListItem.Title>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          {delivery==false?
          <ListItem
            bottomDivider

            // onPress={() => navigation.push("DeliveryForm")}
            // containerStyle={{ backgroundColor: "#f37721" }}
          >
            <View style={{ right: 5 }}>
              <RadioButton
                value={did}
                status={did == 'จัดส่งสาธารณะ'? 'checked' : checked == 'จัดส่งสาธารณะ'? 'checked':'unchecked'}
                onPress={() => IdDelivery('จัดส่งสาธารณะ')}
                color="#f37721"
              />
            </View>
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 12,
                  width: "100%",
                  right: 5,
                  // color: "#ffffff",
                }}
              >
                จัดส่งสินค้าโดยขนส่งเอกชน
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          :null}
        </View>
      </ScrollView>

      <View style={{ alignItems: "center", paddingTop: 5, bottom: 5 }}>
        <TouchableOpacity style={styles.confirmButton} onPress={()=> navigation.goBack()}>
          <Text style={styles.confirmButtonText}>ดำเนินการต่อ</Text>
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
    paddingBottom: 30,
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
    // backgroundColor: "#90c6a4",
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
