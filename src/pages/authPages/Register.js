import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { API_ACCESS } from "../../utils/config/Endpoint";
import toast from "../../utils/helper/Toast";
import LoadingModal from "../../component/LoadingModal";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async (email, password, confPass) => {
    setIsLoading(true);

    await fetch(API_ACCESS.register, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confPass,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Register success!") {
          toast.success({ message: "Daftar akun berhasil!" });
          navigation.goBack();
        } else {
          toast.danger({ message: json.messages.errors[0].message });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{
            height: HEIGHT,
            width: WIDTH - 465,
            backgroundColor: "#062659",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/topDesignRegis.png")}
              style={{ width: 536, height: 295, marginLeft: 29 }}
            />
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Image
              source={require("../../assets/images/bottomDesignRegis.png")}
              style={{ width: 550, height: 356 }}
            />
          </View>

          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: 131,
              height: 30,
              position: "absolute",
              right: 40,
              top: 40,
            }}
          />
        </View>
      </View>

      <View
        style={{
          height: HEIGHT,
          width: 480,
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          position: "absolute",
          left: 0,
        }}
      >
        <View style={{ marginHorizontal: 44, marginTop: 50 }}>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 48,
              color: "#333333",
            }}
          >
            Daftar
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "#747474",
            }}
          >
            Masukan alamat email dan kata sandi untuk membuat akun.
          </Text>
        </View>

        <View style={{ marginHorizontal: 43, marginTop: 73 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#D0D0D0",
              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 14,
            }}
          >
            <Image
              source={require("../../assets/images/email.png")}
              style={{ width: 24, height: 24, marginRight: 24 }}
            />

            <TextInput
              value={email}
              placeholder="Alamat Email"
              placeholderTextColor="#ACACAC"
              onChangeText={(text) => setEmail(text)}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
                outline: "none",
                includeFontPadding: false,
                flex: 1,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#D0D0D0",
              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 14,
              marginTop: 47,
            }}
          >
            <Image
              source={require("../../assets/images/password.png")}
              style={{ width: 24, height: 24, marginRight: 24 }}
            />

            <TextInput
              value={password}
              placeholder="Kata Sandi"
              placeholderTextColor="#ACACAC"
              onChangeText={(text) => setPassword(text)}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
                outline: "none",
                includeFontPadding: false,
                flex: 1,
              }}
              secureTextEntry
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#D0D0D0",
              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 14,
              marginTop: 47,
            }}
          >
            <Image
              source={require("../../assets/images/password.png")}
              style={{ width: 24, height: 24, marginRight: 24 }}
            />

            <TextInput
              value={confPass}
              placeholder="Konfirmasi Kata Sandi"
              placeholderTextColor="#ACACAC"
              onChangeText={(text) => setConfPass(text)}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
                outline: "none",
                includeFontPadding: false,
                flex: 1,
              }}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#062659",
            paddingVertical: 10,
            borderRadius: 10,
            marginHorizontal: 98,
            marginTop: 61,
          }}
          onPress={() => {
            register(email, password, confPass);
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 18,
              color: "white",
              includeFontPadding: false,
            }}
          >
            Daftar
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingModal visible={isLoading} />
    </ScrollView>
  );
};

export default Register;
