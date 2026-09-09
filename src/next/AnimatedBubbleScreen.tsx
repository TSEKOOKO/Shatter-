import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors, activityColors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const TOTAL = 3;

export function AnimatedBubbleScreen({ onBack }: { onBack: () => void }) {
  const { settings, recordActivityPlayed } = useSettings();
  const [popped, setPopped] = useState<Set<number>>(new Set());
  const ids = useMemo(() => [0, 1, 2], []);
  const finished = popped.size === TOTAL;

  const pop = (id: number) => {
    if (popped.has(id)) return;
    if (popped.size === 0) recordActivityPlayed("bubbles");
    AudioManager.effect("bubble_pop", settings);
    setPopped((current) => new Set([...current, id]));
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>{finished ? "You found them all!" : "Bubble count"}</Text>
      <Text style={styles.count}>{popped.size} of {TOTAL}</Text>
      <View style={styles.row}>
        {ids.map((id) => (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={`Bubble ${id + 1}`}
            onPress={() => pop(id)}
            style={[styles.bubble, popped.has(id) && styles.popped]}
          >
            <Text style={styles.bubbleText}>{popped.has(id) ? "✦" : "🫧"}</Text>
          </Pressable>
        ))}
      </View>
      {finished && (
        <Pressable onPress={() => setPopped(new Set())} accessibilityRole="button" style={styles.replay}>
          <Text style={styles.replayText}>Play again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800" },
  count: { color: colors.textDark, opacity: 0.6, fontSize: 16, marginTop: 8, marginBottom: 28 },
  row: { flexDirection: "row", gap: 18 },
  bubble: { width: 105, height: 105, borderRadius: 53, backgroundColor: activityColors.bubbles, alignItems: "center", justifyContent: "center", shadowColor: colors.textDark, shadowOpacity: 0.13, shadowRadius: 8, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  popped: { backgroundColor: colors.yellow, transform: [{ scale: 0.88 }], opacity: 0.78 },
  bubbleText: { fontSize: 48 },
  replay: { marginTop: 26, backgroundColor: activityColors.bubbles, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 24 },
  replayText: { color: colors.textDark, fontWeight: "800", fontSize: 16 },
});
