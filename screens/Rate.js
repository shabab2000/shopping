import React from "react";
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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Ratednot from "./Ratednot";
import Ratedsuccess from "./Ratedsuccess";

const Tab = createMaterialTopTabNavigator();

export default function Rate({ navigation }) {
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
          text: "รายการคำสั่งซื้อของฉัน",
          style: { color: "#fff" },
        }}
      />
      <Tab.Navigator
        initialRouteName="Ratednot"
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#f8f8f8",
          tabBarStyle: {
            backgroundColor: "#f37721",
          },
          tabBarLabelStyle: {
            textAlign: "center",
            fontSize: 10,
          },
          tabBarIndicatorStyle: {
            borderBottomColor: "#ffffff",
            borderBottomWidth: 2,
            width: 180,
            left: "0%",
          },
        }}
      >
        <Tab.Screen
          name="Ratednot"
          component={Ratednot}
          options={{
            title: "ยังไม่ได้ให้คะแนน",
            headerShown: false,
            tabBarLabel: "ยังไม่ได้ให้คะแนน",

            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="heart" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="Ratedsuccess"
          component={Ratedsuccess}
          options={{
            title: "คะแนนของฉัน",
            headerShown: false,
            tabBarLabel: "คะแนนของฉัน",
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="heart" color={color} size={size} />
            // ),
          }}
        />
      </Tab.Navigator>
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
});
