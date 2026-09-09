import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const PALETTE = [
  { name: "Red", emoji: "🍎", value: "#FF9278" },
  { name: "Blue", emoji: "💧", value: "#8CCEF1" },
  { name: "Yellow", emoji: "☀️", value: "#FFD86B" },
];

export function EnhancedColorScreen({ onBack }: { onBack: () => void }) {
  const { settings, recordActivityPlayed } = useSettings();
  const [selected, setSelected] = useState(PALETTE[0]);
  const [hasPlayed, setHasPlayed] = useState(false);
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.timing(scale, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, [scale, selected.name]);

  const choose = (color: (typeof PALETTE)[number]) => {
    setSelected(color);
    AudioManager.cue(color.name.toLowerCase() as "red" | "blue" | "yellow", settings);
    if (!hasPlayed) {
      setHasPlayed(true);
      recordActivityPlayed("colors");
    }
    scale.setValue(0.88);
    Animated.timing(scale, { toValue: 1, duration: 260, useNativeDriver: true }).start();
  };

  return (
    <View style={[styles.container, { backgroundColor: selected.value }]}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Color garden</Text>
      <Animated.View style={[styles.discovery, { transform: [{ scale }] }]}>
        <Text style={styles.object}>{selected.emoji}</Text>
        <Text style={styles.name}>{selected.name}</Text>
        <Text style={styles.caption}>A lovely color!</Text>
      </Animated.View>
      <Text style={styles.prompt}>Tap a color to discover it</Text>
      <View style={styles.row}>
        {PALETTE.map((color) => (
          <Pressable
            key={color.name}
            accessibilityRole="button"
            accessibilityLabel={`${color.name} color`}
            onPress={() => choose(color)}
            style={[styles.choice, { backgroundColor: color.value }, selected.name === color.name && styles.selected]}
          >
            <Text style={styles.choiceEmoji}>{color.emoji}</Text>
            <Text style={styles.choiceName}>{color.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800", marginBottom: 12 },
  discovery: { width: 240, height: 230, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.58)", alignItems: "center", justifyContent: "center" },
  object: { fontSize: 70 },
  name: { color: colors.textDark, fontSize: 30, fontWeight: "900", marginTop: 2 },
  caption: { color: colors.textDark, opacity: 0.65, fontSize: 14, marginTop: 4 },
  prompt: { color: colors.textDark, fontSize: 16, fontWeight: "700", marginTop: 25, marginBottom: 12 },
  row: { flexDirection: "row", gap: 10 },
  choice: { width: 102, minHeight: 92, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceEmoji: { fontSize: 30 },
  choiceName: { color: colors.textDark, fontSize: 14, fontWeight: "800", marginTop: 4 },
});
