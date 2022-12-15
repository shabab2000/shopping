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
  FlatList
} from "react-native";
import { Badge, Icon, withBadge, Header, Avatar } from "react-native-elements";

export default function ReviewAll({ navigation,route }) {

  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState("");
  const [idp, setIdp] = useState(route.params.id);
  const [id, setId] = useState('all');

  const Review = () => {
    fetch("https://sricharoen-narathiwat.ml/review.php?name="+id+"&id="+idp)
      .then((response) => response.json())
      .then((json) => setReview(json))
      .catch((error) => console.error(error));
  };

  const GetId = async(id)=>{
    setId(id);
    fetch("https://sricharoen-narathiwat.ml/review.php?name="+id+"&id="+idp)
    .then((response) => response.json())
    .then((json) => setReview(json))
    .catch((error) => console.error(error));
  }

  const Reviews = () => {
    fetch("https://sricharoen-narathiwat.ml/review1.php?id=" + idp)
      .then((response) => response.json())
      .then((json) => setReviews(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Review();
    Reviews()
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
          text: "คะแนน",
          style: { color: "#fff" },
        }}
      />

      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
            paddingTop: 5,
            paddingBottom: 5,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              //   height: "40%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingTop: 5,
              paddingBottom: 2.5,
            }}
          >
            <TouchableOpacity
            onPress={()=>GetId('all')}
              style={{
                borderWidth: 1,
                borderColor: id=='all'?'#f37721':'#dfe4ea',
                backgroundColor: "#dfe4ea",
                width: "95%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 12 }}>ทั้งหมด</Text>
              <Text style={{ fontSize: 10 }}>({reviews.total})</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "white",
              //   height: "40%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingTop: 2.5,
              paddingBottom: 5,
            }}
          >
            <TouchableOpacity
            onPress={()=> GetId('5')}
              style={{
                borderWidth: 1,
                borderColor: id=='5'?'#f37721':'#dfe4ea',
                backgroundColor: "#dfe4ea",
                width: "18%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
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
              <View style={{ flexDirection: "row" }}>
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
              <Text style={{ fontSize: 10 }}>({reviews.star5})</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> GetId('4')}
              style={{
                borderWidth: 1,
                borderColor: id=='4'?'#f37721':'#dfe4ea',
                backgroundColor: "#dfe4ea",
                width: "18%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
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
              <Text style={{ fontSize: 10 }}>({reviews.star4})</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>GetId('3')}
              style={{
                borderWidth: 1,
                borderColor: id=='3'?'#f37721':'#dfe4ea',
                backgroundColor: "#dfe4ea",
                width: "18%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
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
              <Text style={{ fontSize: 10 }}>({reviews.star3})</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>GetId('2')}
              style={{
                borderWidth: 1,
                borderColor: id=='2'?'#f37721':'#dfe4ea',
                backgroundColor: "#dfe4ea",
                width: "18%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
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
              <Text style={{ fontSize: 10 }}>({reviews.star2})</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>GetId('1')}
              style={{
                borderWidth: 1,
                borderColor: id=='1'?'#f37721':'#dfe4ea',
                backgroundColor: "#dfe4ea",
                width: "18%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Icon
                name="star"
                type="material-community"
                color="#f37721"
                size={15}
              />
              <Text style={{ fontSize: 10 }}>({reviews.star1})</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
              data={review}
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
                  {item.img==null?
                    <Avatar
                      style={styles.Logo}
                      source={require('../src/assets/avatar.png')}
                      overlayContainerStyle={{
                        borderRadius: 15,
                      }}
                    />:
                    <Avatar
                      style={styles.Logo}
                      source={{
                    uri: "https://sricharoen-narathiwat.ml/" + item.img,
                  }}
                      overlayContainerStyle={{
                        borderRadius: 15,
                      }}
                    />
                  }
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
                      <Text style={{ fontSize: 10 }}>{item.shows =='NO'?item.name.substr(0, 1)+'*****'+item.name.substr(-1):item.name}</Text>
                    </View>
                    {item.star==5?
                    <View style={{
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
                    :item.star==4?
                    <View style={{
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
                    :item.star==3?
                    <View style={{
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
                    :item.star==2?
                    <View style={{
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
                    :item.star==1?
                    <View style={{
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
                    :null}
                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                      <Text style={{ fontSize: 12 }}>
                        {item.details}
                      </Text>
                    </View>
                    {item.imgr?
                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <Image
                    source={{ uri: "https://sricharoen-narathiwat.ml/" + item.imgr, }}
                    
                    style={{ width: 100, height: 200,    resizeMode: "contain",  }}
                  />
                     
                    </View>
                    :null}
                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                      <Text style={{ fontSize: 10 }}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              )}/>
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
  Logo: {
    width: 25,
    height: 25,
    // left: 7.5,
    // top: 5,
  },
});
