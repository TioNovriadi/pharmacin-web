import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import HeaderPage from "../../../component/HeaderPage";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const PabrikanRincian = ({ route }) => {
  const { pabrikData } = route.params;

  const { userToken } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [dataKategori, setDataKategori] = useState(null);
  const [showDropdownKategori, setShowDropdownKategori] = useState(false);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState(null);
  const [dataObat, setDataObat] = useState(null);
  const [dataObatView, setDataObatView] = useState(null);

  const searchFilter = (text) => {
    if (text) {
      const newData = dataObat.filter((item) => {
        const itemData = item.nama_obat
          ? item.nama_obat.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setDataObatView(newData);
      setSearch(text);
    } else {
      setDataObatView(dataObat);
      setSearch(text);
    }
  };

  const kategoriFilter = (namaKategori) => {
    const newData = dataObat.filter((item) => {
      return item.kategoriObat.nama_kategori === namaKategori;
    });

    setDataObatView(newData);
    setKategori(namaKategori);
    setShowDropdownKategori(false);
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
            setDataObat(pabrikData.obats);
            setDataObatView(pabrikData.obats);
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
    <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage
        pageName="Pabrikan"
        pageSubmenu="/ Kelola Pabrik / Rincian Pabrik"
      />

      {/* Content Name */}
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 14,
          marginTop: 24,
          paddingTop: 20,
          paddingLeft: 37,
          paddingBottom: 17.12,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 24,
            color: "#062659",
            marginBottom: 10,
          }}
        >
          {pabrikData.nama_pabrik}
        </Text>

        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: "#333333",
            marginBottom: 10,
          }}
        >
          {pabrikData.email_pabrik === null ? " - " : pabrikData.email_pabrik}
        </Text>

        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: "#333333",
          }}
        >
          {pabrikData.no_telp_pabrik === null
            ? " - "
            : pabrikData.no_telp_pabrik}
        </Text>
      </View>

      {/* Content Tabel */}
      <View
        style={{
          height: 754,
          backgroundColor: "white",
          marginHorizontal: 14,
          marginBottom: 14,
          marginTop: 12.88,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ zIndex: 9999 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#2FA33B",
                paddingHorizontal: 14,
                width: 208,
                height: 42,
                borderRadius: 10,
              }}
              onPress={() => {
                setShowDropdownKategori(!showDropdownKategori);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  color: "white",
                  flex: 1,
                }}
              >
                {kategori === null ? "Jenis Obat" : kategori}
              </Text>

              <Image
                source={require("../../../assets/images/dropdownWhite.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>

            {showDropdownKategori ? (
              <View
                style={{
                  width: 208,
                  height: 200,
                  backgroundColor: "#F4F4F4",
                  position: "absolute",
                  borderRadius: 10,
                  top: "-450%",
                  zIndex: 9999,
                }}
              >
                <FlatList
                  data={dataKategori}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        paddingVertical: 10,
                        borderBottomWidth:
                          index + 1 === dataKategori.length ? 0 : 2,
                        borderBottomColor: "#D9D9D9",
                      }}
                      onPress={() => kategoriFilter(item.nama_kategori)}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 16,
                          color: "#333",
                        }}
                      >
                        {item.nama_kategori}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#062659",
              width: 42,
              height: 42,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginHorizontal: 10,
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
              paddingHorizontal: 8,
              width: 253,
              height: 42,
              borderRadius: 10,
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
                includeFontPadding: false,
                flex: 1,
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 17,
              paddingBottom: 13,
              borderBottomWidth: 2,
              borderBottomColor: "#D9D9D9",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#062659",
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
                color: "#062659",
                flex: 1,
              }}
            >
              Nama Obat
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#062659",
                flex: 1,
              }}
            >
              Nama Generik
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#062659",
                flex: 1,
              }}
            >
              Kategori
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#062659",
                flex: 1,
                textAlign: "center",
              }}
            >
              Harga Beli
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#062659",
                flex: 1,
                textAlign: "center",
              }}
            >
              Harga Jual
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#062659",
                flex: 1,
                textAlign: "center",
              }}
            >
              Stock
            </Text>
          </View>

          <FlatList
            data={dataObatView}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: (index + 1) % 2 === 0 ? "#F4F4F4" : null,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    width: 100,
                    textAlign: "center",
                    paddingVertical: 15,
                  }}
                >
                  {index + 1}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    flex: 1,
                    paddingVertical: 15,
                  }}
                >
                  {item.nama_obat}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    flex: 1,
                    paddingVertical: 15,
                  }}
                >
                  {item.generik_obat === null ? " - " : item.generik_obat}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    flex: 1,
                    paddingVertical: 15,
                  }}
                >
                  {item.kategoriObat.nama_kategori}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    flex: 1,
                    textAlign: "center",
                    paddingVertical: 15,
                  }}
                >
                  {formatter.format(item.harga_beli)}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    flex: 1,
                    textAlign: "center",
                    paddingVertical: 15,
                  }}
                >
                  {formatter.format(item.harga_jual)}
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#062659",
                    flex: 1,
                    textAlign: "center",
                    paddingVertical: 15,
                  }}
                >
                  {item.stock.total_stock}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PabrikanRincian;
