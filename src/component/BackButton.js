import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.goBackcontainer}>
      <Icon
        style={styles.goBackimage}
        name="angle-left"
        type="font-awesome"
        size={30}
        color="#000"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  goBackcontainer: {
    position: "absolute",
    top: 5 + getStatusBarHeight(),
    left: 15,
  },
  goBackimage: {
    width: 25,
    height: 25,
  },
});
