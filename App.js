import { View, Text } from "react-native";
import React from "react";
import ToastNotification from "./src/component/ToastNotification";
import AppNav from "./src/navigation/AppNav";
import { AuthProvider } from "./src/utils/context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastNotification />
        <AppNav />
      </AuthProvider>
    </>
  );
};

export default App;
