import {
  View,
  Text,
  Dimensions,
  DeviceEventEmitter,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SHOW_TOAST_MESSAGE } from "../utils/constant/toast";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const WIDTH = Dimensions.get("window").width;
const COLORS = {
  info: "#FBF5C5",
  success: "#DAFEDF",
  danger: "#FFDCDC",
};
const ICON = {
  info: require("../assets/images/info.png"),
  success: require("../assets/images/success.png"),
  danger: require("../assets/images/danger.png"),
};

const ToastNotification = () => {
  const animatedOpacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const animatedTranslateY = interpolate(
      animatedOpacity.value,
      [0, 1],
      [-20, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: animatedOpacity.value,
      transform: [
        {
          translateY: animatedTranslateY,
        },
      ],
    };
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [timeOutDuration, setTimeOutDuration] = useState(3000);

  const timeOutRef = useRef(null);

  const onNewToast = (data) => {
    setMessage(data.message);
    setMessageType(data.type);
  };

  const closeToast = () => {
    setMessage(null);
    setTimeOutDuration(2000);
  };

  useEffect(() => {
    if (message) {
      timeOutRef.current = setInterval(() => {
        if (timeOutDuration === 0) {
          closeToast();
        } else {
          setTimeOutDuration((prev) => prev - 1000);

          if (timeOutDuration === 1000) {
            animatedOpacity.value = withTiming(0, { duration: 500 });
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeOutRef.current);
    };
  }, [message, timeOutDuration]);

  useEffect(() => {
    if (message) {
      animatedOpacity.value = withTiming(1, { duration: 500 });
    }
  }, [message, animatedOpacity]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!message) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 50,
          backgroundColor: COLORS[messageType],
          width: 700,
          alignSelf: "center",
          paddingVertical: 20,
          paddingHorizontal: 31,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 10000,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <View style={{ marginRight: 20 }}>
        <Image source={ICON[messageType]} style={{ width: 22, height: 22 }} />
      </View>
      <Text
        style={{
          fontFamily: "Montserrat-SemiBold",
          fontSize: 14,
          color: "black",
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

export default ToastNotification;
