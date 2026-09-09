import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActivityCard } from "../components/ActivityCard";
import { activityColors, colors, layout } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";
import { ActivityId, ScreenId } from "../types";

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { settings } = useSettings();

  const greeting = settings.childName
    ? `Hi, ${settings.childName}!`
    : "Hi there!";

  return (
    <View style={styles.container}>
      {/* Small, adult-scaled, deliberately unobtrusive caregiver entry point */}
      <Pressable
        onPress={() => onNavigate("parent")}
        accessibilityRole="button"
        accessibilityLabel="Grown-up corner"
        style={styles.heartButton}
      >
        <Text style={styles.heartText}>♥</Text>
      </Pressable>

      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.subtitle}>Tap something to play</Text>

      <View style={styles.grid}>
        <ActivityCard
          label="Crystal"
          emoji="🔮"
          color={activityColors.crystal}
          onPress={() => onNavigate("crystal")}
        />
        <ActivityCard
          label="Bubbles"
          emoji="🫧"
          color={activityColors.bubbles}
          onPress={() => onNavigate("bubbles")}
        />
        <ActivityCard
          label="Colors"
          emoji="🌈"
          color={activityColors.colors}
          onPress={() => onNavigate("colors")}
        />
        <ActivityCard
          label="Animals"
          emoji="🐰"
          color={activityColors.animals}
          onPress={() => onNavigate("animals")}
        />
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
    paddingTop: 40,
  },
  heartButton: {
    position: "absolute",
    top: 48,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  heartText: {
    fontSize: 24,
    color: colors.coral,
    opacity: 0.6,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textDark,
    opacity: 0.6,
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 360,
  },
});
