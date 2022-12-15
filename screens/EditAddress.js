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
} from "react-native";
import { Icon, Avatar, ListItem, Divider, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditAddress({ navigation,route }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [villageNo, setVillageNo] = useState("");
  const [lane, setLane] = useState("");
  const [village, setVillage] = useState("");
  const [road, setRoad] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [data,setData] = useState('');

  const ListAddress = async() => {
    let uid = await AsyncStorage.getItem("uid");
    let id = route.params.id;
    fetch("https://sricharoen-narathiwat.ml/listeditaddress.php?uid="+uid+'&id='+id)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    ListAddress()
  }, []);
  const handlePress = async () => {
    try {
      let uid = await AsyncStorage.getItem("uid");
      let id = route.params.id;
        if (!data.name) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อผู้-สกุลผู้รับ!');
          }else if (!data.email) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมลผู้รับ!');
          }else if (!data.telephone) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ผู้รับ!');
          }else if (data.telephone.length!==10) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ผู้รับ 10 หลัก!');
          }else if (!data.houseno) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกบ้านเลขที่!');
          }else if (!data.villageno) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกหมู่!');
          }else if (!data.lane) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกซอย!');
          }else if (!data.villageorbuilding) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกหมู่บ้าน/อาคาร!');
          }else if (!data.road) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกถนน!');
          }else if (!data.subdistrict) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกตำบล!');
          }else if (!data.district) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกอำเภอ!');
          }else if (!data.province) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกจังหวัด!');
          }else if (!data.zipcode) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสไปรษณีย์!');
          }else{
            
        fetch('https://sricharoen-narathiwat.ml/editaddress.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name:data.name,
      email:data.email,
      telephone:data.telephone,
      houseNo:data.houseno,
      villageNo:data.villageno,
      lane:data.lane,
      village:data.villageorbuilding,
      road:data.road,
      province:data.province,
      district:data.district,
      subdistrict:data.subdistrict,
      zipcode:data.zipcode,
      uid:uid,
      id:id
    })
   
  }).then((response) => response.json()) 
        .then((responseJson) => {
  
          if(responseJson === 'แก้ไขที่อยู่สำเร็จ')
          {
            Alert.alert('แจ้งเตือน!',responseJson);
                navigation.goBack()
            //AsyncStorage.setItem("Email", email);
            }
          
          else{
           
            Alert.alert('แจ้งเตือน!',responseJson);
          }
  // Showing response message coming from server after inserting records.
   //       Alert.alert(responseJson);
         // navigation.navigate('Profile');
        }).catch((error) => {
          console.log(error);
        });

    }} catch (err) {
        console.log(err);
    }
}

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
          text: "ที่อยู่ในการจัดส่ง",
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.space}></View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              ชื่อผู้รับ<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              value={data ? data.name : ''}
              textContentType="name"
              color="#f37721"
              paddingHorizontal={15}
              autoCapitalize="none"
              onChangeText={(txt) => setData({...data, name: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              E-mail<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="emailAddress"
              value={data ? data.email : ''}
              color="#f37721"
              paddingHorizontal={15}
              autoCapitalize="none"
              onChangeText={(txt) => setData({...data, email: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              เบอร์โทรศัพท์<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="telephoneNumber"
              value={data ? data.telephone : ''}
              color="#f37721"
              paddingHorizontal={15}
              maxLength={10}
              minLength={10}
              keyboardType="phone-pad"
              onChangeText={(txt) => setData({...data, telephone: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              เลขที่<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.houseno : ''}
              paddingHorizontal={15}
              keyboardType="default"
              onChangeText={(txt) => setData({...data, houseno: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              หมู่<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.villageno : ''}
              paddingHorizontal={15}
              keyboardType="numeric"
              onChangeText={(txt) => setData({...data, villageno: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>ซอย</Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.lane : ''}
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(txt) => setData({...data, lane: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              หมู่บ้าน / อาคาร
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.villageorbuilding : ''}
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(txt) => setData({...data, villageorbuilding: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>ถนน</Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.road : ''}
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(txt) => setData({...data, road: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              แขวง/ตำบล<Text style={{ color: "red", fontSize: 6 }}> *</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.subdistrict : ''}
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(txt) => setData({...data, subdistrict: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              เขต/อำเภอ<Text style={{ color: "red", fontSize: 6 }}> *</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.district : ''}
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(txt) => setData({...data, district: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              จังหวัด<Text style={{ color: "red", fontSize: 6 }}> *</Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              value={data ? data.province : ''}
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(txt) => setData({...data, province: txt})}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 44,
              backgroundColor: "white",
            }}
          >
            <Text style={[styles.textStyle, { paddingLeft: 18 }]}>
              รหัสไปรษณีย์
              <Text style={{ color: "red", fontSize: 6 }}>
                {" "}
                * ใส่ตัวเลข 5 ตัว
              </Text>
            </Text>
            <TextInput
              style={styles.inputprofile}
              textContentType="addressCity"
              color="#f37721"
              paddingHorizontal={15}
              value={data ? data.zipcode : ''}
              maxLength={5}
              minLength={5}
              keyboardType="phone-pad"
              onChangeText={(txt) => setData({...data, zipcode: txt})}
            />
          </View>
          <Divider />

          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 7,
                  marginHorizontal: 3,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                * โปรดกรอกข้อมูลจริงให้ถูกต้อง
                เพราะมีผลต่อการจัดส่งสินค้าให้แก่ท่าน
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>

      <View style={{ alignItems: "center", paddingTop: 5, bottom: 5 }}>
        <TouchableOpacity style={styles.confirmButton} onPress={()=>handlePress()}>
          <Text style={styles.confirmButtonText}>ยืนยัน</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 10,
    color: "black",
    flex: 1,
    fontWeight: "bold",
  },
  inputprofile: {
    width: "55%",
    height: 35,
    backgroundColor: "#E4E4E4",
    borderRadius: 12,
    right: 10,
  },
  input: {
    width: "55%",
    height: 35,
    backgroundColor: "#E4E4E4",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
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
  nameButtonText: {
    marginHorizontal: 12,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    color: "#f37721",
  },
  nameButton: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
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
