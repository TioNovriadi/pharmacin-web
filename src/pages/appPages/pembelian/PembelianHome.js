import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { API_ACCESS } from "../../../utils/config/Endpoint";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import HeaderPage from "../../../component/HeaderPage";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const PembelianHome = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [search, setSearch] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [dataPembelian, setDataPembelian] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDismiss = useCallback(() => {
    setShowDate(false);
  }, [setShowDate]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setShowDate(false);
      setRange({ startDate, endDate });
    },
    [setShowDate, setRange]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

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
  }, [isFocused]);

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
      <HeaderPage pageName="Pembelian" pageSubmenu="/ Kelola Pembelian" />

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: "#5C6D88",
                paddingHorizontal: 35.5,
                paddingVertical: 9,
                borderRadius: 10,
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
                  includeFontPadding: false,
                }}
              >
                {range.startDate === undefined
                  ? "YYYY-MM-DD"
                  : range.startDate.toISOString().substring(0, 10)}
              </Text>
            </TouchableOpacity>

            <Image
              source={require("../../../assets/images/arrow.png")}
              style={{ width: 24, height: 24, marginHorizontal: 20 }}
            />

            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: "#5C6D88",
                paddingHorizontal: 35.5,
                paddingVertical: 9,
                borderRadius: 10,
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
                  includeFontPadding: false,
                }}
              >
                {range.endDate === undefined
                  ? "YYYY-MM-DD"
                  : range.endDate.toISOString().substring(0, 10)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
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
                navigation.navigate("Pembelian", {
                  screen: "PembelianAdd",
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
                Tambah Pembelian
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
              textAlign: "center",
              width: 100,
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
            No Invoice
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
            Nama Pabrikan
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
            Tanggal
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
            Total Pembelian
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
            Tindakan
          </Text>
        </View>

        <FlatList
          data={dataPembelian}
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
                  width: 100,
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333333",
                  includeFontPadding: false,
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
                  color: "#333333",
                  includeFontPadding: false,
                }}
              >
                {item.nomor_invoice}
              </Text>

              <Text
                style={{
                  flex: 1,
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333333",
                  includeFontPadding: false,
                }}
              >
                {item.pabrik.nama_pabrik}
              </Text>

              <Text
                style={{
                  flex: 1,
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333333",
                  includeFontPadding: false,
                  textAlign: "center",
                }}
              >
                {item.tanggal_pembelian.substring(0, 10)}
              </Text>

              <Text
                style={{
                  flex: 1,
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "#333333",
                  includeFontPadding: false,
                  textAlign: "center",
                }}
              >
                {formatter.format(item.harga_total)}
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#CD4A4F",
                    padding: 8,
                    borderRadius: 8,
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

      {/* Modal */}
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
    </ScrollView>
  );
};

export default PembelianHome;
