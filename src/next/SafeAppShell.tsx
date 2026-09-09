import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SettingsProvider } from "../context/SettingsContext";
import { HomeScreen } from "../screens/HomeScreen";
import { ParentScreen } from "../screens/ParentScreen";
import { CrystalScreen } from "../screens/CrystalScreen";
import { BubbleScreen } from "../screens/BubbleScreen";
import { ColorScreen } from "../screens/ColorScreen";
import { AnimalScreen } from "../screens/AnimalScreen";
import { ScreenId } from "../types";
import { ParentGate } from "./ParentGate";

type ShellScreen = ScreenId | "parent-gate";

export function SafeAppShell() {
  const [screen, setScreen] = useState<ShellScreen>("home");
  const goHome = () => setScreen("home");

  const navigate = (nextScreen: ScreenId) => {
    setScreen(nextScreen === "parent" ? "parent-gate" : nextScreen);
  };

  return (
    <SettingsProvider>
      <StatusBar style="dark" />
      {screen === "home" && <HomeScreen onNavigate={navigate} />}
      {screen === "parent-gate" && (
        <ParentGate onUnlock={() => setScreen("parent")} onCancel={goHome} />
      )}
      {screen === "parent" && <ParentScreen onBack={goHome} />}
      {screen === "crystal" && <CrystalScreen onBack={goHome} />}
      {screen === "bubbles" && <BubbleScreen onBack={goHome} />}
      {screen === "colors" && <ColorScreen onBack={goHome} />}
      {screen === "animals" && <AnimalScreen onBack={goHome} />}
    </SettingsProvider>
  );
}
