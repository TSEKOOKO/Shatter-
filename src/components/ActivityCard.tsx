import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { layout } from "../constants/theme";

interface ActivityCardProps {
  label: string;
  emoji: string;
  color: string;
  onPress: () => void;
}

// One giant, forgiving touch target per card. No text-reading required to
// understand what the card does - emoji + color + shape carry the meaning.
export function ActivityCard({ label, emoji, color, onPress }: ActivityCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: color, transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: layout.cardRadius,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  emoji: {
    fontSize: 56,
  },
  label: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
    color: "#4A4038",
  },
});
