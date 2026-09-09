import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

interface ParentGateProps {
  onUnlock: () => void;
  onCancel: () => void;
}

export function ParentGate({ onUnlock, onCancel }: ParentGateProps) {
  const [held, setHeld] = useState(false);
  const [pressStartedAt, setPressStartedAt] = useState<number | null>(null);

  const startHold = () => {
    setHeld(true);
    setPressStartedAt(Date.now());
  };

  const finishHold = () => {
    const elapsed = pressStartedAt ? Date.now() - pressStartedAt : 0;
    setHeld(false);
    setPressStartedAt(null);
    if (elapsed >= 1400) onUnlock();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>GROWN-UP CHECK</Text>
        <Text style={styles.title}>Hold the button for a moment</Text>
        <Text style={styles.note}>
          This keeps settings safe while little fingers explore.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Hold to open grown-up settings"
          onPressIn={startHold}
          onPressOut={finishHold}
          style={[styles.holdButton, held && styles.holdButtonActive]}
        >
          <Text style={styles.holdButtonText}>{held ? "Keep holding…" : "Hold to continue"}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancel and return to play"
          onPress={onCancel}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Back to play</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 26,
    shadowColor: "#253052",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  eyebrow: {
    color: colors.coral,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    color: colors.textDark,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
  },
  note: {
    color: colors.textDark,
    opacity: 0.65,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 9,
    marginBottom: 22,
  },
  holdButton: {
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  holdButtonActive: {
    backgroundColor: colors.mint,
    transform: [{ scale: 0.98 }],
  },
  holdButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  cancelButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    color: colors.textDark,
    opacity: 0.65,
    fontSize: 14,
    fontWeight: "700",
  },
});
