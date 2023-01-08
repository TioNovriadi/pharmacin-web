import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../utils/context/AuthContext";
import AuthStack from "../router/AuthStack";
import AppStack from "../router/AppStack";
import LoadingModal from "../component/LoadingModal";

const config = {
  screens: {
    Login: "login",
    Register: "register",
  },
};

const linking = {
  config,
};

const AppNav = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingModal visible={isLoading} />;
  }

  return (
    <NavigationContainer fallback={<Text>Loading...</Text>} linking={linking}>
      {userToken === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNav;
