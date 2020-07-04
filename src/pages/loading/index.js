import React, { useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { Container } from "@components/styles";
import { Animated, Easing } from "react-native";

export default function Loading() {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Set Animation loop
  const animation = useRef(
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true, // To make use of native driver for performance
      })
    )
  ).current;

  useEffect(() => {
    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <Container>
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
          alignSelf: "center",
        }}
      >
        <FontAwesome5 name="spinner" size={64} color="#000" />
      </Animated.View>
    </Container>
  );
}
