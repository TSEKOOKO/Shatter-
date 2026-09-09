import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { activityColors, colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { playSound, SoundId } from "../audio/AudioService";

interface AnimalScreenProps {
  onBack: () => void;
}

const ANIMALS: { name: string; emoji: string; sound: SoundId }[] = [
  { name: "Bunny", emoji: "🐰", sound: "animal_bunny" },
  { name: "Cat", emoji: "🐱", sound: "animal_cat" },
  { name: "Dog", emoji: "🐶", sound: "animal_dog" },
];

export function AnimalScreen({ onBack }: AnimalScreenProps) {
  const { settings, recordActivityPlayed } = useSettings();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    playSound(ANIMALS[index].sound, {
      soundEnabled: settings.soundEnabled,
      calmModeEnabled: settings.calmModeEnabled,
    });
    if (!hasPlayed) {
      setHasPlayed(true);
      recordActivityPlayed("animals");
    }
  };

  const selected = selectedIndex !== null ? ANIMALS[selectedIndex] : null;

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />

      <View style={styles.stage}>
        {selected ? (
          <>
            <Text style={styles.bigEmoji}>{selected.emoji}</Text>
            <Text style={styles.name}>{selected.name}</Text>
          </>
        ) : (
          <Text style={styles.hint}>Tap an animal</Text>
        )}
      </View>

      <View style={styles.row}>
        {ANIMALS.map((animal, index) => (
          <Pressable
            key={animal.name}
            onPress={() => handleSelect(index)}
            accessibilityRole="button"
            accessibilityLabel={animal.name}
            style={[
              styles.animalButton,
              selectedIndex === index && styles.animalButtonSelected,
            ]}
          >
            <Text style={styles.smallEmoji}>{animal.emoji}</Text>
          </Pressable>
        ))}
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
  },
  stage: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  bigEmoji: {
    fontSize: 120,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textDark,
    marginTop: 8,
  },
  hint: {
    fontSize: 18,
    color: colors.textDark,
    opacity: 0.5,
  },
  row: {
    flexDirection: "row",
    marginTop: 24,
  },
  animalButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: activityColors.animals,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  animalButtonSelected: {
    borderWidth: 4,
    borderColor: colors.textDark,
  },
  smallEmoji: {
    fontSize: 44,
  },
});
