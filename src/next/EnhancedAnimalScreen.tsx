import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { activityColors, colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

type Animal = { name: "Bunny" | "Cat" | "Dog"; emoji: string; sound: "bunny" | "cat" | "dog"; tint: string; call: string };
const ANIMALS: Animal[] = [
  { name: "Bunny", emoji: "🐰", sound: "bunny", tint: "#FFE1E8", call: "Hop hop!" },
  { name: "Cat", emoji: "🐱", sound: "cat", tint: "#FFF0BD", call: "Meow!" },
  { name: "Dog", emoji: "🐶", sound: "dog", tint: "#D7F1E8", call: "Woof!" },
];

export function EnhancedAnimalScreen({ onBack }: { onBack: () => void }) {
  const { settings, recordActivityPlayed } = useSettings();
  const [selected, setSelected] = useState<Animal | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const bounce = useRef(new Animated.Value(1)).current;

  const choose = (animal: Animal) => {
    setSelected(animal);
    AudioManager.cue(animal.sound, settings);
    if (!hasPlayed) {
      setHasPlayed(true);
      recordActivityPlayed("animals");
    }
    bounce.setValue(0.82);
    Animated.spring(bounce, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Animal friends</Text>
      <Text style={styles.prompt}>Tap a friend to say hello</Text>
      <Animated.View style={[styles.stage, { backgroundColor: selected?.tint ?? activityColors.animals, transform: [{ scale: bounce }] }]}>
        <Text style={styles.bigEmoji}>{selected?.emoji ?? "🐻"}</Text>
        <Text style={styles.name}>{selected?.name ?? "Hello, friend!"}</Text>
        {selected && <Text style={styles.sound}>{selected.call}</Text>}
      </Animated.View>
      <View style={styles.row}>
        {ANIMALS.map((animal) => (
          <Pressable
            key={animal.name}
            accessibilityRole="button"
            accessibilityLabel={`${animal.name} animal`}
            onPress={() => choose(animal)}
            style={[styles.choice, { backgroundColor: animal.tint }, selected?.name === animal.name && styles.selected]}
          >
            <Text style={styles.choiceEmoji}>{animal.emoji}</Text>
            <Text style={styles.choiceName}>{animal.name}</Text>
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
  bigEmoji: { fontSize: 112 },
  name: { color: colors.textDark, fontSize: 25, fontWeight: "900", marginTop: 3 },
  sound: { color: colors.coral, fontSize: 17, fontWeight: "900", marginTop: 4 },
  row: { flexDirection: "row", gap: 10, marginTop: 22 },
  choice: { width: 102, minHeight: 92, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceEmoji: { fontSize: 34 },
  choiceName: { color: colors.textDark, fontSize: 14, fontWeight: "800", marginTop: 4 },
});
