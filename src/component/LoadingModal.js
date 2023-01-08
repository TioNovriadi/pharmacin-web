import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";

const LoadingModal = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
