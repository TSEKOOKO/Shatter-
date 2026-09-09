import React from "react";
import { Text } from "react-native";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";

function TestHarness() {
  const { settings, setChildName, isLoaded } = useSettings();
  if (!isLoaded) return <Text>loading</Text>;
  return (
    <>
      <Text testID="name">{settings.childName}</Text>
      <Text testID="set-name" onPress={() => setChildName("Ava")}>
        set
      </Text>
    </>
  );
}

describe("SettingsContext", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("defaults to an empty child name", async () => {
    const { getByTestId } = render(
      <SettingsProvider>
        <TestHarness />
      </SettingsProvider>
    );
    await waitFor(() => expect(getByTestId("name").props.children).toBe(""));
  });

  it("persists the child name locally after saving", async () => {
    const { getByTestId } = render(
      <SettingsProvider>
        <TestHarness />
      </SettingsProvider>
    );
    await waitFor(() => getByTestId("set-name"));
    fireEvent.press(getByTestId("set-name"));
    await waitFor(() => expect(getByTestId("name").props.children).toBe("Ava"));

    const raw = await AsyncStorage.getItem("little-wonder-world:settings:v1");
    expect(raw).toContain("Ava");
  });
});
