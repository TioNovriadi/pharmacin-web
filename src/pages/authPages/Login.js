import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useFonts } from "expo-font";
import LoadingModal from "../../component/LoadingModal";
import { AuthContext } from "../../utils/context/AuthContext";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Montserrat-SemiBold": require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
    "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{
            height: HEIGHT,
            width: WIDTH - 465,
            backgroundColor: "#2FA33B",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/topDesign.png")}
              style={{ width: 536, height: 295, marginLeft: 29 }}
            />
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Image
              source={require("../../assets/images/bottomDesign.png")}
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
            Masuk
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "#747474",
            }}
          >
            Selamat datang, silahkan masuk dengan akun yang telah terdaftar.
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
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#2FA33B",
            paddingVertical: 10,
            borderRadius: 10,
            marginHorizontal: 98,
            marginTop: 61,
          }}
          onPress={() => {
            login(email, password);
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
            Masuk
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 114,
              height: 1,
              borderBottomWidth: 1,
              borderBottomColor: "#ACACAC",
              marginTop: 48,
            }}
          />

          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "#333333",
              marginTop: 27,
            }}
          >
            Tidak punya akun?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 18,
                color: "#2FA33B",
              }}
            >
              Daftar disini
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoadingModal visible={!fontsLoaded ? true : false} />
    </ScrollView>
  );
};

export default Login;
