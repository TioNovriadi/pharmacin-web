import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import toast from "../../../utils/helper/Toast";
import LoadingModal from "../../../component/LoadingModal";
import HeaderPage from "../../../component/HeaderPage";

const ObatAdd = ({ navigation, route }) => {
  const { kategoriId, obatData } = route.params;

  const { userToken } = useContext(AuthContext);

  const [namaObat, setNamaObat] = useState("");
  const [generikObat, setGenerikObat] = useState("");
  const [hargaBeli, setHargaBeli] = useState(undefined);
  const [hargaJual, setHargaJual] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataPabrik, setDataPabrik] = useState(null);
  const [showDropdownPabrik, setShowDropdownPabrik] = useState(false);
  const [pabrik, setPabrik] = useState(null);
  const [isLoadingInput, setIsLoadingInput] = useState(false);

  const addObat = async (
    namaObat,
    generikObat,
    hargaBeli,
    hargaJual,
    pabrik,
    tambah
  ) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.add_obat, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaObat: namaObat,
        generikObat: generikObat,
        hargaBeli: hargaBeli,
        hargaJual: hargaJual,
        pabrikId: pabrik === null ? null : pabrik.id,
        kategoriId: kategoriId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Obat berhasil ditambahkan!") {
          toast.success({ message: json.message });

          if (tambah) {
            setNamaObat("");
            setGenerikObat("");
            setHargaBeli(null);
            setHargaJual(null);
            setPabrik(null);
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
        setIsLoadingInput(false);
      });
  };

  const updateObat = async (
    namaObat,
    generikObat,
    hargaBeli,
    hargaJual,
    pabrik
  ) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.update_obat + `/${obatData.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaObat: namaObat,
        generikObat: generikObat,
        hargaBeli: hargaBeli,
        hargaJual: hargaJual,
        pabrikId: pabrik === null ? null : pabrik.id,
        kategoriId: kategoriId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Obat berhasil diubah!") {
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
        setIsLoadingInput(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await fetch(API_ACCESS.get_all_pabrik, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "Data fetched!") {
            setDataPabrik(json.data);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (obatData !== null) {
      setNamaObat(obatData.nama_obat);

      if (obatData.generik_obat !== null) {
        setGenerikObat(obatData.generik_obat);
      }

      setPabrik(obatData.pabrik);
      setHargaBeli(obatData.harga_beli);
      setHargaJual(obatData.harga_jual);
    }
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Obat" pageSubmenu="/ Kelola Obat / Tambah Obat" />

      {/* Content */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          marginHorizontal: 14,
          marginBottom: 14,
          marginTop: 17,
          paddingHorizontal: 24,
          paddingTop: 44,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
                marginBottom: 6,
              }}
            >
              Nama Obat
            </Text>

            <View
              style={{
                width: 394,
                height: 42,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                justifyContent: "center",
                paddingHorizontal: 15,
              }}
            >
              <TextInput
                value={namaObat}
                onChangeText={(text) => setNamaObat(text)}
                style={{
                  fontFamily: "Poppins-Regular",
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
              Nama Generik
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 394,
                  height: 42,
                  borderWidth: 2,
                  borderColor: "#BDBDBD",
                  borderRadius: 10,
                  justifyContent: "center",
                  paddingHorizontal: 15,
                }}
              >
                <TextInput
                  value={generikObat}
                  onChangeText={(text) => setGenerikObat(text)}
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "black",
                    outline: "none",
                    includeFontPadding: false,
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "#001B45",
                  marginLeft: 10,
                }}
              >
                (optional)
              </Text>
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
              Pabrikan
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: 394,
                    height: 42,
                    borderWidth: 2,
                    borderColor: "#BDBDBD",
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                  onPress={() => {
                    setShowDropdownPabrik(!showDropdownPabrik);
                  }}
                >
                  {pabrik === null ? null : (
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        color: "black",
                        flex: 1,
                      }}
                    >
                      {pabrik.nama_pabrik}
                    </Text>
                  )}

                  <Image
                    source={require("../../../assets/images/dropdown.png")}
                    style={{ width: 16, height: 16 }}
                  />
                </TouchableOpacity>

                {showDropdownPabrik ? (
                  <View
                    style={{
                      backgroundColor: "#F4F4F4",
                      width: 354,
                      height: 200,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      paddingHorizontal: 10,
                      paddingTop: 14,
                    }}
                  >
                    <FlatList
                      data={dataPabrik}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            paddingVertical: 10,
                            borderBottomWidth:
                              index + 1 === dataPabrik.length ? null : 2,
                            borderBottomColor: "#D9D9D9",
                          }}
                          onPress={() => {
                            setPabrik(item);
                            setShowDropdownPabrik(false);
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Poppins-Medium",
                              fontSize: 18,
                              color: "#333",
                            }}
                          >
                            {item.nama_pabrik}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                ) : null}
              </View>
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
              Harga Beli
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 394,
                  height: 42,
                  borderWidth: 2,
                  borderColor: "#BDBDBD",
                  borderRadius: 10,
                  justifyContent: "center",
                  paddingHorizontal: 15,
                }}
              >
                <TextInput
                  value={hargaBeli}
                  onChangeText={(text) =>
                    setHargaBeli(text.replace(/[^0-9]/g, ""))
                  }
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "black",
                    outline: "none",
                    includeFontPadding: false,
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "#001B45",
                  marginLeft: 10,
                }}
              >
                (hanya angka)
              </Text>
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
              Harga Jual
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 394,
                  height: 42,
                  borderWidth: 2,
                  borderColor: "#BDBDBD",
                  borderRadius: 10,
                  justifyContent: "center",
                  paddingHorizontal: 15,
                }}
              >
                <TextInput
                  value={hargaJual}
                  onChangeText={(text) =>
                    setHargaJual(text.replace(/[^0-9]/g, ""))
                  }
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "black",
                    outline: "none",
                    includeFontPadding: false,
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "#001B45",
                  marginLeft: 10,
                }}
              >
                (hanya angka)
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 42,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#D76363",
              paddingHorizontal: 30,
              paddingVertical: 9,
              borderRadius: 10,
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
              marginHorizontal: 20,
            }}
            onPress={() => {
              if (obatData === null) {
                addObat(
                  namaObat,
                  generikObat,
                  hargaBeli,
                  hargaJual,
                  pabrik,
                  false
                );
              } else {
                updateObat(namaObat, generikObat, hargaBeli, hargaJual, pabrik);
              }
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "white",
              }}
            >
              {obatData === null ? "Simpan" : "Ubah"}
            </Text>
          </TouchableOpacity>

          {obatData === null ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2FA33B",
                paddingHorizontal: 30,
                paddingVertical: 9,
                borderRadius: 10,
              }}
              onPress={() => {
                addObat(
                  namaObat,
                  generikObat,
                  hargaBeli,
                  hargaJual,
                  pabrik,
                  true
                );
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "white",
                }}
              >
                Simpan dan Tambah lainnya
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>

      <LoadingModal visible={isLoadingInput} />
    </View>
  );
};

export default ObatAdd;
