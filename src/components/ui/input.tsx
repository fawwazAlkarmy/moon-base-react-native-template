import * as React from "react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useController } from "react-hook-form";
import type { TextInputProps, TextStyle } from "react-native";
import { I18nManager, StyleSheet, View } from "react-native";
import { TextInput as NTextInput } from "react-native";
import { tv } from "tailwind-variants";
import { getLanguage, translate, TxKeyPath } from "@/i18n";

import colors from "./colors";
import { Text } from "./text";

const inputTv = tv({
  slots: {
    container: "mb-2",
    label: "text-grey-100 mb-1 dark:text-neutral-100",
    input:
      "mt-0 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3  leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
  },

  variants: {
    focused: {
      true: {
        input: "border-neutral-400 dark:border-neutral-300",
      },
    },
    error: {
      true: {
        input: "border-danger-600",
        label: "text-danger-600 dark:text-danger-600",
      },
    },
    disabled: {
      true: {
        input: "bg-neutral-200",
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

const getFontFamily = (weight: TextWeight, isArabic: boolean) => {
  if (isArabic) {
    return {
      thin: "Cairo-Light",
      light: "Cairo-Light",
      regular: "Cairo-Regular",
      medium: "Cairo-Medium",
      semibold: "Cairo-SemiBold",
      bold: "Cairo-Bold",
      extrabold: "Cairo-ExtraBold",
      black: "Cairo-Black",
    }[weight];
  }

  return {
    thin: "Montserrat-Thin",
    light: "Montserrat-Light",
    regular: "Montserrat-Regular",
    medium: "Montserrat-Medium",
    semibold: "Montserrat-SemiBold",
    bold: "Montserrat-Bold",
    extrabold: "Montserrat-ExtraBold",
    black: "Montserrat-Black",
  }[weight];
};

type TextWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

const getFontSize = (size: TextSize) => {
  return {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  }[size];
};

export interface NInputProps extends TextInputProps {
  label?: string;
  labelTx?: TxKeyPath;
  placeholder?: string;
  placeholderTx?: TxKeyPath;
  error?: string;
  errorTx?: TxKeyPath;
  disabled?: boolean;
  labelWeight?: TextWeight;
  labelSize?: TextSize;
  inputWeight?: TextWeight;
  inputSize?: TextSize;
  errorWeight?: TextWeight;
  errorSize?: TextSize;
  placeholderWeight?: TextWeight;
  placeholderSize?: TextSize;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    labelTx,
    placeholder,
    placeholderTx,
    error,
    errorTx,
    testID,
    labelWeight = "regular",
    labelSize = "lg",
    inputWeight = "medium",
    inputSize = "base",
    errorWeight = "regular",
    errorSize = "sm",
    placeholderWeight = "regular",
    placeholderSize = "base",
    ...inputProps
  } = props;

  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const locale = getLanguage();
  const isArabic = locale === "ar";

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error || errorTx),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, errorTx, isFocussed, props.disabled]
  );

  const translatedPlaceholder = React.useMemo(
    () => (placeholderTx ? translate(placeholderTx) : placeholder),
    [placeholder, placeholderTx]
  );

  const inputStyle = React.useMemo(() => {
    const fontFamily = getFontFamily(inputWeight, isArabic);
    const fontSize = getFontSize(inputSize);

    return StyleSheet.flatten([
      {
        writingDirection: I18nManager.isRTL
          ? "rtl"
          : ("ltr" as TextStyle["writingDirection"]),
        textAlign: I18nManager.isRTL
          ? "right"
          : ("left" as TextStyle["textAlign"]),
        fontFamily,
        fontSize,
      } as TextStyle,
      inputProps.style,
    ]);
  }, [inputWeight, inputSize, isArabic, inputProps.style]);

  const placeholderStyle = React.useMemo(() => {
    const fontFamily = getFontFamily(placeholderWeight, isArabic);
    const fontSize = getFontSize(placeholderSize);

    return {
      fontFamily,
      fontSize,
    };
  }, [placeholderWeight, placeholderSize, isArabic]);

  return (
    <View className={styles.container()}>
      {(label || labelTx) && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          className={styles.label()}
          tx={labelTx}
          weight={labelWeight}
          size={labelSize}
        >
          {label}
        </Text>
      )}
      <NTextInput
        testID={testID}
        ref={ref}
        placeholder={translatedPlaceholder}
        placeholderTextColor={colors.neutral[400]}
        className={styles.input()}
        onBlur={onBlur}
        onFocus={onFocus}
        {...inputProps}
        style={[inputStyle, props.value ? undefined : placeholderStyle]}
      />
      {(error || errorTx) && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="text-danger-400 dark:text-danger-600"
          tx={errorTx}
          weight={errorWeight}
          size={errorSize}
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ""}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
