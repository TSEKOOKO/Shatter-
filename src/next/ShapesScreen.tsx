import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";

const SHAPES = [
  { name: "Circle", symbol: "●", tint: "#A9A3F5" },
  { name: "Square", symbol: "■", tint: "#7DD9C1" },
  { name: "Triangle", symbol: "▲", tint: "#FFD86B" },
];

export function ShapesScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(SHAPES[0]);
  const scale = useRef(new Animated.Value(0.82)).current;

  const choose = (shape: (typeof SHAPES)[number]) => {
    setSelected(shape);
    scale.setValue(0.82);
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Shape garden</Text>
      <Text style={styles.prompt}>Tap a shape to discover it</Text>
      <Animated.View style={[styles.stage, { backgroundColor: selected.tint, transform: [{ scale }] }]}>
        <Text style={styles.shape}>{selected.symbol}</Text>
        <Text style={styles.name}>{selected.name}</Text>
      </Animated.View>
      <View style={styles.row}>
        {SHAPES.map((shape) => (
          <Pressable
            key={shape.name}
            accessibilityRole="button"
            accessibilityLabel={`${shape.name} shape`}
            onPress={() => choose(shape)}
            style={[styles.choice, { backgroundColor: shape.tint }, selected.name === shape.name && styles.selected]}
          >
            <Text style={styles.choiceSymbol}>{shape.symbol}</Text>
            <Text style={styles.choiceName}>{shape.name}</Text>
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
  shape: { color: colors.textDark, fontSize: 128, lineHeight: 145 },
  name: { color: colors.textDark, fontSize: 25, fontWeight: "900", marginTop: 2 },
  row: { flexDirection: "row", gap: 10, marginTop: 22 },
  choice: { width: 102, minHeight: 92, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceSymbol: { color: colors.textDark, fontSize: 38, lineHeight: 42 },
  choiceName: { color: colors.textDark, fontSize: 13, fontWeight: "800", marginTop: 4 },
});
