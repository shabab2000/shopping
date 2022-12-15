import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./Home";
import Favorite from "./Favorite";
import Category from "./Category";
import Notification from "./Notification";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

export default function Index({ navigation }) {
  const [item, setItem] = useState("");
  const [items, setItems] = useState("");

  const Items = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/mycount.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setItem(json))
      .catch((error) => console.error(error));
  };

  const Noti = async () => {
    let uid = await AsyncStorage.getItem("uid");
    fetch("https://sricharoen-narathiwat.ml/noti.php?uid=" + uid)
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Items();
    Noti();
    const unsubscribe = navigation.addListener("focus", () => {
      {
        Items();
        Noti();
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Tab.Navigator
      // initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <MaterialCommunityIcons
                name={focused ? "home" : "home"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Favorite") {
            return (
              <MaterialCommunityIcons
                name={focused ? "heart" : "heart"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Category") {
            return (
              <MaterialCommunityIcons
                name={focused ? "widgets" : "widgets"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Notification") {
            return (
              <MaterialCommunityIcons
                name={focused ? "bell" : "bell"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <MaterialCommunityIcons
                name={focused ? "account" : "account"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#f37721",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "หน้าแรก",
          headerShown: false,
          tabBarLabel: "หน้าแรก",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: "รายการโปรด",
          headerShown: false,
          tabBarLabel: "รายการโปรด",
          tabBarBadge: item.ids > 0 ? item.ids : null,
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="heart" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          title: "หมวดหมู่",
          headerShown: false,
          tabBarLabel: "หมวดหมู่",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="widgets" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          title: "แจ้งเตือน",
          headerShown: false,
          tabBarLabel: "แจ้งเตือน",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="bell" color={color} size={size} />
          // ),
          tabBarBadge: items.ids > 0 ? items.ids : null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "โปรไฟล์",
          headerShown: false,
          tabBarLabel: "โปรไฟล์",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="account" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerprofile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e4e4",
    height: -50,
  },
});
