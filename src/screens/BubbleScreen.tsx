import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { activityColors, colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";

interface BubbleScreenProps {
  onBack: () => void;
}

const TOTAL_BUBBLES = 3;

export function BubbleScreen({ onBack }: BubbleScreenProps) {
  const { recordActivityPlayed } = useSettings();
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());
  const bubbleIds = useMemo(() => Array.from({ length: TOTAL_BUBBLES }, (_, i) => i), []);

  const popped = poppedIds.size;
  const allPopped = popped === TOTAL_BUBBLES;

  const handlePop = (id: number) => {
    if (poppedIds.has(id)) return;
    if (poppedIds.size === 0) recordActivityPlayed("bubbles");
    const next = new Set(poppedIds);
    next.add(id);
    setPoppedIds(next);
  };

  const handleReplay = () => setPoppedIds(new Set());

  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />

      {!allPopped ? (
        <>
          <Text style={styles.countText}>{popped} / {TOTAL_BUBBLES}</Text>
          <View style={styles.bubbleRow}>
            {bubbleIds.map((id) => {
              const isPopped = poppedIds.has(id);
              return (
                <Pressable
                  key={id}
                  onPress={() => handlePop(id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Bubble ${id + 1}`}
                  style={[styles.bubble, isPopped && styles.bubblePopped]}
                >
                  <Text style={styles.bubbleEmoji}>{isPopped ? "✨" : "🫧"}</Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : (
        <View style={styles.celebration}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.celebrationText}>You popped them all!</Text>
          <Pressable
            onPress={handleReplay}
            accessibilityRole="button"
            accessibilityLabel="Play again"
            style={styles.replayButton}
          >
            <Text style={styles.replayText}>Play again</Text>
          </Pressable>
        </View>
      )}
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
  countText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 32,
  },
  bubbleRow: {
    flexDirection: "row",
    gap: 24,
  },
  bubble: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: activityColors.bubbles,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bubblePopped: {
    backgroundColor: colors.yellow,
    opacity: 0.7,
  },
  bubbleEmoji: {
    fontSize: 48,
  },
  celebration: {
    alignItems: "center",
  },
  celebrationEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  celebrationText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 24,
  },
  replayButton: {
    backgroundColor: activityColors.bubbles,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  replayText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
  },
});
