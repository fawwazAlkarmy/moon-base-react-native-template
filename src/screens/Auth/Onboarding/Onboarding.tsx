import { StyleSheet } from "react-native";
import React from "react";
import { Button, Input, Screen, Text } from "@/components/ui";
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
      <Text tx="onboarding.message" weight="medium" size="3xl" />

      <Button
        tx="onboarding.change"
        textClassName="text-white"
        onPress={() => setLanguage("en")}
        variant="secondary"
      />
      <Input labelTx="onboarding.message" placeholderTx="onboarding.message" />
    </Screen>
  );
};

const styles = StyleSheet.create({});
