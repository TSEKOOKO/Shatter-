import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SettingsProvider, useSettings } from "../context/SettingsContext";
import { ParentScreen } from "../screens/ParentScreen";
import { ParentGate } from "./ParentGate";
import { AnimatedCrystalScreen } from "./AnimatedCrystalScreen";
import { AnimatedBubbleScreen } from "./AnimatedBubbleScreen";
import { EnhancedColorScreen } from "./EnhancedColorScreen";
import { EnhancedAnimalScreen } from "./EnhancedAnimalScreen";
import { ShapesScreen } from "./ShapesScreen";
import { NumberGardenScreen } from "./NumberGardenScreen";
import { MusicRoomScreen } from "./MusicRoomScreen";
import { CalmSkyScreen } from "./CalmSkyScreen";
import { GardenScreen } from "./GardenScreen";
import { OceanScreen } from "./OceanScreen";
import { NextHomeScreen, NextScreenId } from "./NextHomeScreen";

type ShellScreen = NextScreenId | "parent-gate" | "home";

function AppContent() {
  const { settings } = useSettings();
  const [screen, setScreen] = useState<ShellScreen>("home");
  const goHome = () => setScreen("home");
  const navigate = (next: NextScreenId) => setScreen(next === "parent" ? "parent-gate" : next);

  return (
    <>
      <StatusBar style="dark" />
      {screen === "home" && <NextHomeScreen childName={settings.childName} onNavigate={navigate} onParent={() => setScreen("parent-gate")} />}
      {screen === "parent-gate" && <ParentGate onUnlock={() => setScreen("parent")} onCancel={goHome} />}
      {screen === "parent" && <ParentScreen onBack={goHome} />}
      {screen === "crystal" && <AnimatedCrystalScreen onBack={goHome} />}
      {screen === "bubbles" && <AnimatedBubbleScreen onBack={goHome} />}
      {screen === "colors" && <EnhancedColorScreen onBack={goHome} />}
      {screen === "animals" && <EnhancedAnimalScreen onBack={goHome} />}
      {screen === "shapes" && <ShapesScreen onBack={goHome} />}
      {screen === "numbers" && <NumberGardenScreen onBack={goHome} />}
      {screen === "music" && <MusicRoomScreen onBack={goHome} />}
      {screen === "calm" && <CalmSkyScreen onBack={goHome} />}
      {screen === "garden" && <GardenScreen onBack={goHome} />}
      {screen === "ocean" && <OceanScreen onBack={goHome} />}
    </>
  );
}

export function EnhancedAppShell() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
