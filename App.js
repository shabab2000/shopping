import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Forgotpassword from "./screens/Forgotpassword";
import Index from "./screens/Index";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Cart from "./screens/Cart";
import Makeorder from "./screens/Makeorder";
import AddressDelivery from "./screens/AddressDelivery";
import DeliveryForm from "./screens/DeliveryForm";
import NeedTax from "./screens/NeedTax";
import PaymentChannel from "./screens/PaymentChannel";
import Ordersuccess from "./screens/Ordersuccess";
import ContactUs from "./screens/ContactUs";
import Otp from "./screens/Otp";
import Resetpassword from "./screens/Resetpassword";
import Address from "./screens/Address";
import TaxAddress from "./screens/TaxAddress";
import FAQ from "./screens/FAQ";
import Feedback from "./screens/Feedback";
import Methodofpayment from "./screens/Methodofpayment";
import Deliveryterms from "./screens/Deliveryterms";
import Products from "./screens/Products";
import OrderList from "./screens/OrderList";
import OrderList1 from "./screens/OrderList1";
import OrderList2 from "./screens/OrderList2";
import OrderList3 from "./screens/OrderList3";
import SearchProducts from "./screens/SearchProducts";
import SelectProducts from "./screens/SelectProducts";
import AddAddress from "./screens/AddAddress";
import EditAddress from "./screens/EditAddress";
import AddTaxAddress from "./screens/AddTaxAddress";
import EditTaxAddress from "./screens/EditTaxAddress";
import AddSlip from "./screens/AddSlip";
import Details_order from "./screens/Details_order";
import Rate from "./screens/Rate";
import ReviewAll from "./screens/ReviewAll";
import RateAllProduct from "./screens/RateAllProduct";
import RateSelectProduct from "./screens/RateSelectProduct";

const Stack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={horizontalAnimation}>
        {/* <Stack.Screen name='Loading' component={Loading} options={{ 
        headerShown: false,
        title: 'โหลด',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: "เข้าสู่ระบบ",
            headerStyle: {
              backgroundColor: "#ffbb3b",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: "สมัครสมาชิก",
            headerStyle: {
              backgroundColor: "#48D1CC",
            },
          }}
        />
        <Stack.Screen
          name="Forgotpassword"
          component={Forgotpassword}
          options={{
            headerShown: false,
            title: "ลืมรหัสผ่าน",
            headerStyle: {
              backgroundColor: "#48D1CC",
            },
          }}
        />

        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{
            headerShown: false,
            title: "Otp",
            headerStyle: {
              backgroundColor: "#48D1CC",
            },
          }}
        />

        <Stack.Screen
          name="Resetpassword"
          component={Resetpassword}
          options={{
            headerShown: false,
            title: "รีเซ็ตรหัสผ่าน",
            headerStyle: {
              backgroundColor: "#48D1CC",
            },
          }}
        />
        <Stack.Screen
          name="Index"
          component={Index}
          options={{
            headerShown: false,
            title: "หน้าแรก",
            headerStyle: {
              backgroundColor: "#48D1CC",
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            title: "โปรไฟล์",
            headerStyle: {
              backgroundColor: "#48D1CC",
            },
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
            title: "แก้ไขโปรไฟล์",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            title: "ตะกร้าสินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Makeorder"
          component={Makeorder}
          options={{
            headerShown: false,
            title: "ทำการสั่งซื้อสินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="AddressDelivery"
          component={AddressDelivery}
          options={{
            headerShown: false,
            title: "ที่อยู่ในการจัดส่ง",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="NeedTax"
          component={NeedTax}
          options={{
            headerShown: false,
            title: "ต้องการใบกำกับภาษี",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="DeliveryForm"
          component={DeliveryForm}
          options={{
            headerShown: false,
            title: "รูปแบบการจัดส่ง",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="PaymentChannel"
          component={PaymentChannel}
          options={{
            headerShown: false,
            title: "ช่องทางการชำระเงิน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="Ordersuccess"
          component={Ordersuccess}
          options={{
            headerShown: false,
            title: "คำสั่งซื้อสำเร็จ",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            headerShown: false,
            title: "ที่อยู่จัดส่ง",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="TaxAddress"
          component={TaxAddress}
          options={{
            headerShown: false,
            title: "ที่อยู่ใบกำกับภาษี",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerShown: false,
            title: "ติชมบริการ",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Methodofpayment"
          component={Methodofpayment}
          options={{
            headerShown: false,
            title: "วิธีการชำระเงิน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Deliveryterms"
          component={Deliveryterms}
          options={{
            headerShown: false,
            title: "เงื่อนไขการจัดส่ง",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{
            headerShown: false,
            title: "คำถามที่พบบ่อย",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            headerShown: false,
            title: "ติดต่อเรา",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerShown: false,
            title: "สินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="OrderList"
          component={OrderList}
          options={{
            headerShown: false,
            title: "รายการคำสั่งซื้อของฉัน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="OrderList1"
          component={OrderList1}
          options={{
            headerShown: false,
            title: "รายการคำสั่งซื้อของฉัน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="OrderList2"
          component={OrderList2}
          options={{
            headerShown: false,
            title: "รายการคำสั่งซื้อของฉัน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="OrderList3"
          component={OrderList3}
          options={{
            headerShown: false,
            title: "รายการคำสั่งซื้อของฉัน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="SearchProducts"
          component={SearchProducts}
          options={{
            headerShown: false,
            title: "ค้นหาสินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="SelectProducts"
          component={SelectProducts}
          options={{
            headerShown: false,
            title: "เลือกสินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            headerShown: false,
            title: "ที่อยู่ในการจัดส่งใหม่",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            headerShown: false,
            title: "แก้ไขที่อยู่ในการจัดส่ง",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="AddTaxAddress"
          component={AddTaxAddress}
          options={{
            headerShown: false,
            title: "เพิ่มข้อมูลใบกำกับภาษี",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
                <Stack.Screen
          name="EditTaxAddress"
          component={EditTaxAddress}
          options={{
            headerShown: false,
            title: "แก้ไขข้อมูลใบกำกับภาษี",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="AddSlip"
          component={AddSlip}
          options={{
            headerShown: false,
            title: "แจ้งชำระเงิน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Details_order"
          component={Details_order}
          options={{
            headerShown: false,
            title: "รายละเอียดรายการสั่งซื้อ",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Rate"
          component={Rate}
          options={{
            headerShown: false,
            title: "ให้คะแนน",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="ReviewAll"
          component={ReviewAll}
          options={{
            headerShown: false,
            title: "ดูรีวิวทั้งหมด",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="RateAllProduct"
          component={RateAllProduct}
          options={{
            headerShown: false,
            title: "ให้คะแนนสินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="RateSelectProduct"
          component={RateSelectProduct}
          options={{
            headerShown: false,
            title: "ให้คะแนนสินค้า",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
