import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import toast from "../../../utils/helper/Toast";
import LoadingModal from "../../../component/LoadingModal";
import HeaderPage from "../../../component/HeaderPage";

const PabrikanAdd = ({ navigation, route }) => {
  const { pabrikData } = route.params;

  const { userToken, userId } = useContext(AuthContext);

  const [namaPabrik, setNamaPabrik] = useState("");
  const [emailPabrik, setEmailPabrik] = useState("");
  const [noTelpPabrik, setNoTelpPabrik] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const simpan = async (namaPabrik, emailPabrik, noTelpPabrik, tambah) => {
    setIsLoading(true);

    await fetch(API_ACCESS.add_pabrik, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaPabrik: namaPabrik,
        emailPabrik: emailPabrik,
        noTelpPabrik: noTelpPabrik,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Pabrik terdaftar!") {
          toast.success({ message: json.message });

          if (tambah) {
            setNamaPabrik("");
            setEmailPabrik("");
            setNoTelpPabrik("");
          } else {
            navigation.goBack();
          }
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

  const updatePabrik = async (namaPabrik, emailPabrik, noTelpPabrik) => {
    setIsLoading(true);

    await fetch(API_ACCESS.update_pabrik + `/${pabrikData.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaPabrik: namaPabrik,
        emailPabrik: emailPabrik,
        noTelpPabrik: noTelpPabrik,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Pabrik berhasil diubah!") {
          toast.success({ message: json.message });
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

  useEffect(() => {
    if (pabrikData !== null) {
      setNamaPabrik(pabrikData.nama_pabrik);
      if (pabrikData.email_pabrik !== null) {
        setEmailPabrik(pabrikData.email_pabrik);
      }
      if (pabrikData.no_telp_pabrik !== null) {
        setNoTelpPabrik(pabrikData.no_telp_pabrik);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage
        pageName="Pabrikan"
        pageSubmenu="/ Kelola Pabrik / Tambah Pabrik"
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          margin: 14,
          borderRadius: 10,
          paddingTop: 44,
          paddingLeft: 24,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              color: "#001B45",
              marginBottom: 6,
            }}
          >
            Pabrik
          </Text>

          <View
            style={{
              width: 394,
              borderWidth: 2,
              borderColor: "#BDBDBD",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <TextInput
              value={namaPabrik}
              onChangeText={(text) => setNamaPabrik(text)}
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                color: "black",
                outline: "none",
                includeFontPadding: false,
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 21 }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              color: "#001B45",
              marginBottom: 6,
            }}
          >
            {`Email (optional)`}
          </Text>

          <View
            style={{
              width: 394,
              borderWidth: 2,
              borderColor: "#BDBDBD",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <TextInput
              value={emailPabrik}
              onChangeText={(text) => setEmailPabrik(text)}
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                color: "black",
                outline: "none",
                includeFontPadding: false,
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 21 }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              color: "#001B45",
              marginBottom: 6,
            }}
          >
            {`Telepon (optional)`}
          </Text>

          <View
            style={{
              width: 394,
              borderWidth: 2,
              borderColor: "#BDBDBD",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <TextInput
              value={noTelpPabrik}
              onChangeText={(text) => setNoTelpPabrik(text)}
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                color: "black",
                outline: "none",
                includeFontPadding: false,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
            right: 34,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#D76363",
              paddingHorizontal: 30,
              paddingVertical: 9,
              borderRadius: 10,
              marginRight: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "white",
                includeFontPadding: false,
              }}
            >
              Batalkan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#062659",
              paddingHorizontal: 30,
              paddingVertical: 9,
              borderRadius: 10,
              marginRight: 20,
            }}
            onPress={() => {
              if (pabrikData === null) {
                simpan(namaPabrik, emailPabrik, noTelpPabrik, false);
              } else {
                updatePabrik(namaPabrik, emailPabrik, noTelpPabrik);
              }
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "white",
                includeFontPadding: false,
              }}
            >
              {pabrikData === null ? "Simpan" : "Ubah"}
            </Text>
          </TouchableOpacity>

          {pabrikData === null ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2FA33B",
                paddingHorizontal: 30,
                paddingVertical: 9,
                borderRadius: 10,
              }}
              onPress={() => {
                simpan(namaPabrik, emailPabrik, noTelpPabrik, true);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "white",
                  includeFontPadding: false,
                }}
              >
                Simpan dan Tambah lainnya
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default PabrikanAdd;
