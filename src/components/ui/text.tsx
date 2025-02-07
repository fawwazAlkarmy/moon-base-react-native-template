import { translate, TxKeyPath } from "@/i18n";
import React from "react";
import type { TextProps, TextStyle } from "react-native";
import { I18nManager, StyleSheet, Text as NNText } from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
  weight?:
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const textVariants = tv({
  base: "text-black dark:text-white",
  variants: {
    weight: {
      thin: "font-montserrat-thin",
      light: "font-montserrat-light",
      regular: "font-montserrat-regular",
      medium: "font-montserrat-medium",
      semibold: "font-montserrat-semibold",
      bold: "font-montserrat-bold",
      extrabold: "font-montserrat-extrabold",
      black: "font-montserrat-black",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
  },
  defaultVariants: {
    weight: "regular",
    size: "base",
  },
});

export const Text = ({
  className = "",
  style,
  tx,
  children,
  weight = "regular",
  size = "base",
  ...props
}: Props) => {
  const textStyle = React.useMemo(
    () => twMerge(textVariants({ weight, size }), className),
    [className, weight, size]
  );

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        { writingDirection: I18nManager.isRTL ? "rtl" : "ltr" },
        style,
      ]) as TextStyle,
    [style]
  );

  return (
    <NNText className={textStyle} style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </NNText>
  );
};
