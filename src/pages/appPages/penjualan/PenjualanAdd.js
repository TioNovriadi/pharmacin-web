import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import toast from "../../../utils/helper/Toast";
import LoadingModal from "../../../component/LoadingModal";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const PenjualanAdd = ({ navigation }) => {
  const { userToken, userId } = useContext(AuthContext);

  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [jenisPembayaran, setJenisPembayaran] = useState(null);
  const [showPembayaranDropdown, setShowPembayaranDropdown] = useState(false);
  const [hargaTotal, setHargaTotal] = useState(0);
  const [nominalBayar, setNominalBayar] = useState("");
  const [nominalKembalian, setNominalKembalian] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataObat, setDataObat] = useState(null);
  const [penjualanItem, setPenjualanItem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [penjualanItemIndex, setPenjualanItemIndex] = useState(null);
  const [isLoadingInput, setIsLoadingInput] = useState(false);

  const addPenjualan = async (
    namaPelanggan,
    jenisPembayaran,
    hargaTotal,
    nominalBayar,
    nominalKembalian
  ) => {
    setIsLoadingInput(true);

    const finalData = penjualanItem.map((tmp) => {
      return {
        obatId: tmp.item.id,
        quantity: parseInt(tmp.quantity),
        hargaTotal: tmp.hargaTotal,
      };
    });

    console.log(finalData);

    await fetch(API_ACCESS.add_penjualan, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        namaPelanggan: namaPelanggan,
        jenisPembayaran: jenisPembayaran,
        hargaTotal: hargaTotal,
        nominalBayar: nominalBayar,
        nominalKembalian: nominalKembalian,
        userId: userId,
        transaksiPenjualan: finalData,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Penjualan berhasil terdata!") {
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

      await fetch(API_ACCESS.get_all_obat, {
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

    fetchData();
  }, []);

  useEffect(() => {
    let cash = 0;

    if (penjualanItem.length > 0) {
      for (let i = 0; i < penjualanItem.length; i++) {
        cash = cash + penjualanItem[i].hargaTotal;
      }

      setHargaTotal(cash);
    } else {
      setHargaTotal(cash);
    }
  }, [refresh]);

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 38,
          paddingRight: 14,
          marginTop: 33,
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
            Penjualan{" "}
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#868686",
              }}
            >
              / Penjualan Baru
            </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#D76363",
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 9,
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
              Kembali
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#2FA33B",
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 9,
            }}
            onPress={() => {
              addPenjualan(
                namaPelanggan,
                jenisPembayaran,
                hargaTotal,
                nominalBayar,
                nominalKembalian
              );
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
              Lakukan Pembayaran
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View
        style={{ flexDirection: "row", marginHorizontal: 14, marginTop: 24 }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 25,
            marginRight: 14,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              color: "#001B45",
              includeFontPadding: false,
              marginBottom: 6,
            }}
          >
            Nama Pelanggan
          </Text>

          <View
            style={{
              borderWidth: 2,
              borderColor: "#BDBDBD",
              borderRadius: 10,
              width: 394,
              height: 42,
              justifyContent: "center",
              paddingHorizontal: 10,
              marginBottom: 21,
            }}
          >
            <TextInput
              value={namaPelanggan}
              onChangeText={(text) => setNamaPelanggan(text)}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                outline: "none",
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              color: "#001B45",
              includeFontPadding: false,
              marginBottom: 6,
            }}
          >
            Jenis Pembayaran
          </Text>

          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "#BDBDBD",
              borderRadius: 10,
              width: 394,
              height: 42,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setShowPembayaranDropdown(!showPembayaranDropdown);
            }}
          >
            {jenisPembayaran === null ? null : (
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                  includeFontPadding: false,
                }}
              >
                {jenisPembayaran}
              </Text>
            )}
          </TouchableOpacity>

          {/* Dropdown */}
          {showPembayaranDropdown ? (
            <View
              style={{
                backgroundColor: "#F4F4F4",
                width: 394,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  paddingVertical: 15,
                  borderBottomWidth: 2,
                  borderBottomColor: "#D9D9D9",
                }}
                onPress={() => {
                  setJenisPembayaran("Cash");
                  setShowPembayaranDropdown(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                  }}
                >
                  Cash
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  paddingVertical: 15,
                }}
                onPress={() => {
                  setJenisPembayaran("Debit/Transfer");
                  setShowPembayaranDropdown(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                  }}
                >
                  Debit/Transfer
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 18,
              color: "#001B45",
              includeFontPadding: false,
              marginBottom: 6,
              marginTop: 21,
            }}
          >
            Tanggal
          </Text>

          <View
            style={{
              borderWidth: 2,
              borderColor: "#BDBDBD",
              borderRadius: 10,
              width: 394,
              height: 42,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
              }}
            >
              {new Date().toISOString().substring(0, 10)}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            borderRadius: 10,
            paddingLeft: 24,
            paddingRight: 14,
            paddingTop: 22,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
              }}
            >
              Total
            </Text>

            <View
              style={{
                width: 394,
                height: 42,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                }}
              >
                {formatter.format(hargaTotal)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
              }}
            >
              Tunai
            </Text>

            <View
              style={{
                width: 394,
                height: 42,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <TextInput
                value={nominalBayar}
                placeholder="0"
                placeholderTextColor="#333"
                onChangeText={(text) => {
                  setNominalBayar(text.replace(/[^0-9]/g, ""));

                  if (text - hargaTotal < 0) {
                    setNominalKembalian(0);
                  } else {
                    setNominalKembalian(text - hargaTotal);
                  }
                }}
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                  outline: "none",
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
              }}
            >
              Kembalian
            </Text>

            <View
              style={{
                width: 394,
                height: 42,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                }}
              >
                {formatter.format(nominalKembalian)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content Table */}
      <View
        style={{
          backgroundColor: "white",
          height: 584,
          margin: 14,
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 2,
            borderBottomColor: "#D9D9D9",
            paddingTop: 17,
            paddingBottom: 13,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              width: 410,
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Item
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
              flex: 1,
            }}
          >
            Stock
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
              flex: 1,
            }}
          >
            Quantity
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
              flex: 1,
            }}
          >
            Harga
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
              flex: 1,
            }}
          >
            Total
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
              flex: 1,
            }}
          >
            Tindakan
          </Text>
        </View>

        <View>
          <FlatList
            data={penjualanItem}
            extraData={refresh}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: 410,
                    paddingHorizontal: 8,
                    paddingVertical: 9,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 42,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: 10,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      let data = penjualanItem;

                      Object.assign(data[index], {
                        showItemDropdown: !data[index].showItemDropdown,
                      });

                      setPenjualanItem(data);
                      setPenjualanItemIndex(index);
                      setRefresh(!refresh);
                    }}
                  >
                    {item.item === null ? null : (
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 16,
                          color: "#333",
                          includeFontPadding: false,
                        }}
                      >
                        {item.item.nama_obat}
                      </Text>
                    )}
                  </TouchableOpacity>

                  {item.showItemDropdown ? (
                    <View
                      style={{
                        height: 200,
                        backgroundColor: "#F4F4F4",
                        borderRadius: 10,
                      }}
                    >
                      <FlatList
                        data={dataObat}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              paddingVertical: 15,
                              borderBottomWidth:
                                index + 1 === dataObat.length ? 0 : 2,
                              borderBottomColor: "#D9D9D9",
                            }}
                            onPress={() => {
                              let data = penjualanItem;

                              Object.assign(data[penjualanItemIndex], {
                                item: item,
                                hargaTotal: 0,
                                showItemDropdown: false,
                              });

                              setPenjualanItem(data);
                              setPenjualanItemIndex(null);
                              setRefresh(!refresh);
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: 16,
                                color: "#333",
                                includeFontPadding: false,
                              }}
                            >
                              {item.nama_obat}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  ) : null}
                </View>

                <View
                  style={{ paddingHorizontal: 8, paddingVertical: 9, flex: 1 }}
                >
                  <View
                    style={{
                      height: 42,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        color: "#333",
                        includeFontPadding: false,
                      }}
                    >
                      {item.item === null ? null : item.item.stock.total_stock}
                    </Text>
                  </View>
                </View>

                <View
                  style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 9 }}
                >
                  <View
                    style={{
                      height: 42,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: 10,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    {item.item === null ? null : (
                      <TextInput
                        value={item.quantity}
                        placeholder="0"
                        placeholderTextColor="#333"
                        onChangeText={(text) => {
                          let data = penjualanItem;

                          Object.assign(data[index], {
                            quantity: text.replace(/[^0-9]/g, ""),
                            hargaTotal: text * item.item.harga_jual,
                          });

                          setPenjualanItem(data);
                          setRefresh(!refresh);
                        }}
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 16,
                          color: "#333",
                          includeFontPadding: false,
                          outline: "none",
                        }}
                      />
                    )}
                  </View>
                </View>

                <View
                  style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 9 }}
                >
                  <View
                    style={{
                      height: 42,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        color: "#333",
                        includeFontPadding: false,
                      }}
                    >
                      {item.item === null
                        ? null
                        : formatter.format(item.item.harga_jual)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 9 }}
                >
                  <View
                    style={{
                      height: 42,
                      borderWidth: 2,
                      borderColor: "#BDBDBD",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        color: "#333",
                        includeFontPadding: false,
                      }}
                    >
                      {item.item === null
                        ? null
                        : formatter.format(item.hargaTotal)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 8,
                      backgroundColor: "#CD4A4F",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      let data = penjualanItem;
                      let finalArr = [];

                      for (let i = 0; i < data.length; i++) {
                        if (i !== index) {
                          finalArr.push(data[i]);
                        }
                      }

                      setPenjualanItem(finalArr);
                      setRefresh(!refresh);
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/exitItem.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 88,
              paddingVertical: 8,
              backgroundColor: "#2FA33B",
              borderRadius: 8,
            }}
            onPress={() => {
              let data = penjualanItem;

              data.push({
                item: null,
                quantity: null,
                hargaTotal: null,
                showItemDropdown: false,
              });

              setPenjualanItem(data);
              setRefresh(!refresh);
            }}
          >
            <Image
              source={require("../../../assets/images/plusPembelian.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <LoadingModal visible={isLoadingInput} />
    </ScrollView>
  );
};

export default PenjualanAdd;
