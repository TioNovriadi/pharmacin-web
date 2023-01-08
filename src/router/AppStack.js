import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PabrikanHome from "../pages/appPages/pabrikan/PabrikanHome";
import CustomDrawer from "../component/CustomDrawer";
import DashboardHome from "../pages/appPages/dashboard/DashboardHome";
import PabrikanAdd from "../pages/appPages/pabrikan/PabrikanAdd";
import ObatHome from "../pages/appPages/obat/ObatHome";
import PembelianHome from "../pages/appPages/pembelian/PembelianHome";
import PembelianAdd from "../pages/appPages/pembelian/PembelianAdd";
import ObatKelola from "../pages/appPages/obat/ObatKelola";
import ObatAdd from "../pages/appPages/obat/ObatAdd";
import PabrikanRincian from "../pages/appPages/pabrikan/PabrikanRincian";
import StockHome from "../pages/appPages/stock/StockHome";
import StockBatch from "../pages/appPages/stock/StockBatch";
import PenjualanHome from "../pages/appPages/penjualan/PenjualanHome";
import PenjualanAdd from "../pages/appPages/penjualan/PenjualanAdd";
import PenjualanRincian from "../pages/appPages/penjualan/PenjualanRincian";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "permanent",
        drawerActiveTintColor: "#2FA33B",
        drawerInactiveTintColor: "#ACACAC",
        drawerActiveBackgroundColor: "white",
        drawerStyle: {
          width: 312,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Penjualan"
        component={PenjualanStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Obat"
        component={ObatStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Pabrikan"
        component={PabrikanStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Pembelian"
        component={PembelianStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Stock"
        component={StockStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const PabrikanStack = () => {
  return (
    <Stack.Navigator initialRouteName="PabrikanHome">
      <Stack.Screen
        name="PabrikanHome"
        component={PabrikanHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PabrikanAdd"
        component={PabrikanAdd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PabrikanRincian"
        component={PabrikanRincian}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator initialRouteName="DashboardHome">
      <Stack.Screen
        name="DashboardHome"
        component={DashboardHome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ObatStack = () => {
  return (
    <Stack.Navigator initialRouteName="ObatHome">
      <Stack.Screen
        name="ObatHome"
        component={ObatHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ObatKelola"
        component={ObatKelola}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ObatAdd"
        component={ObatAdd}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const PembelianStack = () => {
  return (
    <Stack.Navigator initialRouteName="PembelianHome">
      <Stack.Screen
        name="PembelianHome"
        component={PembelianHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PembelianAdd"
        component={PembelianAdd}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const StockStack = () => {
  return (
    <Stack.Navigator initialRouteName="StockHome">
      <Stack.Screen
        name="StockHome"
        component={StockHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockBatch"
        component={StockBatch}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const PenjualanStack = () => {
  return (
    <Stack.Navigator initialRouteName="PenjualanHome">
      <Stack.Screen
        name="PenjualanHome"
        component={PenjualanHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PenjualanAdd"
        component={PenjualanAdd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PenjualanRincian"
        component={PenjualanRincian}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
