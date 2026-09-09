import React, { useRef, useState } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

const FRIENDS = [
  { name: "Fish", emoji: "🐠", tint: "#FFD86B" },
  { name: "Whale", emoji: "🐳", tint: "#8CCEF1" },
  { name: "Octopus", emoji: "🐙", tint: "#FF9278" },
];

export function OceanScreen({ onBack }: { onBack: () => void }) {
  const { settings } = useSettings();
  const [selected, setSelected] = useState(FRIENDS[0]);
  const position = useRef(new Animated.ValueXY()).current;
  const responder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => AudioManager.effect("bubble_pop", settings),
    onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
    onPanResponderRelease: () => Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 6, tension: 35, useNativeDriver: false }).start(),
  })).current;

  const choose = (friend: (typeof FRIENDS)[number]) => {
    setSelected(friend);
    position.setValue({ x: 0, y: 0 });
    AudioManager.effect("crystal_chime", settings);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>Ocean friends</Text>
      <Text style={styles.prompt}>Move a friend through the water</Text>
      <View style={styles.ocean}>
        <Text style={styles.waveTop}>〰〰〰〰〰</Text>
        <Animated.View {...responder.panHandlers} style={[styles.friend, { transform: position.getTranslateTransform() }]}>
          <Text style={styles.friendEmoji}>{selected.emoji}</Text>
          <Text style={styles.friendName}>{selected.name}</Text>
        </Animated.View>
        <Text style={styles.waveBottom}>〰〰〰〰〰</Text>
        <Text style={styles.bubbles}>·  °  ·</Text>
      </View>
      <View style={styles.row}>
        {FRIENDS.map((friend) => (
          <Pressable key={friend.name} accessibilityRole="button" accessibilityLabel={`Choose ${friend.name}`} onPress={() => choose(friend)} style={[styles.choice, { backgroundColor: friend.tint }, selected.name === friend.name && styles.selected]}>
            <Text style={styles.choiceEmoji}>{friend.emoji}</Text>
            <Text style={styles.choiceName}>{friend.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF8FF", alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800" },
  prompt: { color: colors.textDark, opacity: 0.6, fontSize: 14, marginTop: 5, marginBottom: 16 },
  ocean: { width: 290, height: 260, borderRadius: 32, backgroundColor: "#8CCEF1", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  waveTop: { position: "absolute", top: 20, color: "rgba(255,255,255,0.8)", fontSize: 26 },
  waveBottom: { position: "absolute", bottom: 23, color: "rgba(255,255,255,0.72)", fontSize: 26 },
  bubbles: { position: "absolute", right: 28, top: 85, color: "rgba(255,255,255,0.8)", fontSize: 24 },
  friend: { alignItems: "center", justifyContent: "center", minWidth: 135, minHeight: 120 },
  friendEmoji: { fontSize: 74 },
  friendName: { color: colors.textDark, fontSize: 22, fontWeight: "900" },
  row: { flexDirection: "row", gap: 10, marginTop: 18 },
  choice: { width: 102, minHeight: 83, borderRadius: 21, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "transparent" },
  selected: { borderColor: colors.textDark },
  choiceEmoji: { fontSize: 31 },
  choiceName: { color: colors.textDark, fontSize: 12, fontWeight: "800", marginTop: 3 },
});
