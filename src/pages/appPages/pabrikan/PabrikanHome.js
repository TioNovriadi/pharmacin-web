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

const PabrikanHome = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPress, setIsLoadingPress] = useState(false);
  const [data, setData] = useState(null);
  const [dataView, setDataView] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pabrikChange, setPabrikChange] = useState(null);

  const deletePabrik = async (pabrikId) => {
    setIsLoadingPress(true);

    await fetch(API_ACCESS.delete_pabrik + `/${pabrikId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Pabrik berhasil dihapus!") {
          toast.success({ message: json.message });
          setRefresh(!refresh);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingPress(false);
        setShowModal(false);
      });
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.nama_pabrik
          ? item.nama_pabrik.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setDataView(newData);
      setSearch(text);
    } else {
      setDataView(data);
      setSearch(text);
    }
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
            setData(json.data);
            setDataView(json.data);
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
    <ScrollView style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Pabrikan" pageSubmenu="/ Kelola Pabrik" />

      {/* Content */}
      <View
        style={{
          height: 908,
          backgroundColor: "white",
          margin: 14,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 14,
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
              onChangeText={(text) => searchFilter(text)}
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
              navigation.navigate("Pabrikan", {
                screen: "PabrikanAdd",
                params: {
                  pabrikData: null,
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
              Tambah Pabrik
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 25 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor: "#D9D9D9",
              paddingBottom: 13,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
              }}
            >
              No
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 3,
              }}
            >
              Nama Pabrik
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 3,
              }}
            >
              Email
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 3,
              }}
            >
              Telepon
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 2,
                textAlign: "center",
              }}
            >
              Tindakan
            </Text>
          </View>

          <FlatList
            data={dataView}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingVertical: 15,
                  backgroundColor: (index + 1) % 2 === 0 ? "#F4F4F4" : "white",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("Pabrikan", {
                    screen: "PabrikanRincian",
                    params: {
                      pabrikData: item,
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
                    includeFontPadding: false,
                  }}
                >
                  {index + 1}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 3,
                    includeFontPadding: false,
                  }}
                >
                  {item.nama_pabrik}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 3,
                    includeFontPadding: false,
                  }}
                >
                  {item.email_pabrik === null ? " - " : item.email_pabrik}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    flex: 3,
                    includeFontPadding: false,
                  }}
                >
                  {item.no_telp_pabrik === null ? " - " : item.no_telp_pabrik}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 2,
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EBC86E",
                      paddingHorizontal: 8.4,
                      paddingVertical: 8,
                      borderRadius: 8,
                      marginRight: 12.6,
                    }}
                    onPress={() => {
                      navigation.navigate("Pabrikan", {
                        screen: "PabrikanAdd",
                        params: {
                          pabrikData: item,
                        },
                      });
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/edit.png")}
                      style={{ width: 25.2, height: 24 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#CD4A4F",
                      paddingHorizontal: 8.4,
                      paddingVertical: 8,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setShowModal(true);
                      setPabrikChange(item);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/delete.png")}
                      style={{ width: 25.2, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Modal */}
      <Modal visible={showModal} transparent>
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
              Anda yakin ingin menghapus pabrik?
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
              Jika anda menghapus pabrik, maka data obat juga akan terhapus
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
                  setShowModal(false);
                  setPabrikChange(null);
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
                  deletePabrik(pabrikChange.id);
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

      <LoadingModal visible={isLoadingPress} />
    </ScrollView>
  );
};

export default PabrikanHome;
