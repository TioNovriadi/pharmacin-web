import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import HeaderPage from "../../../component/HeaderPage";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../../utils/context/AuthContext";
import toast from "../../../utils/helper/Toast";

const DashboardHome = ({ navigation }) => {
  const { kasirStatus } = useContext(AuthContext);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Dashboard" />

      {/* Content */}
      <View
        style={{
          flexDirection: "row",
          marginLeft: 14,
          marginRight: 24,
          marginTop: 17,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            marginRight: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 24,
              color: "#2FA33B",
              marginTop: 20,
              marginLeft: 24,
            }}
          >
            Laporan Hari Ini
          </Text>
        </View>

        <View>
          <LinearGradient
            style={{ width: 293, height: 210, borderRadius: 10 }}
            colors={["#84B8F5", "#55E363"]}
            start={{ x: -0.5, y: 0.0 }}
            locations={[0.3, 0.8]}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (kasirStatus === true) {
                  navigation.navigate("Penjualan", {
                    screen: "PenjualanAdd",
                  });
                } else {
                  toast.info({ message: "Kasir belum dibuka!" });
                }
              }}
            >
              <Image
                source={require("../../../assets/images/tambahPenjualan.png")}
                style={{ width: 82, height: 82 }}
              />

              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 24,
                  color: "white",
                  includeFontPadding: false,
                  width: 123,
                  textAlign: "center",
                  marginTop: 15,
                }}
              >
                Tambah Penjualan
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            style={{ width: 293, height: 210, borderRadius: 10, marginTop: 20 }}
            colors={["#EBC86E", "rgba(235, 110, 110, 0.5)"]}
            start={{ x: 0.5, y: 0.0 }}
            locations={[0.3, 0.8]}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Pembelian", {
                  screen: "PembelianAdd",
                });
              }}
            >
              <Image
                source={require("../../../assets/images/pembelianBaru.png")}
                style={{ width: 82, height: 82 }}
              />

              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 24,
                  color: "white",
                  includeFontPadding: false,
                  width: 132,
                  textAlign: "center",
                  marginTop: 15,
                }}
              >
                Pembelian Baru
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <View
        style={{
          height: 442,
          backgroundColor: "white",
          borderRadius: 10,
          marginVertical: 20,
          marginLeft: 14,
          marginRight: 24,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 24,
            color: "#2FA33B",
            marginLeft: 13,
          }}
        >
          Penjualan Hari Ini
        </Text>
      </View>
    </ScrollView>
  );
};

export default DashboardHome;
