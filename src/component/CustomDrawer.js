import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../utils/context/AuthContext";

const CustomDrawer = (props) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: 205,
          height: 69,
          backgroundColor: "#2FA33B",
          borderRadius: 10,
          marginHorizontal: 53,
          marginTop: 41,
          marginBottom: 50,
        }}
      />

      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 40,
              backgroundColor:
                props.state.index ===
                props.state.routes.findIndex((e) => e.name === "Dashboard")
                  ? "#2FA33B"
                  : "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />

          <DrawerItem
            label="Dashboard"
            onPress={() =>
              props.navigation.navigate("Dashboard", {
                screen: "DashboardHome",
              })
            }
            focused={
              props.state.index ===
              props.state.routes.findIndex((e) => e.name === "Dashboard")
            }
            activeTintColor="#2FA33B"
            inactiveTintColor="#7E7E7E"
            activeBackgroundColor="white"
            icon={({ focused }) => {
              if (focused) {
                return (
                  <Image
                    source={require("../assets/images/dashboardActive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../assets/images/dashboardInactive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              }
            }}
            labelStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              includeFontPadding: false,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 40,
              backgroundColor:
                props.state.index ===
                props.state.routes.findIndex((e) => e.name === "Penjualan")
                  ? "#2FA33B"
                  : "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />

          <DrawerItem
            label="Penjualan"
            onPress={() =>
              props.navigation.navigate("Penjualan", {
                screen: "PenjualanHome",
              })
            }
            focused={
              props.state.index ===
              props.state.routes.findIndex((e) => e.name === "Penjualan")
            }
            activeTintColor="#2FA33B"
            inactiveTintColor="#7E7E7E"
            activeBackgroundColor="white"
            icon={({ focused }) => {
              if (focused) {
                return (
                  <Image
                    source={require("../assets/images/invoiceActive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../assets/images/invoiceInactive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              }
            }}
            labelStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              includeFontPadding: false,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 40,
              backgroundColor:
                props.state.index ===
                props.state.routes.findIndex((e) => e.name === "Stock")
                  ? "#2FA33B"
                  : "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />

          <DrawerItem
            label="Stock"
            onPress={() =>
              props.navigation.navigate("Stock", {
                screen: "StockHome",
              })
            }
            focused={
              props.state.index ===
              props.state.routes.findIndex((e) => e.name === "Stock")
            }
            activeTintColor="#2FA33B"
            inactiveTintColor="#7E7E7E"
            activeBackgroundColor="white"
            icon={({ focused }) => {
              if (focused) {
                return (
                  <Image
                    source={require("../assets/images/stockActive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../assets/images/stockInactive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              }
            }}
            labelStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              includeFontPadding: false,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 40,
              backgroundColor:
                props.state.index ===
                props.state.routes.findIndex((e) => e.name === "Obat")
                  ? "#2FA33B"
                  : "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />

          <DrawerItem
            label="Obat"
            onPress={() =>
              props.navigation.navigate("Obat", {
                screen: "ObatHome",
              })
            }
            focused={
              props.state.index ===
              props.state.routes.findIndex((e) => e.name === "Obat")
            }
            activeTintColor="#2FA33B"
            inactiveTintColor="#7E7E7E"
            activeBackgroundColor="white"
            icon={({ focused }) => {
              if (focused) {
                return (
                  <Image
                    source={require("../assets/images/obatActive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../assets/images/obatInactive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              }
            }}
            labelStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              includeFontPadding: false,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 40,
              backgroundColor:
                props.state.index ===
                props.state.routes.findIndex((e) => e.name === "Pabrikan")
                  ? "#2FA33B"
                  : "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />

          <DrawerItem
            label="Pabrikan"
            onPress={() => {
              props.navigation.navigate("Pabrikan", {
                screen: "PabrikanHome",
              });
            }}
            focused={
              props.state.index ===
              props.state.routes.findIndex((e) => e.name === "Pabrikan")
            }
            activeTintColor="#2FA33B"
            inactiveTintColor="#7E7E7E"
            activeBackgroundColor="white"
            icon={({ focused }) => {
              if (focused) {
                return (
                  <Image
                    source={require("../assets/images/pabrikanActive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../assets/images/pabrikanInactive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              }
            }}
            labelStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              includeFontPadding: false,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 40,
              backgroundColor:
                props.state.index ===
                props.state.routes.findIndex((e) => e.name === "Pembelian")
                  ? "#2FA33B"
                  : "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />

          <DrawerItem
            label="Pembelian"
            onPress={() => {
              props.navigation.navigate("Pembelian", {
                screen: "PembelianHome",
              });
            }}
            focused={
              props.state.index ===
              props.state.routes.findIndex((e) => e.name === "Pembelian")
            }
            activeTintColor="#2FA33B"
            inactiveTintColor="#7E7E7E"
            activeBackgroundColor="white"
            icon={({ focused }) => {
              if (focused) {
                return (
                  <Image
                    source={require("../assets/images/pembelianActive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("../assets/images/pembelianInactive.png")}
                    style={{ width: 42, height: 42 }}
                  />
                );
              }
            }}
            labelStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              includeFontPadding: false,
            }}
          />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#062659",
          marginBottom: 30,
          marginHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
        onPress={() => {
          logout();
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 18,
            includeFontPadding: false,
            color: "white",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;
