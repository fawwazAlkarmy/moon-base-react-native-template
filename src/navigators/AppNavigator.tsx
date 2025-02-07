import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { AuthNavigator, AuthStackParamList } from "./AuthNavigator";
import Config from "config";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ComponentProps } from "react";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";

export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
