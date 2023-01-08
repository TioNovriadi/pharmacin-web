import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import toast from "../../../utils/helper/Toast";
import LoadingModal from "../../../component/LoadingModal";
import HeaderPage from "../../../component/HeaderPage";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const ObatKelola = ({ route, navigation }) => {
  const { kategoriId, kategoriName } = route.params;

  const { userToken } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataObat, setDataObat] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [obatChange, setObatChange] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isLoadingInput, setIsLoadingInput] = useState(false);

  const deleteObat = async (obatId) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.delete_obat + `/${obatId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Obat berhasil dihapus!") {
          toast.success({ message: json.message });
          setRefresh(!refresh);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingInput(false);
        setObatChange(null);
        setShowModalDelete(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await fetch(API_ACCESS.show_obat + `/${kategoriId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "Data fetched!") {
            setDataObat(json.data);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused, refresh]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Obat" pageSubmenu="/ Kelola Obat" />

      {/* Content */}
      <View
        style={{
          height: 908,
          backgroundColor: "white",
          borderRadius: 10,
          marginHorizontal: 14,
          marginBottom: 14,
          marginTop: 17,
          padding: 14,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#062659",
              paddingHorizontal: 9,
              borderRadius: 10,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Image
              source={require("../../../assets/images/filter.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#BDBDBD",
              width: 284,
              borderRadius: 10,
              paddingVertical: 9,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={require("../../../assets/images/search.png")}
              style={{ width: 24, height: 24, marginRight: 15 }}
            />

            <TextInput
              value={search}
              placeholder="Cari..."
              placeholderTextColor="#333333"
              onChangeText={(text) => setSearch(text)}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "black",
                outline: "none",
                flex: 1,
                includeFontPadding: false,
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#2FA33B",
              justifyContent: "center",
              paddingHorizontal: 30,
              borderRadius: 10,
              marginLeft: 10,
            }}
            onPress={() => {
              navigation.navigate("Obat", {
                screen: "ObatAdd",
                params: {
                  kategoriId: kategoriId,
                  obatData: null,
                },
              });
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                color: "white",
              }}
            >
              Tambah Obat
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 6 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 13,
              paddingTop: 19,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                textAlign: "center",
                width: 100,
              }}
            >
              No
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              Nama Obat
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              Nama Generik
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              Kategori
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              Harga Beli
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              Harga Jual
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              Tindakan
            </Text>
          </View>

          <FlatList
            data={dataObat}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 7,
                  backgroundColor: (index + 1) % 2 === 0 ? "#F4F4F4" : "white",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    textAlign: "center",
                    width: 100,
                  }}
                >
                  {index + 1}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {item.nama_obat}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {item.generik_obat === null ? " - " : item.generik_obat}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {kategoriName}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.harga_beli)}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.harga_jual)}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EBC86E",
                      padding: 8,
                      borderRadius: 8,
                      marginRight: 12,
                    }}
                    onPress={() => {
                      navigation.navigate("Obat", {
                        screen: "ObatAdd",
                        params: {
                          obatData: item,
                          kategoriId: kategoriId,
                        },
                      });

                      console.log(item);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/edit.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#CD4A4F",
                      padding: 8,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setShowModalDelete(true);
                      setObatChange(item);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/delete.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>

      {/* Modal */}
      <Modal visible={showModalDelete} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 14,
              paddingVertical: 34,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
                color: "#373737",
              }}
            >
              Anda yakin ingin menghapus obat?
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "#868686",
                marginHorizontal: 50,
                marginTop: 30,
              }}
            >
              Jika anda menghapus obat, maka data obat tidak bisa dikembalikan
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 28,
                  paddingVertical: 15,
                  backgroundColor: "#D8D8D8",
                  borderRadius: 10,
                }}
                onPress={() => {
                  setObatChange(null);
                  setShowModalDelete(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 20,
                    color: "#505050",
                  }}
                >
                  Batalkan
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 48,
                  paddingVertical: 15,
                  backgroundColor: "#2FA33B",
                  borderRadius: 10,
                  marginLeft: 30,
                }}
                onPress={() => {
                  deleteObat(obatChange.id);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <LoadingModal visible={isLoadingInput} />
    </ScrollView>
  );
};

export default ObatKelola;
