import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const ITEMS = [
  { name: "Flower", emoji: "🌼", tint: "#FFD86B" },
  { name: "Butterfly", emoji: "🦋", tint: "#A9A3F5" },
  { name: "Tree", emoji: "🌳", tint: "#7DD9C1" },
];

export function GardenScreen({ onBack }: { onBack: () => void }) {
  const { settings } = useSettings();
  const [selected, setSelected] = useState(ITEMS[0]);
  const [watered, setWatered] = useState(false);
  const scale = useRef(new Animated.Value(0.86)).current;

  const choose = (item: (typeof ITEMS)[number]) => {
    setSelected(item);
    setWatered(false);
    AudioManager.effect("crystal_chime", settings);
    scale.setValue(0.86);
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();
  };

  const water = () => {
    setWatered(true);
    AudioManager.effect("bubble_pop", settings);
    scale.setValue(0.9);
    Animated.spring(scale, { toValue: 1.05, friction: 4, tension: 70, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Little garden</Text>
      <Text style={styles.prompt}>Touch a friend, then give it water</Text>
      <Animated.View style={[styles.stage, { backgroundColor: selected.tint, transform: [{ scale }] }]}>
        <Text style={styles.object}>{selected.emoji}</Text>
        <Text style={styles.name}>{selected.name}</Text>
        <Text style={styles.caption}>{watered ? "So fresh and happy!" : "Waiting for a little care"}</Text>
      </Animated.View>
      <Pressable accessibilityRole="button" accessibilityLabel="Water the garden" onPress={water} style={styles.waterButton}>
        <Text style={styles.waterEmoji}>💧</Text><Text style={styles.waterText}>Water</Text>
      </Pressable>
      <View style={styles.row}>
        {ITEMS.map((item) => (
          <Pressable key={item.name} accessibilityRole="button" accessibilityLabel={`Show ${item.name}`} onPress={() => choose(item)} style={[styles.choice, { backgroundColor: item.tint }, selected.name === item.name && styles.selected]}>
            <Text style={styles.choiceEmoji}>{item.emoji}</Text>
            <Text style={styles.choiceName}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800" },
  prompt: { color: colors.textDark, opacity: 0.6, fontSize: 14, marginTop: 5, marginBottom: 17, textAlign: "center" },
  stage: { width: 275, height: 230, borderRadius: 30, alignItems: "center", justifyContent: "center" },
  object: { fontSize: 82 },
  name: { color: colors.textDark, fontSize: 25, fontWeight: "900", marginTop: 3 },
  caption: { color: colors.textDark, opacity: 0.68, fontSize: 14, marginTop: 5 },
  waterButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#8CCEF1", paddingHorizontal: 23, paddingVertical: 12, borderRadius: 22, marginTop: 14 },
  waterEmoji: { fontSize: 20, marginRight: 7 },
  waterText: { color: colors.textDark, fontSize: 15, fontWeight: "900" },
  row: { flexDirection: "row", gap: 10, marginTop: 16 },
  choice: { width: 102, minHeight: 85, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceEmoji: { fontSize: 31 },
  choiceName: { color: colors.textDark, fontSize: 13, fontWeight: "800", marginTop: 3 },
});
