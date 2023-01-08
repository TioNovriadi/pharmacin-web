import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import toast from "../../../utils/helper/Toast";
import LoadingModal from "../../../component/LoadingModal";
import HeaderPage from "../../../component/HeaderPage";

const ObatHome = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [showKategoriModal, setShowKategoriModal] = useState(false);
  const [namaKategori, setNamaKategori] = useState("");
  const [isLoadingInput, setIsLoadingInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataKategori, setDataKategori] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [kategoriChange, setKategoriChange] = useState(null);

  const addKategori = async (namaKategori) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.add_kategori_obat, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaKategori: namaKategori,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Kategori obat berhasil ditambahkan!") {
          toast.success({ message: json.message });
          setRefresh(!refresh);
        } else {
          toast.danger({ message: json.messages.errors[0].message });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingInput(false);
        setShowKategoriModal(false);
        setNamaKategori("");
      });
  };

  const deleteKategori = async (kategoriId) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.delete_kategori + `/${kategoriId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Kategori obat berhasil dihapus!") {
          toast.success({ message: json.message });
          setRefresh(!refresh);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingInput(false);
        setShowModalDelete(false);
        setKategoriChange(null);
      });
  };

  const updateKategori = async (namaKategori, kategoriId) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.update_kategori + `/${kategoriId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaKategori: namaKategori,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Kategori obat berhasil diubah!") {
          toast.success({ message: json.message });
          setRefresh(!refresh);
        } else {
          toast.danger({ message: json.messages.errors[0].message });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingInput(false);
        setShowKategoriModal(false);
        setKategoriChange(null);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await fetch(API_ACCESS.get_all_kategori, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "Data fetched!") {
            setDataKategori(json.data);
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
  }, [refresh]);

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
      <HeaderPage pageName="Obat" pageSubmenu="/ Kategori" />

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
              setShowKategoriModal(true);
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                color: "white",
              }}
            >
              Tambah Kategori
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
                flex: 1,
                textAlign: "center",
              }}
            >
              ID Kategori
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
              Nama Kategori
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
            data={dataKategori}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 7,
                  backgroundColor: (index + 1) % 2 === 0 ? "#F4F4F4" : "white",
                }}
                onPress={() => {
                  navigation.navigate("Obat", {
                    screen: "ObatKelola",
                    params: {
                      kategoriId: item.id,
                      kategoriName: item.nama_kategori,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {item.id}
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
                  {item.nama_kategori}
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
                      setShowKategoriModal(true);
                      setKategoriChange(item);
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
                      setKategoriChange(item);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/delete.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Modal */}
      <Modal visible={showKategoriModal} transparent>
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
              paddingTop: 54,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-SemiBold",
                fontSize: 18,
                color: "#001B45",
                includeFontPadding: false,
                marginBottom: 47,
              }}
            >
              Nama Kategori
            </Text>

            <View
              style={{
                width: 394,
                height: 42,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                justifyContent: "center",
                paddingHorizontal: 10,
                marginHorizontal: 122,
              }}
            >
              <TextInput
                value={namaKategori}
                placeholder={
                  kategoriChange === null ? null : kategoriChange.nama_kategori
                }
                placeholderTextColor="#ACACAC"
                onChangeText={(text) => setNamaKategori(text)}
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  color: "black",
                  outline: "none",
                  includeFontPadding: false,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 124,
                marginBottom: 18,
                paddingRight: 18,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#A5A5A5",
                  paddingHorizontal: 20,
                  paddingVertical: 9,
                  borderRadius: 10,
                  marginRight: 20,
                }}
                onPress={() => {
                  setShowKategoriModal(false);
                  setKategoriChange(null);
                  setNamaKategori("");
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
                  backgroundColor: "#2FA33B",
                  paddingHorizontal: 20,
                  paddingVertical: 9,
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (kategoriChange === null) {
                    addKategori(namaKategori);
                  } else {
                    updateKategori(namaKategori, kategoriChange.id);
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
                  {kategoriChange === null ? "Tambah" : "Ubah"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
              Anda yakin ingin menghapus kategori obat?
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
              Jika anda menghapus kategori, maka data obat juga akan terhapus
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
                  setKategoriChange(null);
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
                  deleteKategori(kategoriChange.id);
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

export default ObatHome;
