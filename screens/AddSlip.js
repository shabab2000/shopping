import React,{useState,useEffect} from "react";
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
import { Icon, Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { ProgressDialog } from 'react-native-simple-dialogs';


export default function AddSlip({ navigation,route }) {

  const { width, height } = Dimensions.get("window");
  const [loading,setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [views, setViews] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const ViewSlip = async() => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/viewslip.php?id="+route.params.id)
      .then((response) => response.json())
      .then((json) => setViews(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    ViewSlip();
  }, []);

  const handlePress =  async() => {
    try{
      let uid = await AsyncStorage.getItem("uid");
      if(image==null){
        Alert.alert('แจ้งเตือน!','กรุณาแนบสลิป!');
      }else{

          setLoading(true);
      let filename = image.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append('photo', { uri: image, name: filename, type,  });
      formData.append('id',route.params.id)
      formData.append('no_id',route.params.no_id)
      formData.append('uid',uid)

      fetch('https://sricharoen-narathiwat.ml/addslip.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'content-type': 'multipart/form-data',
        },
      }).then((response) => response.json())
                .then((responseJson) => {
                  setLoading(false);
                    Alert.alert('แจ้งเตือน!',responseJson);
                    navigation.goBack();
                }).catch((error) => {
                  console.log(error);
                });
              }
    } catch(e){
        console.log(e);
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
          text: "ดูสลิป",
          style: { color: "#fff" },
        }}
      />

      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={styles.container}>
          <View style={{ padding: 2.5 }}></View>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              height: 50,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 15,
              }}
            >
              หลักฐานการชำระเงิน เลขที่ใบสั่งซื้อ #{route.params.no_id}
            </Text>
            <View style={styles.hr}></View>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              //   backgroundColor: "red",
              //   width: "100%",
              //   height: height,
            }}
          >
            <TouchableOpacity
            onPress={()=> pickImage()}
              style={{
                width: "70%",
                height: 35,
                backgroundColor: "#f37721",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 15,
                borderRadius: 4,
              }}
            >
              <Icon
                name="paperclip"
                //   type="material-community"
                type="font-awesome"
                size={20}
                color="#ffffff"
              />
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 5,
                }}
              >
                แนบสลิป
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              //   backgroundColor: "green",
              //   width: "100%",
              //   height: height,
            }}
          >
            {/* เริ่มต้น ไม่มีรูปภาพ */}
            {/* <Text
              style={{
                color: "#000000",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
                //   backgroundColor: "red",
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              ไม่มีรูปภาพ
            </Text> */}
            {/* สิ้นสุด ไม่มีรูปภาพ */}

            {/* เริ่มต้น มีรูปภาพ */}
            <View
              style={{
                color: "#000000",
                fontSize: 14,
                fontWeight: "bold",
                alignItems: "center",
                //   backgroundColor: "red",
                paddingBottom: 15,
                paddingTop: 15,
              }}
            >{image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 250, height: 350,  }}
                  />
                ) :
                <Image
                    source={{ uri: 'https://sricharoen-narathiwat.ml/'+views.slip }}
                    style={{ width:250, height: 350,  }}
                  />
            }
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                paddingBottom: 15,
                // backgroundColor: "yellow",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 35,
                  //   backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                onPress={()=> handlePress()}
                  style={{
                    width: "70%",
                    height: 35,
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    flexDirection: "row",
                    borderRadius: 4,
                    // marginTop: 25,
                    // marginBottom: 25,
                  }}
                >
                  <Icon
                    name="upload"
                    type="material-community"
                    // type="font-awesome"
                    size={20}
                    color="#ffffff"
                  />
                  <Text
                    style={{
                      color: "#ffffff",
                      paddingLeft: 5,
                    }}
                  >
                    อัพโหลด
                  </Text>
                </TouchableOpacity>
              </View>
              
            </View>
            {/* สิ้นสุด มีรูปภาพ */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: "138%",
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
  hr: {
    width: "90%",
    alignSelf: "center",
    height: 2,
    backgroundColor: "#f37721",
    marginTop: 10,
    // marginLeft: 15,
  },
});
