import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import HeaderPage from "../../../component/HeaderPage";

const StockBatch = ({ navigation, route }) => {
  const { dataObat } = route.params;

  const [search, setSearch] = useState("");

  return (
    <ScrollView style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Stock" pageSubmenu="/ Obat / Obat (Per Batch)" />

      {/* Content */}
      <View
        style={{
          height: 908,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 7,
          marginHorizontal: 14,
          marginBottom: 14,
          padding: 14,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View
            style={{
              width: 253,
              height: 42,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#BDBDBD",
              alignItems: "center",
              paddingHorizontal: 8.82,
              flexDirection: "row",
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
                includeFontPadding: false,
                flex: 1,
              }}
            />
          </View>
        </View>

        {/* Content Table */}
        <View style={{ marginTop: 7 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 18,
              paddingBottom: 14,
              borderBottomWidth: 2,
              borderColor: "#D9D9D9",
            }}
          >
            <Text
              style={{
                width: 100,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                textAlign: "center",
              }}
            >
              No
            </Text>

            <Text
              style={{
                flex: 1,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
              }}
            >
              Nama Obat
            </Text>

            <Text
              style={{
                flex: 1,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
              }}
            >
              Nama Pabrik
            </Text>

            <Text
              style={{
                flex: 1,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
              }}
            >
              Batch ID
            </Text>

            <Text
              style={{
                flex: 1,
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
                flex: 1,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                textAlign: "center",
              }}
            >
              Stock Beli
            </Text>

            <Text
              style={{
                flex: 1,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#001B45",
                includeFontPadding: false,
                textAlign: "center",
              }}
            >
              Stock Sisa
            </Text>
          </View>

          <FlatList
            data={dataObat.batches}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 15,
                  backgroundColor: (index + 1) % 2 === 0 ? "#F4F4F4" : "white",
                }}
              >
                <Text
                  style={{
                    width: 100,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
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
                  {dataObat.nama_obat}
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
                  {dataObat.pabrik.nama_pabrik}
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
                  {item.kode_batch}
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
                  {item.kadaluarsa}
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
                  {item.stock_masuk}
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
                  {dataObat.stock.total_stock}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StockBatch;
