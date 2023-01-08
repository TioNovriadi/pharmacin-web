import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { API_ACCESS } from "../config/Endpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import toast from "../helper/Toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [kasirStatus, setKasirStatus] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);

    await fetch(API_ACCESS.login, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Login success!") {
          setUserToken(json.token);
          setUserId(json.userId);
          setKasirStatus(false);
          AsyncStorage.setItem("userToken", json.token);
          AsyncStorage.setItem("userId", JSON.stringify(json.userId));
          AsyncStorage.setItem("kasirStatus", false);
          toast.success({ message: "Login berhasil!" });
        } else {
          if (json.responseText) {
            toast.danger({ message: "Email atau Password salah!" });
          } else {
            toast.danger({ message: json.messages.errors[0].message });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserId(null);
    setKasirStatus(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("kasirStatus");
    toast.success({ message: "Logout berhasil!" });
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);

      let userId = await AsyncStorage.getItem("userId");
      let userToken = await AsyncStorage.getItem("userToken");
      let kasirStatus = await AsyncStorage.getItem("kasirStatus");
      JSON.parse(userId);

      if (userId) {
        setUserToken(userToken);
        setUserId(userId);
        setKasirStatus(JSON.parse(kasirStatus));
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userToken,
        userId,
        isLoading,
        kasirStatus,
        setKasirStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
