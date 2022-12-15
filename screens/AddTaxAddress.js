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
import {
  Icon,
  Avatar,
  ListItem,
  Divider,
  Header,
  CheckBox,
} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddTaxAddress({ navigation }) {
  const [taxCheck1, setTaxCheck1] = useState(0);
  const [taxCheck2, setTaxCheck2] = useState(0);
  const [taxCheck3, setTaxCheck3] = useState(0);
  const [name_office, setName_office] = useState('');
  const [taxid, setTaxid] = useState('');
  const [branch_code, setBranch_code] = useState('');
  const [name, setName] = useState('');
  const [idcard, setIdcard] = useState('');
  const [room_no, setRoom_no] = useState('');
  const [floor, setFloor] = useState('');
  const [building_name, setBuilding_name] = useState('');
  const [houseno, setHouseno] = useState('');
  const [villageno, setVillageno] = useState('');
  const [lane, setLane] = useState('');
  const [villageorbuilding, setVillageorbuilding] = useState('');
  const [road, setRoad] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [zipcode, setZipcode] = useState('');

console.log(taxCheck1);

const handlePress = async () => {
  try {
    let uid = await AsyncStorage.getItem("uid");
    if(taxCheck1 == 0 ){
        if(taxCheck2==0){
            if(!name_office){
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อบริษัท!');
            }else if(!taxid){
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขประจำตัวภาษี!');
            }else{
              if(taxCheck3==0){
                fetch('https://sricharoen-narathiwat.ml/addtax1.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    types:taxCheck1,
                    office:taxCheck2,
                    name_office:name_office,
                    taxid:taxid,
                    address:taxCheck3,
                    uid:uid
                  })
                }).then((response) => response.json()) 
                      .then((responseJson) => {
                        if(responseJson === 'บันทึกข้อมูลสำเร็จ'){
                          Alert.alert('แจ้งเตือน!',responseJson);
                              navigation.goBack()
                        }else{ 
                          Alert.alert('แจ้งเตือน!',responseJson);
                        }
                      }).catch((error) => {
                        console.log(error);
                      });
              }else{
                fetch('https://sricharoen-narathiwat.ml/addtax2.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    types:taxCheck1,
                    office:taxCheck2,
                    name_office:name_office,
                    taxid:taxid,
                    address:taxCheck3,
                    room_no:room_no,
                    floor:floor,
                    building_name:building_name,
                    houseno:houseno,
                    villageno:villageno,
                    lane:lane,
                    villageorbuilding:villageorbuilding,
                    road:road,
                    province:province,
                    district:district,
                    subdistrict:subdistrict,
                    zipcode:zipcode,
                    uid:uid
                  })
                }).then((response) => response.json()) 
                      .then((responseJson) => {
                        if(responseJson === 'บันทึกข้อมูลสำเร็จ'){
                          Alert.alert('แจ้งเตือน!',responseJson);
                              navigation.goBack()
                        }else{ 
                          Alert.alert('แจ้งเตือน!',responseJson);
                        }
                      }).catch((error) => {
                        console.log(error);
                      });
              }
            }
        }else{
          if(!name_office){
            Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อบริษัท!');
        }else if(!taxid){
            Alert.alert('แจ้งเตือน!','กรุณากรอกเลขประจำตัวภาษี!');
        }else if(!branch_code){
          Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสสาขา!');
      }else{
          if(taxCheck3==0){
            fetch('https://sricharoen-narathiwat.ml/addtax3.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                types:taxCheck1,
                branch_code:branch_code,
                office:taxCheck2,
                name_office:name_office,
                taxid:taxid,
                address:taxCheck3,
                uid:uid
              })
            }).then((response) => response.json()) 
                  .then((responseJson) => {
                    if(responseJson === 'บันทึกข้อมูลสำเร็จ'){
                      Alert.alert('แจ้งเตือน!',responseJson);
                          navigation.goBack()
                    }else{ 
                      Alert.alert('แจ้งเตือน!',responseJson);
                    }
                  }).catch((error) => {
                    console.log(error);
                  });
          }else{
            fetch('https://sricharoen-narathiwat.ml/addtax4.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                types:taxCheck1,
                office:taxCheck2,
                branch_code:branch_code,
                name_office:name_office,
                taxid:taxid,
                address:taxCheck3,
                room_no:room_no,
                floor:floor,
                building_name:building_name,
                houseno:houseno,
                villageno:villageno,
                lane:lane,
                villageorbuilding:villageorbuilding,
                road:road,
                province:province,
                district:district,
                subdistrict:subdistrict,
                zipcode:zipcode,
                uid:uid
              })
            }).then((response) => response.json()) 
                  .then((responseJson) => {
                    if(responseJson === 'บันทึกข้อมูลสำเร็จ'){
                      Alert.alert('แจ้งเตือน!',responseJson);
                          navigation.goBack()
                    }else{ 
                      Alert.alert('แจ้งเตือน!',responseJson);
                    }
                  }).catch((error) => {
                    console.log(error);
                  });
          }
        }
        }
    }else{
      if(!name){
        Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อ-สกุล!');
    }else if(!idcard){
        Alert.alert('แจ้งเตือน!','กรุณากรอกเลขประจำตัวประชาชน!');
    }else{
      if(taxCheck3==0){
        fetch('https://sricharoen-narathiwat.ml/addtax5.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            types:taxCheck1,
            name:name,
            idcard:idcard,
            address:taxCheck3,
            uid:uid
          })
        }).then((response) => response.json()) 
              .then((responseJson) => {
                if(responseJson === 'บันทึกข้อมูลสำเร็จ'){
                  Alert.alert('แจ้งเตือน!',responseJson);
                      navigation.goBack()
                }else{ 
                  Alert.alert('แจ้งเตือน!',responseJson);
                }
              }).catch((error) => {
                console.log(error);
              });
      }else{
        fetch('https://sricharoen-narathiwat.ml/addtax6.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            types:taxCheck1,
            name:name,
            idcard:idcard,
            address:taxCheck3,
            room_no:room_no,
            floor:floor,
            building_name:building_name,
            houseno:houseno,
            villageno:villageno,
            lane:lane,
            villageorbuilding:villageorbuilding,
            road:road,
            province:province,
            district:district,
            subdistrict:subdistrict,
            zipcode:zipcode,
            uid:uid
          })
        }).then((response) => response.json()) 
              .then((responseJson) => {
                if(responseJson === 'บันทึกข้อมูลสำเร็จ'){
                  Alert.alert('แจ้งเตือน!',responseJson);
                      navigation.goBack()
                }else{ 
                  Alert.alert('แจ้งเตือน!',responseJson);
                }
              }).catch((error) => {
                console.log(error);
              });
      }
    }
    }
//       if (!profile.name) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อผู้-สกุลผู้รับ!');
//         }else if (!profile.email) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมลผู้รับ!');
//         }else if (!profile.telephone) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ผู้รับ!');
//         }else if (profile.telephone.length!==10) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ผู้รับ 10 หลัก!');
//         }else if (!houseNo) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกบ้านเลขที่!');
//         }else if (!villageNo) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกหมู่!');
//         }else if (!lane) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกซอย!');
//         }else if (!village) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกหมู่บ้าน/อาคาร!');
//         }else if (!road) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกถนน!');
//         }else if (!subdistrict) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกตำบล!');
//         }else if (!district) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกอำเภอ!');
//         }else if (!province) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกจังหวัด!');
//         }else if (!zipcode) {
//           Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสไปรษณีย์!');
//         }else{
          
//       fetch('https://sricharoen-narathiwat.ml/addaddress.php', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name:profile.name,
//     email:profile.email,
//     telephone:profile.telephone,
//     houseNo:houseNo,
//     villageNo:villageNo,
//     lane:lane,
//     village:village,
//     road:road,
//     province:province,
//     district:district,
//     subdistrict:subdistrict,
//     zipcode:zipcode,
//     uid:uid

//   })
 
// }).then((response) => response.json()) 
//       .then((responseJson) => {

//         if(responseJson === 'เพิ่มที่อยู่สำเร็จ')
//         {
//           Alert.alert('แจ้งเตือน!',responseJson);
//               navigation.goBack()
//           //AsyncStorage.setItem("Email", email);
//           }
        
//         else{
         
//           Alert.alert('แจ้งเตือน!',responseJson);
//         }
// // Showing response message coming from server after inserting records.
//  //       Alert.alert(responseJson);
//        // navigation.navigate('Profile');
//       }).catch((error) => {
//         console.log(error);
//       });

//   }
} catch (err) {
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
          text: "เพิ่มข้อมูลใบกำกับภาษี",
          style: { color: "#fff" },
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{ flexDirection: "row", width: "90%", alignSelf: "center" }}
          >
            <CheckBox
              // containerStyle={{ right: 17 }}
              checkedIcon="check-circle"
              uncheckedIcon="circle-o"
              checked={taxCheck1 == 0 ? true : false}
              checkedColor="#f37721"
              uncheckedColor="#f37721"
              onPress={() => setTaxCheck1(0)}
            />
            <Text style={{ top: 18, fontSize: 12 }}>นิติบุคคล</Text>
            <CheckBox
              // containerStyle={{ right: 17 }}
              checkedIcon="check-circle"
              uncheckedIcon="circle-o"
              checked={taxCheck1 == 1 ? true : false}
              checkedColor="#f37721"
              uncheckedColor="#f37721"
              onPress={() => setTaxCheck1(1)}
            />
            <Text style={{ top: 18, fontSize: 12 }}>บุคคลธรรมดา</Text>
          </View>
          {taxCheck1 == 0 ? (
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
              }}
            >
              <CheckBox
                // containerStyle={{ right: 17 }}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                checked={taxCheck2 == 0 ? true : false}
                checkedColor="#f37721"
                uncheckedColor="#f37721"
                onPress={() => setTaxCheck2(0)}
              />
              <Text style={{ top: 18, fontSize: 12 }}>สำนักงานใหญ่</Text>
              <CheckBox
                // containerStyle={{ right: 17 }}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                checked={taxCheck2 == 1 ? true : false}
                checkedColor="#f37721"
                uncheckedColor="#f37721"
                onPress={() => setTaxCheck2(1)}
              />
              <Text style={{ top: 18, fontSize: 12 }}>สาขา</Text>
            </View>
          ) : null}
          {taxCheck1 == 0 ? (
            <View
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  width: "96%",
                  alignSelf: "center",
                  fontSize: 10,
                }}
              >
                ชื่อบริษัท หน่วยงาน หรือองค์กร
              </Text>
              <TextInput
                style={{
                  top: 5,
                  width: "96%",
                  height: 44,
                  backgroundColor: "white",
                  borderColor: "#f37721",
                  borderWidth: 1,
                  // borderRadius: 0,
                  paddingHorizontal: 10,
                  alignSelf: "center",
                  fontSize: 12,
                }}
                placeholder={"ชื่อบริษัท หน่วยงาน หรือองค์กร"}
                textContentType="name"
                keyboardType="default"
                autoCapitalize={false}
                onChangeText={(txt) => setName_office(txt)}
              />
              {taxCheck2 == 1 ? (
                <View>
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
                  <Text
                    style={{
                      width: "96%",
                      alignSelf: "center",
                      fontSize: 10,
                    }}
                  >
                    รหัสสาขา
                  </Text>
                  <TextInput
                    style={{
                      top: 5,
                      width: "96%",
                      height: 44,
                      backgroundColor: "white",
                      borderColor: "#f37721",
                      borderWidth: 1,
                      // borderRadius: 0,
                      paddingHorizontal: 10,
                      alignSelf: "center",
                      fontSize: 12,
                    }}
                    placeholder={"รหัสสาขา"}
                    textContentType="name"
                    keyboardType="default"
                    autoCapitalize={false}
                    onChangeText={(txt) => setBranch_code(txt)}
                  />
                </View>
              ) : null}
              <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
              <Text
                style={{
                  width: "96%",
                  alignSelf: "center",
                  fontSize: 10,
                }}
              >
                เลขประจำตัวผู้เสียภาษี
              </Text>
              <TextInput
                style={{
                  top: 5,
                  width: "96%",
                  height: 44,
                  backgroundColor: "white",
                  borderColor: "#f37721",
                  borderWidth: 1,
                  // borderRadius: 0,
                  paddingHorizontal: 10,
                  alignSelf: "center",
                  fontSize: 12,
                }}
                placeholder={"เลขประจำตัวผู้เสียภาษี"}
                textContentType="name"
                keyboardType="numeric"
                autoCapitalize={false}
                onChangeText={(txt) => setTaxid(txt)}
              />
            </View>
          ) : null}
          {taxCheck1 == 1 ? (
            <View
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  width: "96%",
                  alignSelf: "center",
                  fontSize: 10,
                }}
              >
                ชื่อ-นามสกุล
              </Text>
              <TextInput
                style={{
                  top: 5,
                  width: "96%",
                  height: 44,
                  backgroundColor: "white",
                  borderColor: "#f37721",
                  borderWidth: 1,
                  // borderRadius: 0,
                  paddingHorizontal: 10,
                  alignSelf: "center",
                  fontSize: 12,
                }}
                placeholder={"ชื่อ-นามสกุล"}
                textContentType="name"
                keyboardType="default"
                autoCapitalize={false}
                onChangeText={(txt) => setName(txt)}
              />
              <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
              <Text
                style={{
                  width: "96%",
                  alignSelf: "center",
                  fontSize: 10,
                }}
              >
                เลขบัตรประชาชน / เลขประจำตัวผู้เสียภาษี
              </Text>
              <TextInput
                style={{
                  top: 5,
                  width: "96%",
                  height: 44,
                  backgroundColor: "white",
                  borderColor: "#f37721",
                  borderWidth: 1,
                  // borderRadius: 0,
                  paddingHorizontal: 10,
                  alignSelf: "center",
                  fontSize: 12,
                }}
                placeholder={"เลขบัตรประชาชน / เลขประจำตัวผู้เสียภาษี"}
                textContentType="name"
                keyboardType="numeric"
                maxLength={13}
                minLength={13}
                autoCapitalize={false}
                onChangeText={(txt) => setIdcard(txt)}
              />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "column",
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                // containerStyle={{ right: 17 }}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                checked={taxCheck3 == 0 ? true : false}
                checkedColor="#f37721"
                uncheckedColor="#f37721"
                onPress={() => setTaxCheck3(0)}
              />
              <Text style={{ top: 18, fontSize: 12 }}>
                ใช้ที่อยู่เดียวกับที่จัดส่ง
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                // containerStyle={{ right: 17 }}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                checked={taxCheck3 == 1 ? true : false}
                checkedColor="#f37721"
                uncheckedColor="#f37721"
                onPress={() => setTaxCheck3(1)}
              />
              <Text style={{ top: 18, fontSize: 12 }}>ที่อยู่ใบกำกับภาษี</Text>
            </View>
          </View>
          {taxCheck3 == 1 ?
          <View
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              ห้องเลขที่
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"ห้องเลขที่"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setRoom_no(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              ชั้นที่
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"ชั้นที่"}
              textContentType="name"
              keyboardType="number-pad"
              autoCapitalize={false}
              onChangeText={(txt) => setFloor(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              ชื่ออาคาร
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"ชื่ออาคาร"}
              textContentType="name"
              keyboardType="email-address"
              autoCapitalize={false}
              onChangeText={(txt) => setBuilding_name(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              เลขที่
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"เลขที่"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setHouseno(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              หมู่ที่
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"หมู่ที่"}
              textContentType="name"
              keyboardType="numeric"
              autoCapitalize={false}
              onChangeText={(txt) => setVillageno(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              หมู่บ้าน
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"หมู่บ้าน"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setVillageorbuilding(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              ซอย
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"ซอย"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setLane(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              ถนน
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"ถนน"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setRoad(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              แขวง/ตำบล
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"แขวง/ตำบล"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setSubdistrict(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              เขต/อำเภอ
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"เขต/อำเภอ"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setDistrict(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              จังหวัด
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"จังหวัด"}
              textContentType="name"
              keyboardType="default"
              autoCapitalize={false}
              onChangeText={(txt) => setProvince(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            <Text
              style={{
                width: "96%",
                alignSelf: "center",
                fontSize: 10,
              }}
            >
              รหัสไปรษณีย์
            </Text>
            <TextInput
              style={{
                top: 5,
                width: "96%",
                height: 44,
                backgroundColor: "white",
                borderColor: "#f37721",
                borderWidth: 1,
                // borderRadius: 0,
                paddingHorizontal: 10,
                alignSelf: "center",
                fontSize: 12,
              }}
              placeholder={"รหัสไปรษณีย์"}
              textContentType="name"
              keyboardType="numeric"
              autoCapitalize={false}
              maxLength={5}
              onChangeText={(txt) => setZipcode(txt)}
            />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
            </View>
:null}
            <Text
              style={{
                fontSize: 10,
                top: 15,
                width: "96%",
                alignSelf: "center",
                color: "red",
              }}
            >
              * กรุณาระบุข้อมูลตามที่ท่านต้องการ
              กรณีไม่มีข้อมูลให้เว้นว่างไม่ต้องใส่ - (ขีด)
            </Text>
          
        </View>
      </ScrollView>
      <View style={{ alignItems: "center", paddingTop: 5, bottom: 5 }}>
        <TouchableOpacity style={styles.confirmButton} onPress={()=> handlePress() }>
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
  inputPreview: {
    width: "96%",
    height: 44,
    backgroundColor: "white",
    // borderRadius: 6,
    paddingHorizontal: 10,
    alignSelf: "center",
    top: 5,
    fontSize: 12,
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
