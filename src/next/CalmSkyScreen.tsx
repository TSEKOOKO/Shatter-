import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const SKY_OBJECTS = [
  { name: "Star", emoji: "⭐", tint: "#FFF4B8" },
  { name: "Moon", emoji: "🌙", tint: "#E9E7FF" },
  { name: "Cloud", emoji: "☁️", tint: "#FFFFFF" },
];

export function CalmSkyScreen({ onBack }: { onBack: () => void }) {
  const { settings } = useSettings();
  const [selected, setSelected] = useState(SKY_OBJECTS[0]);
  const [stars, setStars] = useState(0);
  const fade = useRef(new Animated.Value(0.86)).current;

  const choose = (object: (typeof SKY_OBJECTS)[number]) => {
    setSelected(object);
    if (object.name === "Star") setStars((value) => Math.min(value + 1, 9));
    AudioManager.effect("crystal_chime", settings);
    fade.setValue(0.86);
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Calm sky</Text>
      <Text style={styles.prompt}>A quiet place to notice little lights</Text>
      <Animated.View style={[styles.sky, { opacity: fade }]}>
        <Text style={styles.object}>{selected.emoji}</Text>
        <Text style={styles.name}>{selected.name}</Text>
        <Text style={styles.caption}>{stars ? `${stars} soft star${stars === 1 ? "" : "s"}` : "The sky is waiting"}</Text>
        <Text style={styles.decorOne}>✦</Text>
        <Text style={styles.decorTwo}>·</Text>
      </Animated.View>
      <View style={styles.row}>
        {SKY_OBJECTS.map((object) => (
          <Pressable key={object.name} onPress={() => choose(object)} accessibilityRole="button" accessibilityLabel={`Show ${object.name}`} style={[styles.choice, { backgroundColor: object.tint }, selected.name === object.name && styles.selected]}>
            <Text style={styles.choiceEmoji}>{object.emoji}</Text>
            <Text style={styles.choiceName}>{object.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#202A53", alignItems: "center", justifyContent: "center" },
  title: { color: "#FFF8F1", fontSize: 26, fontWeight: "800" },
  prompt: { color: "#FFF8F1", opacity: 0.68, fontSize: 14, marginTop: 5, marginBottom: 18, textAlign: "center" },
  sky: { width: 280, height: 260, borderRadius: 34, backgroundColor: "#334477", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  object: { fontSize: 82 },
  name: { color: "#FFF8F1", fontSize: 25, fontWeight: "900", marginTop: 3 },
  caption: { color: "#FFF8F1", opacity: 0.72, fontSize: 14, marginTop: 5 },
  decorOne: { position: "absolute", left: 38, top: 35, color: "#FFF4B8", fontSize: 26 },
  decorTwo: { position: "absolute", right: 50, bottom: 45, color: "#FFF4B8", fontSize: 30 },
  row: { flexDirection: "row", gap: 10, marginTop: 22 },
  choice: { width: 102, minHeight: 92, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: "#FFF8F1" },
  choiceEmoji: { fontSize: 34 },
  choiceName: { color: colors.textDark, fontSize: 13, fontWeight: "800", marginTop: 4 },
});
