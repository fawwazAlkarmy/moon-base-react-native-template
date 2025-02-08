import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";
import { tv } from "tailwind-variants";
import { CountryPicker } from "react-native-country-codes-picker";
import { getLanguage, TxKeyPath } from "@/i18n";
import { Input } from "./input";
import { Text, TextSize, TextWeight } from "./text";

const phoneInputTv = tv({
  slots: {
    container: "flex-row items-center",
    countryPicker:
      "flex-row items-center rounded-l-xl border-[0.5px] border-r-0 border-neutral-300 bg-neutral-100 px-4 py-4 dark:border-neutral-700 dark:bg-neutral-800",
    flag: "w-6 h-4 mr-1",
    phoneInput: "flex-1",
  },
  variants: {
    focused: {
      true: {
        countryPicker: "border-neutral-400 dark:border-neutral-300",
      },
    },
    error: {
      true: {
        countryPicker: "border-danger-600",
      },
    },
    disabled: {
      true: {
        countryPicker: "bg-neutral-200",
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

interface PhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  labelTx?: TxKeyPath;
  error?: string;
  disabled?: boolean;
  labelWeight?: TextWeight;
  labelSize?: TextSize;
  inputWeight?: TextWeight;
  inputSize?: TextSize;
  errorWeight?: TextWeight;
  errorSize?: TextSize;
}

export function PhoneInput<T extends FieldValues>({
  control,
  name,
  label,
  labelTx,
  error,
  disabled,
  labelWeight = "regular",
  labelSize = "lg",
  inputWeight = "medium",
  inputSize = "base",
  errorWeight = "regular",
  errorSize = "sm",
}: PhoneInputProps<T>) {
  const [show, setShow] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+962");
  const [countryFlag, setCountryFlag] = React.useState("🇯🇴");
  const [isFocused, setIsFocused] = React.useState(false);

  const { field, fieldState } = useController({ control, name });
  const locale = getLanguage();

  const styles = phoneInputTv({
    error: Boolean(fieldState.error?.message || error),
    disabled,
    focused: isFocused,
  });

  const handlePhoneChange = (value: string) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    field.onChange(numericValue);
  };

  return (
    <View>
      {(label || labelTx) && (
        <Text
          className="text-grey-100 mb-1 dark:text-neutral-100"
          weight={labelWeight}
          size={labelSize}
          tx={labelTx}
        >
          {label}
        </Text>
      )}
      <View className={styles.container()}>
        <TouchableOpacity
          disabled={disabled}
          className={styles.countryPicker()}
          onPress={() => {
            setShow(true);
            setIsFocused(true);
          }}
        >
          <Text weight={inputWeight} size={inputSize} className="mr-1">
            {countryFlag}
          </Text>
          <Text weight={inputWeight} size={inputSize}>
            {countryCode}
          </Text>
        </TouchableOpacity>

        <View className={styles.phoneInput()}>
          <Input
            keyboardType="phone-pad"
            value={field.value}
            onChangeText={handlePhoneChange}
            placeholder="00000000000000"
            error={fieldState.error?.message || error}
            disabled={disabled}
            ref={field.ref}
            inputWeight={inputWeight}
            inputSize={inputSize}
            errorWeight={errorWeight}
            errorSize={errorSize}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              marginTop: 6,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
        </View>

        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setCountryFlag(item.flag);
            setShow(false);
            setIsFocused(false);
          }}
          onBackdropPress={() => {
            setShow(false);
            setIsFocused(false);
          }}
          style={{
            modal: {
              height: 400,
            },
            textInput: {
              height: 40,
              borderRadius: 8,
            },
            countryButtonStyles: {
              height: 40,
              borderRadius: 8,
            },
          }}
          enableModalAvoiding={false}
          lang={locale as string}
        />
      </View>
    </View>
  );
}
