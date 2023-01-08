import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Touchable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import LoadingModal from "../../../component/LoadingModal";
import toast from "../../../utils/helper/Toast";
import { DatePickerModal } from "react-native-paper-dates";
import HeaderPage from "../../../component/HeaderPage";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const PembelianAdd = ({ navigation }) => {
  const { userToken, userId } = useContext(AuthContext);

  const [dataPabrik, setDataPabrik] = useState(null);
  const [dataPembelian, setDataPembelian] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoadingInput, setIsLoadingInput] = useState(false);
  const [pabrik, setPabrik] = useState(null);
  const [nomorInvoice, setNomorInvoice] = useState(null);
  const [showDropdownPabrik, setShowDropdownPabrik] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);
  const [pemebelianItem, setPemebelianItem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [chooseDate, setChooseDate] = useState(null);

  const addData = async (userId, hargaTotal, nomorInvoice, pembelianItem) => {
    setIsLoadingInput(true);

    const batches = pembelianItem.map((tmp) => {
      return {
        obatId: tmp.item.id,
        kodeBatch: tmp.kodeBatch,
        kadaluarsa: tmp.kadaluarsa,
        stockMasuk: tmp.quantity,
        hargaTotal: tmp.hargaTotal,
      };
    });

    await fetch(API_ACCESS.add_pembelian, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        userId: userId,
        pabrikId: pabrik.id,
        nomorInvoice: nomorInvoice,
        hargaTotal: hargaTotal,
        batches: batches,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Pembelian berhasil terdaftar!") {
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

  const onDismiss = useCallback(() => {
    setShowDateModal(false);
  }, [setShowDateModal]);

  const onConfirm = useCallback(
    (params) => {
      setChooseDate(params.date);
      setShowDateModal(false);
    },
    [setShowDateModal, setChooseDate]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading1(true);

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
          setIsLoading1(false);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading2(true);

      await fetch(API_ACCESS.get_all_pembelian, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "Data fetched!") {
            setDataPembelian(json.data);

            const nomor = `${new Date().toISOString().substring(0, 4)}/INV/${
              json.data.length + 1
            }`;

            setNomorInvoice(nomor);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading2(false);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pemebelianItem.length > 0) {
      let total = 0;

      for (let i = 0; i < pemebelianItem.length; i++) {
        if (pemebelianItem[i].hargaTotal !== null) {
          total += pemebelianItem[i].hargaTotal;
        }
      }

      setTotalHarga(total);
    } else {
      setTotalHarga(0);
    }
  }, [refresh]);

  useEffect(() => {
    if (chooseDate !== null) {
      let data = pemebelianItem;

      Object.assign(data[itemIndex], {
        kadaluarsa: chooseDate.toISOString().substring(0, 10),
      });

      setPemebelianItem(data);
      setItemIndex(null);
      setRefresh(!refresh);
    }
  }, [chooseDate]);

  if (isLoading1 || isLoading2) {
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
    <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Pembelian" pageSubmenu="/ Pembelian Baru" />

      {/* Content */}
      <View
        style={{ flexDirection: "row", marginHorizontal: 14, marginTop: 24 }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingTop: 18,
            paddingHorizontal: 24,
            paddingBottom: 25,
            borderRadius: 10,
            marginRight: 14,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
              }}
            >
              Nama Pabrik
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: 394,
                height: 42,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                paddingHorizontal: 16,
                marginTop: 6,
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
                    color: "#333",
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
                  width: 394,
                  height: 200,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                }}
              >
                <FlatList
                  data={dataPabrik}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        paddingVertical: 15,
                        borderBottomWidth:
                          index + 1 === dataPabrik.length ? 0 : 2,
                        borderBottomColor: "#D9D9D9",
                      }}
                      onPress={() => {
                        setIsLoadingInput(true);
                        setPabrik(item);
                        setPemebelianItem([]);
                        setShowDropdownPabrik(false);
                        setIsLoadingInput(false);
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 16,
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

          <View style={{ marginTop: 21 }}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
              }}
            >
              Nomor Invoice
            </Text>

            <View
              style={{
                justifyContent: "center",
                width: 394,
                height: 42,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                paddingHorizontal: 16,
                marginTop: 6,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                }}
              >
                {nomorInvoice}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 21 }}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "#001B45",
              }}
            >
              Tanggal
            </Text>

            <View
              style={{
                justifyContent: "center",
                width: 394,
                height: 42,
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                paddingHorizontal: 16,
                marginTop: 6,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333",
                }}
              >
                {new Date().toISOString().slice(0, 10)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            paddingTop: 22,
            paddingLeft: 24,
            paddingRight: 14,
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
                borderWidth: 2,
                borderColor: "#BDBDBD",
                borderRadius: 10,
                justifyContent: "center",
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 18,
                  color: "#001B45",
                }}
              >
                {formatter.format(totalHarga)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 584,
          backgroundColor: "white",
          margin: 14,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingTop: 17,
            paddingBottom: 13,
            paddingHorizontal: 8,
            borderBottomWidth: 2,
            borderBottomColor: "#D9D9D9",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              width: 394,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Item
          </Text>

          <Text
            style={{
              width: 120,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Batch
          </Text>

          <Text
            style={{
              width: 140,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Kadaluarsa
          </Text>

          <Text
            style={{
              width: 90,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Quantity
          </Text>

          <Text
            style={{
              width: 120,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Harga
          </Text>

          <Text
            style={{
              width: 120,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Total
          </Text>

          <Text
            style={{
              width: 120,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#001B45",
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            Tindakan
          </Text>
        </View>

        {pabrik ? (
          <View>
            <View>
              <FlatList
                data={pemebelianItem}
                extraData={refresh}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 8,
                      paddingVertical: 9,
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <TouchableOpacity
                        style={{
                          width: 394,
                          height: 42,
                          borderWidth: 2,
                          borderColor: "#BDBDBD",
                          borderRadius: 10,
                          justifyContent: "center",
                          paddingHorizontal: 10,
                        }}
                        onPress={() => {
                          let data = pemebelianItem;

                          Object.assign(data[index], {
                            showItemModal: !data[index].showItemModal,
                          });

                          setPemebelianItem(data);
                          setItemIndex(index);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Medium",
                            fontSize: 14,
                            color: "#333",
                          }}
                        >
                          {item.item === null ? null : item.item.nama_obat}
                        </Text>
                      </TouchableOpacity>

                      {item.showItemModal ? (
                        <View
                          style={{
                            width: 394,
                            height: 200,
                            backgroundColor: "#F4F4F4",
                            borderRadius: 10,
                          }}
                        >
                          <FlatList
                            data={pabrik.obats}
                            renderItem={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  style={{
                                    alignItems: "center",
                                    paddingVertical: 10,
                                    borderBottomWidth:
                                      index + 1 === pabrik.obats.length ? 0 : 2,
                                    borderBottomColor: "#D9D9D9",
                                  }}
                                  onPress={async () => {
                                    let itemAnswer = pemebelianItem;

                                    let kode = 0;

                                    if (dataPembelian.length > 0) {
                                      for (
                                        let i = 0;
                                        i < dataPembelian.length;
                                        i++
                                      ) {
                                        for (
                                          let j = 0;
                                          j < dataPembelian[i].batches.length;
                                          j++
                                        ) {
                                          if (
                                            dataPembelian[i].batches[j]
                                              .obat_id === item.id
                                          ) {
                                            kode = kode + 1;
                                          }
                                        }

                                        kode = kode + 1;
                                      }
                                    } else {
                                      kode = kode + 1;
                                    }

                                    const first = "" + kode;
                                    const pad = "0000";
                                    const final =
                                      pad.substring(
                                        0,
                                        pad.length - first.length
                                      ) + first;

                                    Object.assign(itemAnswer[itemIndex], {
                                      showItemModal: false,
                                      item: item,
                                      kodeBatch:
                                        item.nama_obat.toUpperCase() + final,
                                      kadaluarsa: new Date()
                                        .toISOString()
                                        .substring(0, 10),
                                      quantity: 0,
                                      hargaBeli: item.harga_beli,
                                      hargaTotal: 0,
                                    });

                                    setPemebelianItem(itemAnswer);
                                    setItemIndex(null);
                                    setRefresh(!refresh);
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Poppins-Regular",
                                      fontSize: 16,
                                      color: "#333",
                                    }}
                                  >
                                    {item.nama_obat}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      ) : null}
                    </View>

                    <View
                      style={{
                        width: 120,
                        height: 42,
                        borderWidth: 2,
                        borderColor: "#BDBDBD",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 14,
                          color: "#333",
                        }}
                      >
                        {item.kodeBatch === null ? null : item.kodeBatch}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        width: 140,
                        height: 42,
                        borderWidth: 2,
                        borderColor: "#BDBDBD",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setItemIndex(index);
                        setShowDateModal(true);
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 14,
                          color: "#333",
                        }}
                      >
                        {item.kadaluarsa === null ? null : item.kadaluarsa}
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        width: 90,
                        height: 42,
                        borderWidth: 2,
                        borderColor: "#BDBDBD",
                        borderRadius: 10,
                        justifyContent: "center",
                      }}
                    >
                      <TextInput
                        value={item.quantity}
                        onChangeText={(text) => {
                          let input = pemebelianItem;

                          Object.assign(input[index], {
                            quantity: text.replace(/[^0-9]/g, ""),
                          });

                          Object.assign(input[index], {
                            hargaTotal:
                              input[index].quantity * input[index].hargaBeli,
                          });

                          setPemebelianItem(input);
                          setRefresh(!refresh);
                        }}
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 14,
                          color: "#333",
                          outline: "none",
                          textAlign: "center",
                        }}
                      />
                    </View>

                    <View
                      style={{
                        width: 120,
                        height: 42,
                        borderWidth: 2,
                        borderColor: "#BDBDBD",
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 14,
                          color: "#333",
                        }}
                      >
                        {item.hargaBeli === null
                          ? null
                          : formatter.format(item.hargaBeli)}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 120,
                        height: 42,
                        borderWidth: 2,
                        borderColor: "#BDBDBD",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 14,
                          color: "#333",
                        }}
                      >
                        {item.hargaTotal === null
                          ? null
                          : formatter.format(item.hargaTotal)}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 120,
                        height: 42,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#CD4A4F",
                          borderRadius: 8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          let data = pemebelianItem;

                          const dataFilter = data.filter((tmp) => {
                            if (tmp !== data[index]) {
                              return tmp;
                            }
                          });

                          setPemebelianItem(dataFilter);
                          setRefresh(!refresh);
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/exitItem.png")}
                          style={{ width: 24, height: 24 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={{ alignItems: "center", marginTop: 12 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 88,
                  paddingVertical: 8,
                  backgroundColor: "#2FA33B",
                  borderRadius: 8,
                }}
                onPress={() => {
                  const addData = {
                    showItemModal: false,
                    item: null,
                    kodeBatch: null,
                    kadaluarsa: null,
                    quantity: null,
                    hargaBeli: null,
                    hargaTotal: null,
                  };

                  let existData = pemebelianItem;
                  existData.push(addData);

                  setPemebelianItem(existData);
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
        ) : null}
      </View>

      {/* Modal */}
      <LoadingModal visible={isLoadingInput} />

      <DatePickerModal
        visible={showDateModal}
        locale="id"
        label="Pilih tanggal"
        mode="single"
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        validRange={{
          startDate: new Date(),
        }}
        date={chooseDate}
      />
    </ScrollView>
  );
};

export default PembelianAdd;
