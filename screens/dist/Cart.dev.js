// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   Keyboard,
//   StatusBar,
//   Alert,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import { Icon, Header } from "react-native-elements";
// export default function Cart({ navigation }) {
//   return (
//     <View>
//       <StatusBar animated={true} />
//       <Header
//         placement="center"
//         backgroundColor="#f37721"
//         leftComponent={
//           <TouchableOpacity
//             onPress={() => {
//               navigation.replace("Index");
//             }}
//             style={styles.goBackcontainer}
//           >
//             <Icon
//               style={styles.goBackimage}
//               name="angle-left"
//               type="font-awesome"
//               size={30}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         }
//         centerComponent={{
//           text: "ตะกร้าสินค้า",
//           style: { color: "#fff" },
//         }}
//       />
//       <ScrollView>
//         <View style={styles.container}></View>
//       </ScrollView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   goBackcontainer: {
//     position: "absolute",
//     left: 15,
//     top: -3,
//   },
//   goBackimage: {
//     width: 30,
//     height: 30,
//   },
// });
"use strict";