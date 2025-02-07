import { StyleSheet } from "react-native";
import React from "react";
import { Screen, Text } from "@/components/ui";
import { $styles } from "@/utils/styles";
import { useSelectedLanguage } from "@/i18n";

export const Onboarding = () => {
  const { setLanguage, language } = useSelectedLanguage();
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.container}
    >
      <Text tx="onboarding.message" />
    </Screen>
  );
};

const styles = StyleSheet.create({});
