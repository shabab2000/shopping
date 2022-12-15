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

export default function AddAddress({ navigation }) {

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
  const [profile,setProfile] = useState('');

  const Profile = async() => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/profile.php?uid="+uid)
      .then((response) => response.json())
      .then((json) => setProfile(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Profile()
  }, []);
  const handlePress = async () => {
    try {
      let uid = await AsyncStorage.getItem("uid");
        if (!profile.name) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อผู้-สกุลผู้รับ!');
          }else if (!profile.email) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมลผู้รับ!');
          }else if (!profile.telephone) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ผู้รับ!');
          }else if (profile.telephone.length!==10) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ผู้รับ 10 หลัก!');
          }else if (!houseNo) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกบ้านเลขที่!');
          }else if (!villageNo) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกหมู่!');
          }else if (!lane) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกซอย!');
          }else if (!village) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกหมู่บ้าน/อาคาร!');
          }else if (!road) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกถนน!');
          }else if (!subdistrict) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกตำบล!');
          }else if (!district) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกอำเภอ!');
          }else if (!province) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกจังหวัด!');
          }else if (!zipcode) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสไปรษณีย์!');
          }else{
            
        fetch('https://sricharoen-narathiwat.ml/addaddress.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name:profile.name,
      email:profile.email,
      telephone:profile.telephone,
      houseNo:houseNo,
      villageNo:villageNo,
      lane:lane,
      village:village,
      road:road,
      province:province,
      district:district,
      subdistrict:subdistrict,
      zipcode:zipcode,
      uid:uid

    })
   
  }).then((response) => response.json()) 
        .then((responseJson) => {
  
          if(responseJson === 'เพิ่มที่อยู่สำเร็จ')
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
              value={profile ? profile.name : ''}
              textContentType="name"
              color="#f37721"
              paddingHorizontal={15}
              autoCapitalize="none"
              onChangeText={(txt) => setProfile({...profile, name: txt})}
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
              value={profile ? profile.email : ''}
              color="#f37721"
              paddingHorizontal={15}
              autoCapitalize="none"
              onChangeText={(txt) => setProfile({...profile, email: txt})}
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
              value={profile ? profile.telephone : ''}
              color="#f37721"
              paddingHorizontal={15}
              maxLength={10}
              minLength={10}
              keyboardType="phone-pad"
              onChangeText={(txt) => setProfile({...profile, telephone: txt})}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(houseNo) => setHouseNo(houseNo)}
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
              paddingHorizontal={15}
              keyboardType="numeric"
              onChangeText={(villageNo) => setVillageNo(villageNo)}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(lane) => setLane(lane)}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(village) => setVillage(village)}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(road) => setRoad(road)}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(subdistrict) => setSubdistrict(subdistrict)}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(district) => setDistrict(district)}
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
              paddingHorizontal={15}
              keyboardType="numbers-and-punctuation"
              onChangeText={(province) => setProvince(province)}
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
              maxLength={5}
              minLength={5}
              keyboardType="phone-pad"
              onChangeText={(zipcode) => setZipcode(zipcode)}
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
