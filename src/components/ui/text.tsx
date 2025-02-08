import { getLanguage, translate, TxKeyPath } from "@/i18n";
import React from "react";
import type { TextProps, TextStyle } from "react-native";
import { I18nManager, StyleSheet, Text as NNText } from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";
export type TextWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
  weight?: TextWeight;
  size?: TextSize;
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

const arabicFontMap = {
  thin: "font-cairo-light",
  light: "font-cairo-light",
  regular: "font-cairo-regular",
  medium: "font-cairo-medium",
  semibold: "font-cairo-semibold",
  bold: "font-cairo-bold",
  extrabold: "font-cairo-extrabold",
  black: "font-cairo-black",
};

export const Text = ({
  className = "",
  style,
  tx,
  children,
  weight = "regular",
  size = "base",
  ...props
}: Props) => {
  const locale = getLanguage();
  const isArabic = locale === "ar";

  const textStyle = React.useMemo(
    () =>
      twMerge(
        textVariants({ size, weight }),
        isArabic ? arabicFontMap[weight] : "",
        className
      ),
    [className, weight, size, isArabic]
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
