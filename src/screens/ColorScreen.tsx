import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";

interface ColorScreenProps {
  onBack: () => void;
}

const PALETTE = [
  { name: "Coral", value: colors.coral },
  { name: "Lilac", value: colors.lilac },
  { name: "Sky", value: colors.skyBlue },
  { name: "Sun", value: colors.yellow },
  { name: "Mint", value: colors.mint },
];

export function ColorScreen({ onBack }: ColorScreenProps) {
  const { recordActivityPlayed } = useSettings();
  const [selected, setSelected] = useState<string | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleSelect = (name: string) => {
    setSelected(name);
    if (!hasPlayed) {
      setHasPlayed(true);
      recordActivityPlayed("colors");
    }
  };

  const selectedColor = PALETTE.find((c) => c.name === selected);

  return (
    <View style={[styles.container, { backgroundColor: selectedColor?.value ?? colors.background }]}>
      <BackButton onPress={onBack} />

      {selected && <Text style={styles.nameLabel}>{selected}</Text>}

      <View style={styles.grid}>
        {PALETTE.map((c) => (
          <Pressable
            key={c.name}
            onPress={() => handleSelect(c.name)}
            accessibilityRole="button"
            accessibilityLabel={c.name}
            style={[styles.swatch, { backgroundColor: c.value }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameLabel: {
    position: "absolute",
    top: 140,
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowRadius: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 340,
  },
  swatch: {
    width: 100,
    height: 100,
    borderRadius: 28,
    margin: 10,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.6)",
  },
});
