import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, activityColors } from "../constants/theme";

export type NextScreenId = "parent" | "crystal" | "bubbles" | "colors" | "animals" | "shapes" | "numbers" | "music" | "calm" | "garden" | "ocean";

const ACTIVITIES: { id: Exclude<NextScreenId, "parent">; title: string; subtitle: string; emoji: string; tint: string }[] = [
  { id: "crystal", title: "Magic crystal", subtitle: "Move and glow", emoji: "💎", tint: activityColors.crystal },
  { id: "bubbles", title: "Bubble count", subtitle: "Count to three", emoji: "🫧", tint: activityColors.bubbles },
  { id: "colors", title: "Color garden", subtitle: "Discover colors", emoji: "🌈", tint: activityColors.colors },
  { id: "animals", title: "Animal friends", subtitle: "Meet and hear", emoji: "🐻", tint: activityColors.animals },
  { id: "shapes", title: "Shape garden", subtitle: "Circle, square, triangle", emoji: "▲", tint: "#A9A3F5" },
  { id: "numbers", title: "Number garden", subtitle: "Count flowers", emoji: "🌼", tint: "#D7F1E8" },
  { id: "music", title: "Music room", subtitle: "Make a rhythm", emoji: "🥁", tint: "#FF9278" },
  { id: "calm", title: "Calm sky", subtitle: "Notice little lights", emoji: "🌙", tint: "#A9A3F5" },
  { id: "garden", title: "Little garden", subtitle: "Help it grow", emoji: "🌼", tint: "#D7F1E8" },
  { id: "ocean", title: "Ocean friends", subtitle: "Move through water", emoji: "🐠", tint: "#8CCEF1" },
];

export function NextHomeScreen({ childName, onNavigate, onParent }: { childName: string; onNavigate: (screen: NextScreenId) => void; onParent: () => void }) {
  const greeting = childName.trim() ? `Hello, ${childName.trim()}!` : "Hello, little explorer!";
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable accessibilityRole="button" accessibilityLabel="Open grown-up corner" onPress={onParent} style={styles.parentButton}>
          <Text style={styles.parentIcon}>♥</Text>
        </Pressable>
        <Text style={styles.eyebrow}>A tiny world of wonder</Text>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subtitle}>What shall we discover today?</Text>
        <View style={styles.invitation}>
          <View>
            <Text style={styles.invitationKicker}>TODAY’S LITTLE INVITATION</Text>
            <Text style={styles.invitationTitle}>Touch a world, make it glow.</Text>
            <Text style={styles.invitationText}>Every tap is a new little discovery.</Text>
          </View>
          <Text style={styles.invitationEmoji}>💎</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Let’s play</Text>
          <Text style={styles.sectionCount}>10 gentle adventures</Text>
        </View>
        <View style={styles.grid}>
          {ACTIVITIES.map((activity) => (
            <Pressable key={activity.id} accessibilityRole="button" accessibilityLabel={`Open ${activity.title}`} onPress={() => onNavigate(activity.id)} style={[styles.card, { backgroundColor: activity.tint }]}>
              <View style={styles.iconBubble}><Text style={styles.cardEmoji}>{activity.emoji}</Text></View>
              <View>
                <Text style={styles.cardTitle}>{activity.title}</Text>
                <Text style={styles.cardSubtitle}>{activity.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.footer}><Text style={styles.footerEmoji}>🌱</Text><Text style={styles.footerText}>No right or wrong way to play.</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 54, paddingBottom: 32 },
  parentButton: { position: "absolute", top: 20, right: 20, width: 46, height: 46, borderRadius: 23, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  parentIcon: { color: colors.coral, fontSize: 22 },
  eyebrow: { color: colors.coral, fontSize: 11, fontWeight: "900", letterSpacing: 1.1, textTransform: "uppercase" },
  greeting: { color: colors.textDark, fontSize: 29, lineHeight: 35, fontWeight: "900", marginTop: 5 },
  subtitle: { color: colors.textDark, opacity: 0.6, fontSize: 15, marginTop: 4, marginBottom: 18 },
  invitation: { minHeight: 170, borderRadius: 27, backgroundColor: colors.coral, padding: 20, flexDirection: "row", alignItems: "center", overflow: "hidden" },
  invitationKicker: { color: "#8D3C2B", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  invitationTitle: { color: "#FFFFFF", fontSize: 23, lineHeight: 28, fontWeight: "900", maxWidth: 220, marginTop: 10 },
  invitationText: { color: "#FFF2ED", fontSize: 13, marginTop: 7 },
  invitationEmoji: { fontSize: 64, marginLeft: "auto" },
  sectionHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: 23, marginBottom: 11 },
  sectionTitle: { color: colors.textDark, fontSize: 20, fontWeight: "900" },
  sectionCount: { color: colors.textDark, opacity: 0.55, fontSize: 12, fontWeight: "700" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 11 },
  card: { width: "48.4%", minHeight: 152, borderRadius: 23, padding: 14, justifyContent: "space-between" },
  iconBubble: { width: 52, height: 52, borderRadius: 26, backgroundColor: "rgba(255,255,255,0.62)", alignItems: "center", justifyContent: "center" },
  cardEmoji: { fontSize: 28 },
  cardTitle: { color: colors.textDark, fontSize: 15, fontWeight: "900" },
  cardSubtitle: { color: colors.textDark, opacity: 0.65, fontSize: 11, marginTop: 3 },
  arrow: { position: "absolute", right: 12, bottom: 10, color: colors.textDark, fontSize: 25 },
  footer: { flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: "#FFFFFF", borderRadius: 18, padding: 14, marginTop: 18 },
  footerEmoji: { fontSize: 21 },
  footerText: { color: colors.textDark, opacity: 0.6, fontSize: 13, fontWeight: "700" },
});
