import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import HeaderPage from "../../../component/HeaderPage";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const StockHome = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataObat, setDataObat] = useState(null);

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
      <HeaderPage pageName="Stock" pageSubmenu="/ Obat" />

      {/* Content */}
      <View
        style={{
          backgroundColor: "white",
          height: 908,
          borderRadius: 10,
          marginTop: 17,
          marginHorizontal: 14,
          marginBottom: 14,
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              width: 253,
              height: 42,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#BDBDBD",
              paddingHorizontal: 8.82,
              alignItems: "center",
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
              onChangeText={(text) => setSearch(text)}
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

        {/* Content Table */}
        <View style={{ marginTop: 7 }}>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 18,
              paddingBottom: 14,
              borderBottomColor: "#D9D9D9",
              borderBottomWidth: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                width: 100,
                textAlign: "center",
                includeFontPadding: false,
              }}
            >
              No
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                includeFontPadding: false,
              }}
            >
              Nama Obat
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                includeFontPadding: false,
              }}
            >
              Nama Pabrik
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                includeFontPadding: false,
              }}
            >
              Kategori
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
                includeFontPadding: false,
              }}
            >
              Harga Beli
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
                includeFontPadding: false,
              }}
            >
              Harga Jual
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                flex: 1,
                textAlign: "center",
                includeFontPadding: false,
              }}
            >
              Stock
            </Text>
          </View>

          {/* Table */}
          <FlatList
            data={dataObat}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 14,
                  backgroundColor: (index + 1) % 2 === 0 ? "#F4F4F4" : "white",
                }}
                onPress={() => {
                  navigation.navigate("Stock", {
                    screen: "StockBatch",
                    params: {
                      dataObat: item,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    width: 100,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                  }}
                >
                  {item.nama_obat}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                  }}
                >
                  {item.pabrik.nama_pabrik}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                  }}
                >
                  {item.kategoriObat.nama_kategori}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.harga_beli)}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.harga_jual)}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {item.stock.total_stock}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StockHome;
