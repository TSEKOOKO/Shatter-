import React, { useRef, useState } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { colors, activityColors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { AudioManager } from "./AudioManager";

export function AnimatedCrystalScreen({ onBack }: { onBack: () => void }) {
  const { settings, recordActivityPlayed } = useSettings();
  const position = useRef(new Animated.ValueXY()).current;
  const glow = useRef(new Animated.Value(1)).current;
  const [touched, setTouched] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setTouched(true);
        setSparkle(true);
        recordActivityPlayed("crystal");
        AudioManager.effect("crystal_chime", settings);
        Animated.timing(glow, { toValue: 1.16, duration: 180, useNativeDriver: true }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        setSparkle(false);
        Animated.parallel([
          Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 6, tension: 35, useNativeDriver: false }),
          Animated.timing(glow, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>{touched ? "Beautiful sparkle" : "Touch the crystal"}</Text>
      <Text style={styles.hint}>Move it gently. It always comes home.</Text>
      <Animated.View
        {...responder.panHandlers}
        style={[styles.touchArea, { transform: [...position.getTranslateTransform(), { scale: glow }] }]}
      >
        <View style={styles.crystalBubble}>
          <Text style={styles.crystal}>💎</Text>
        </View>
        {sparkle && <Text style={styles.sparkle}>✦</Text>}
      </Animated.View>
      <Pressable onPress={onBack} accessibilityRole="button" style={styles.backTextButton}>
        <Text style={styles.backText}>Back to play</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textDark, fontSize: 26, fontWeight: "800", marginTop: 22 },
  hint: { color: colors.textDark, opacity: 0.6, fontSize: 14, marginTop: 6 },
  touchArea: { width: 230, height: 250, alignItems: "center", justifyContent: "center", marginTop: 18 },
  crystalBubble: { width: 190, height: 190, borderRadius: 95, backgroundColor: activityColors.crystal, alignItems: "center", justifyContent: "center", shadowColor: colors.lilac, shadowOpacity: 0.45, shadowRadius: 22, shadowOffset: { width: 0, height: 7 }, elevation: 8 },
  crystal: { fontSize: 108 },
  sparkle: { position: "absolute", top: 18, right: 18, color: colors.coral, fontSize: 38 },
  backTextButton: { padding: 14 },
  backText: { color: colors.textDark, opacity: 0.6, fontWeight: "700" },
});
