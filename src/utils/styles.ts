/* Use this file to define styles that are used in multiple places in your app. */

import { ViewStyle } from "react-native";

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const $styles = {
  row: "flex-row",
  container: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,
};
