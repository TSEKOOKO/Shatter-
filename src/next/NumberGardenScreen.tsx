import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const NUMBERS = [1, 2, 3] as const;

export function NumberGardenScreen({ onBack }: { onBack: () => void }) {
  const { settings } = useSettings();
  const [selected, setSelected] = useState<number | null>(null);
  const flowers = useMemo(() => (selected ? Array.from({ length: selected }, (_, index) => index) : []), [selected]);

  const choose = (number: number) => {
    setSelected(number);
    const cue = number === 1 ? "one" : number === 2 ? "two" : "three";
    AudioManager.cue(cue, settings);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Number garden</Text>
      <Text style={styles.prompt}>Tap a number and count the flowers</Text>
      <View style={styles.garden}>
        {flowers.length ? (
          <View style={styles.flowerRow}>
            {flowers.map((flower) => <Text key={flower} style={styles.flower}>🌼</Text>)}
          </View>
        ) : (
          <Text style={styles.gardenHint}>How many flowers?</Text>
        )}
        {selected && <Text style={styles.numberLabel}>{selected}</Text>}
      </View>
      <View style={styles.row}>
        {NUMBERS.map((number) => (
          <Pressable
            key={number}
            accessibilityRole="button"
            accessibilityLabel={`Number ${number}`}
            onPress={() => choose(number)}
            style={[styles.choice, selected === number && styles.selected]}
          >
            <Text style={styles.choiceNumber}>{number}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800" },
  prompt: { color: colors.textDark, opacity: 0.6, fontSize: 14, marginTop: 5, marginBottom: 18, textAlign: "center" },
  garden: { width: 290, height: 230, borderRadius: 30, backgroundColor: "#D7F1E8", alignItems: "center", justifyContent: "center" },
  gardenHint: { color: colors.textDark, opacity: 0.6, fontSize: 17, fontWeight: "700" },
  flowerRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  flower: { fontSize: 48, marginHorizontal: 4 },
  numberLabel: { color: colors.textDark, fontSize: 34, fontWeight: "900", marginTop: 8 },
  row: { flexDirection: "row", gap: 14, marginTop: 24 },
  choice: { width: 86, height: 86, borderRadius: 22, backgroundColor: "#FFD86B", alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceNumber: { color: colors.textDark, fontSize: 38, fontWeight: "900" },
});
