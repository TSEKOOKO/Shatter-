import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { layout } from "../constants/theme";

interface BackButtonProps {
  onPress: () => void;
}

// Always present, always large, always in the same corner. A toddler
// (or a parent handing the phone back) should never get stuck.
export function BackButton({ onPress }: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back home"
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.arrow}>←</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 48,
    left: 24,
    width: layout.touchTargetMin,
    height: layout.touchTargetMin,
    borderRadius: layout.touchTargetMin / 2,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  arrow: {
    fontSize: 32,
    color: "#4A4038",
  },
});
