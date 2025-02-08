import React from "react";
import { type PressableProps, View } from "react-native";
import { ActivityIndicator, Pressable } from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import { Text } from "./text";
import { isRTL } from "@/i18n";
import { TxKeyPath } from "@/i18n";

const button = tv({
  slots: {
    container: "my-2 flex flex-row items-center justify-center rounded-md px-4",
    indicator: "h-6 text-white",
    accessory: "mx-2",
  },
  variants: {
    variant: {
      default: {
        container: "bg-black dark:bg-white",
        indicator: "text-white dark:text-black",
      },
      secondary: {
        container: "bg-primary-600",
        indicator: "text-white",
      },
      outline: {
        container: "border border-neutral-400",
        indicator: "text-black dark:text-neutral-100",
      },
      destructive: {
        container: "bg-red-600",
        indicator: "text-white",
      },
      ghost: {
        container: "bg-transparent",
        indicator: "text-black dark:text-white",
      },
      link: {
        container: "bg-transparent",
        indicator: "text-black",
      },
    },
    size: {
      default: {
        container: "h-10 px-4",
      },
      lg: {
        container: "h-12 px-8",
      },
      sm: {
        container: "h-8 px-3",
        indicator: "h-2",
      },
      icon: { container: "size-9" },
    },
    disabled: {
      true: {
        container: "bg-neutral-300 dark:bg-neutral-300",
        indicator: "text-neutral-400 dark:text-neutral-400",
      },
    },
    fullWidth: {
      true: {
        container: "w-full",
      },
      false: {
        container: "self-center",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    disabled: false,
    fullWidth: true,
    size: "default",
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, "disabled"> {
  label?: string;
  tx?: TxKeyPath;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label,
      tx,
      loading = false,
      variant = "default",
      disabled = false,
      size = "default",
      className = "",
      testID,
      textClassName = "",
      textSize = "base",
      leftAccessory,
      rightAccessory,
      ...props
    },
    ref
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, size }),
      [variant, disabled, size]
    );

    // Determine the correct accessory positions based on RTL
    const renderLeftAccessory = isRTL ? rightAccessory : leftAccessory;
    const renderRightAccessory = isRTL ? leftAccessory : rightAccessory;

    return (
      <Pressable
        disabled={disabled || loading}
        className={styles.container({ className })}
        {...props}
        ref={ref}
        testID={testID}
      >
        {renderLeftAccessory && (
          <View className={styles.accessory()}>{renderLeftAccessory}</View>
        )}
        {loading ? (
          <ActivityIndicator
            size="small"
            className={styles.indicator()}
            testID={testID ? `${testID}-activity-indicator` : undefined}
          />
        ) : (
          <Text
            testID={testID ? `${testID}-label` : undefined}
            className={textClassName}
            size={textSize}
            weight="medium"
            tx={tx}
          >
            {label}
          </Text>
        )}
        {renderRightAccessory && (
          <View className={styles.accessory()}>{renderRightAccessory}</View>
        )}
      </Pressable>
    );
  }
);
