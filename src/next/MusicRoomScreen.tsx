import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const INSTRUMENTS = [
  { name: "Drum", emoji: "🥁", tint: "#FF9278", sound: "bubble_pop" as const },
  { name: "Bell", emoji: "🔔", tint: "#FFD86B", sound: "crystal_chime" as const },
  { name: "Star", emoji: "⭐", tint: "#A9A3F5", sound: "crystal_chime" as const },
];

export function MusicRoomScreen({ onBack }: { onBack: () => void }) {
  const { settings } = useSettings();
  const [selected, setSelected] = useState(INSTRUMENTS[0]);
  const [beats, setBeats] = useState(0);
  const scale = useRef(new Animated.Value(1)).current;

  const tap = (instrument: (typeof INSTRUMENTS)[number]) => {
    setSelected(instrument);
    setBeats((value) => (value >= 9 ? 1 : value + 1));
    AudioManager.effect(instrument.sound, settings);
    scale.setValue(0.88);
    Animated.spring(scale, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Music room</Text>
      <Text style={styles.prompt}>Tap and make a little rhythm</Text>
      <Animated.View style={[styles.stage, { backgroundColor: selected.tint, transform: [{ scale }] }]}>
        <Text style={styles.instrument}>{selected.emoji}</Text>
        <Text style={styles.name}>{selected.name}</Text>
        <Text style={styles.beats}>{beats ? `${beats} little beat${beats === 1 ? "" : "s"}` : "Ready to play"}</Text>
      </Animated.View>
      <View style={styles.row}>
        {INSTRUMENTS.map((instrument) => (
          <Pressable key={instrument.name} onPress={() => tap(instrument)} accessibilityRole="button" accessibilityLabel={`Play ${instrument.name}`} style={[styles.choice, { backgroundColor: instrument.tint }, selected.name === instrument.name && styles.selected]}>
            <Text style={styles.choiceEmoji}>{instrument.emoji}</Text>
            <Text style={styles.choiceName}>{instrument.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800" },
  prompt: { color: colors.textDark, opacity: 0.6, fontSize: 14, marginTop: 5, marginBottom: 18 },
  stage: { width: 260, height: 250, borderRadius: 30, alignItems: "center", justifyContent: "center" },
  instrument: { fontSize: 86 },
  name: { color: colors.textDark, fontSize: 25, fontWeight: "900", marginTop: 2 },
  beats: { color: colors.textDark, opacity: 0.65, fontSize: 14, fontWeight: "700", marginTop: 5 },
  row: { flexDirection: "row", gap: 10, marginTop: 22 },
  choice: { width: 102, minHeight: 92, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceEmoji: { fontSize: 34 },
  choiceName: { color: colors.textDark, fontSize: 13, fontWeight: "800", marginTop: 4 },
});
