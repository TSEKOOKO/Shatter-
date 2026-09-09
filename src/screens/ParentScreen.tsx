import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { colors } from "../constants/theme";
import { useSettings } from "../context/SettingsContext";

interface ParentScreenProps {
  onBack: () => void;
}

// Deliberately plain, text-forward, and adult-toned - the opposite visual
// register from the play scenes, so a child landing here by accident finds
// nothing playful to hold their attention.
export function ParentScreen({ onBack }: ParentScreenProps) {
  const { settings, setChildName, setSoundEnabled, setCalmModeEnabled, clearChildName } =
    useSettings();
  const [nameDraft, setNameDraft] = useState(settings.childName);

  const handleSaveName = () => {
    setChildName(nameDraft);
  };

  const handleClearName = () => {
    setNameDraft("");
    clearChildName();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grown-up corner</Text>
      <Text style={styles.note}>
        Everything here is stored only on this device. Nothing is uploaded,
        and no account is required.
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Child's name or nickname</Text>
        <TextInput
          value={nameDraft}
          onChangeText={setNameDraft}
          placeholder="e.g. Ava"
          style={styles.input}
          maxLength={40}
        />
        <View style={styles.buttonRow}>
          <Pressable style={styles.saveButton} onPress={handleSaveName}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.clearButton} onPress={handleClearName}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Sound</Text>
          <Switch value={settings.soundEnabled} onValueChange={setSoundEnabled} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Calm mode (quieter effects)</Text>
          <Switch value={settings.calmModeEnabled} onValueChange={setCalmModeEnabled} />
        </View>
      </View>

      <Pressable style={styles.doneButton} onPress={onBack}>
        <Text style={styles.doneButtonText}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1EC",
    paddingTop: 80,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: colors.textDark,
    opacity: 0.7,
    marginBottom: 28,
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD5C7",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: colors.mint,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  saveButtonText: {
    fontWeight: "700",
    color: colors.textDark,
  },
  clearButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD5C7",
  },
  clearButtonText: {
    fontWeight: "600",
    color: colors.textDark,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  doneButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.textDark,
  },
  doneButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
