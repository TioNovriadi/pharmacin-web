import { View, Text, FlatList } from "react-native";
import React from "react";
import HeaderPage from "../../../component/HeaderPage";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const PenjualanRincian = ({ navigation, route }) => {
  const { dataPenjualan } = route.params;

  return (
    <View style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <HeaderPage pageName="Penjualan" pageSubmenu="/ Rincian Penjualan" />

      {/* Content */}
      <View
        style={{
          backgroundColor: "white",
          height: 908,
          borderRadius: 10,
          marginHorizontal: 14,
          marginTop: 17,
          marginBottom: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 28,
            paddingTop: 20,
            marginBottom: 14,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
                color: "#2FA33B",
                includeFontPadding: false,
                marginBottom: 10,
              }}
            >
              Nama Apotek
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                marginBottom: 4,
              }}
            >
              Alamat
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                marginBottom: 4,
              }}
            >
              apotek@gmail.com
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
              }}
            >
              0821xxxxxxxx
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
              }}
            >
              No Invoice: {dataPenjualan.nomor_invoice}
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
              }}
            >
              Tanggal Invoice:{" "}
              {dataPenjualan.tanggal_transaksi.substring(0, 10)}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F6F6F6",
              paddingVertical: 15,
              borderTopWidth: 2,
              borderColor: "#D9D9D9",
              borderBottomWidth: 2,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                flex: 2,
              }}
            >
              Nama Produk
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                flex: 1,
                textAlign: "center",
              }}
            >
              Qty
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                flex: 1,
                textAlign: "center",
              }}
            >
              Harga
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#333",
                includeFontPadding: false,
                flex: 1,
                textAlign: "center",
              }}
            >
              Total
            </Text>
          </View>

          <FlatList
            data={dataPenjualan.transaksiPenjualans}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    flex: 2,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                  }}
                >
                  {item.obat.nama_obat}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.obat.harga_jual)}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333",
                    includeFontPadding: false,
                    textAlign: "center",
                  }}
                >
                  {formatter.format(item.harga_total)}
                </Text>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 25,
            }}
          >
            <View style={{ width: 433 }}>
              <View
                style={{
                  backgroundColor: "#F6F6F6",
                  borderTopWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: "#D9D9D9",
                  alignItems: "center",
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 16,
                    color: "#333333",
                    includeFontPadding: false,
                  }}
                >
                  Invoice Summary
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  borderBottomWidth: 2,
                  borderColor: "#D9D9D9",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    includeFontPadding: false,
                  }}
                >
                  Total
                </Text>

                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#333333",
                    includeFontPadding: false,
                  }}
                >
                  {formatter.format(dataPenjualan.harga_total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PenjualanRincian;
