import { StyleSheet } from "react-native";
import React from "react";
import {
  Button,
  Checkbox,
  Input,
  PhoneInput,
  Radio,
  Screen,
  Text,
} from "@/components/ui";
import { $styles } from "@/utils/styles";
import { useSelectedLanguage } from "@/i18n";
import { useForm } from "react-hook-form";

export const Onboarding = () => {
  const { setLanguage, language } = useSelectedLanguage();
  const [isChecked, setIsChecked] = React.useState(false);

  const { control } = useForm();

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
      <Checkbox
        checked={isChecked}
        onChange={(checked) => setIsChecked(checked)}
        accessibilityLabel="Agree to terms and conditions"
        label="I agree to the terms and conditions"
        labelWeight="medium"
        labelSize="base"
      />
      <PhoneInput
        control={control}
        name="phoneNumber"
        labelTx="onboarding.phone"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});
