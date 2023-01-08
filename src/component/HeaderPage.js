import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderPage = ({ pageName, pageSubmenu }) => {
  const { kasirStatus, setKasirStatus } = useContext(AuthContext);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 40,
        marginHorizontal: 24,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 32,
            color: "#062659",
          }}
        >
          {pageName}{" "}
          {pageSubmenu ? (
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#868686",
              }}
            >
              {pageSubmenu}
            </Text>
          ) : null}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            backgroundColor: kasirStatus === true ? "#D76363" : "#2FA33B",
            alignItems: "center",
            paddingHorizontal: 32,
            paddingVertical: 9,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
          onPress={async () => {
            setKasirStatus(!kasirStatus);
            await AsyncStorage.setItem("kasirStatus", !kasirStatus);
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 16,
              color: "white",
              includeFontPadding: false,
            }}
          >
            {kasirStatus === true ? "Tutup Kasir" : "Buka Kasir"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            paddingHorizontal: 9,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../assets/images/setting.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            paddingHorizontal: 9,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../assets/images/notif.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderPage;
