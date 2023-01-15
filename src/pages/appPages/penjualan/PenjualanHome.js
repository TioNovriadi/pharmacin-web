import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import HeaderPage from "../../../component/HeaderPage";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import toast from "../../../utils/helper/Toast";
import LoadingModal from "../../../component/LoadingModal";
import { DatePickerModal } from "react-native-paper-dates";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const PenjualanHome = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [search, setSearch] = useState("");
  const [dataPenjualan, setDataPenjualan] = useState(null);
  const [dataPenjualanView, setDataPenjualanView] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [penjualanChange, setPenjualanChange] = useState(null);
  const [isLoadingInput, setIsLoadingInput] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const onDismiss = useCallback(() => {
    setShowDate(false);
  }, [setShowDate]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      const fetchData = async () => {
        setIsLoading(true);

        await fetch(API_ACCESS.get_all_penjualan, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.message === "Data fetched!") {
              const newData = json.data.filter((item) => {
                const date = new Date(item.tanggal_transaksi);

                return date >= startDate && date <= endDate;
              });

              setDataPenjualanView(newData);
            }
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            setIsLoading(false);
            setShowDate(false);
            setRange({ startDate, endDate });
          });
      };

      fetchData();
    },
    [setShowDate, setRange, setDataPenjualanView]
  );

  const deletePenjualan = async (penjualanId) => {
    setIsLoadingInput(true);

    await fetch(API_ACCESS.delete_penjualan + `/${penjualanId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Data penjualan berhasil dihapus!") {
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
      });
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = dataPenjualan.filter((item) => {
        const itemData = item.nama_pelanggan
          ? item.nama_pelanggan.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setDataPenjualanView(newData);
      setSearch(text);
    } else {
      setDataPenjualanView(dataPenjualan);
      setSearch(text);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await fetch(API_ACCESS.get_all_penjualan, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "Data fetched!") {
            setDataPenjualan(json.data);
            setDataPenjualanView(json.data);
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
      <HeaderPage pageName="Penjualan" pageSubmenu="/ Kelola Penjualan" />

      {/* Content */}
      <View
        style={{
          backgroundColor: "white",
          height: 908,
          borderRadius: 10,
          marginHorizontal: 14,
          marginBottom: 14,
          marginTop: 17,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 14,
            paddingBottom: 7,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                width: 180,
                height: 42,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#5C6D88",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setShowDate(true);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  color: "#001B45",
                }}
              >
                {range.startDate === undefined
                  ? "DD-MM-YYYY"
                  : range.startDate
                      .toLocaleDateString("id", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(new RegExp("/", "g"), "-")}
              </Text>
            </TouchableOpacity>

            <Image
              source={require("../../../assets/images/arrow.png")}
              style={{ width: 24, height: 24, marginHorizontal: 20 }}
            />

            <TouchableOpacity
              style={{
                width: 180,
                height: 42,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#5C6D88",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setShowDate(true);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  color: "#001B45",
                }}
              >
                {range.endDate === undefined
                  ? "DD-MM-YYYY"
                  : range.endDate
                      .toLocaleDateString("id", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(new RegExp("/", "g"), "-")}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 42,
                height: 42,
                backgroundColor: "#062659",
                borderRadius: 10,
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
                paddingHorizontal: 8.82,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                paddingVertical: 9,
              }}
            >
              <Image
                source={require("../../../assets/images/search.png")}
                style={{ width: 24, height: 24, marginRight: 15 }}
              />

              <TextInput
                value={search}
                placeholder="Cari..."
                placeholderTextColor="#ACACAC"
                onChangeText={(text) => searchFilter(text)}
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                  flex: 1,
                  includeFontPadding: false,
                  outline: "none",
                }}
              />
            </View>
          </View>
        </View>

        {/* Content Table */}
        <View style={{ marginTop: 7, paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor: "#D9D9D9",
              paddingTop: 18,
              paddingBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                width: 100,
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
                includeFontPadding: false,
                flex: 1,
              }}
            >
              No Invoice
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                flex: 1,
              }}
            >
              Nama Pelanggan
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                flex: 1,
                textAlign: "center",
              }}
            >
              Tanggal
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                flex: 1,
                textAlign: "center",
              }}
            >
              Total Pembelian
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                flex: 1,
                textAlign: "center",
              }}
            >
              Tindakan
            </Text>
          </View>

          <FlatList
            data={dataPenjualanView}
            keyExtractor={(item, index) => item.id}
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
                    color: "#333",
                    includeFontPadding: false,
                    width: 100,
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    flex: 1,
                  }}
                >
                  {item.nomor_invoice}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    flex: 1,
                  }}
                >
                  {item.nama_pelanggan}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {new Date(item.tanggal_transaksi)
                    .toLocaleDateString("id", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(new RegExp("/", "g"), "-")}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.harga_total)}
                </Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#5891B1",
                      borderRadius: 8,
                      marginRight: 12,
                    }}
                    onPress={() => {
                      navigation.navigate("Penjualan", {
                        screen: "PenjualanRincian",
                        params: {
                          dataPenjualan: item,
                        },
                      });
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/rincian.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#CD4A4F",
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setPenjualanChange(item);
                      setShowModalDelete(true);
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
              Anda yakin ingin menghapus penjualan?
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
              Jika anda menghapus penjualan, maka data penjualan tidak bisa
              dikembalikan
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
                  setPenjualanChange(null);
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
                  deletePenjualan(penjualanChange.id);
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

      <DatePickerModal
        visible={showDate}
        locale="id"
        label="Pilih tanggal"
        mode="range"
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        validRange={{
          endDate: new Date(),
        }}
        startDate={range.startDate}
        endDate={range.endDate}
      />

      <LoadingModal visible={isLoadingInput} />
    </ScrollView>
  );
};

export default PenjualanHome;
