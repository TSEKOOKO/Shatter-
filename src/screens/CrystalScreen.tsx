import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { activityColors, colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";

interface CrystalScreenProps {
  onBack: () => void;
}

export function CrystalScreen({ onBack }: CrystalScreenProps) {
  const { recordActivityPlayed } = useSettings();
  const [hasTouched, setHasTouched] = useState(false);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!hasTouched) {
          setHasTouched(true);
          recordActivityPlayed("crystal");
        }
        Animated.spring(scale, { toValue: 1.15, useNativeDriver: true }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // Gentle spring return to center - the world always feels safe
        // and forgiving, never lost or broken.
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            tension: 30,
            useNativeDriver: false,
          }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      {!hasTouched && <Text style={styles.hint}>Touch the crystal</Text>}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.crystal,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
          },
        ]}
      >
        <Text style={styles.crystalEmoji}>🔮</Text>
      </Animated.View>
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
  hint: {
    position: "absolute",
    top: 120,
    fontSize: 18,
    color: colors.textDark,
    opacity: 0.5,
  },
  crystal: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: activityColors.crystal,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  crystalEmoji: {
    fontSize: 90,
  },
});
