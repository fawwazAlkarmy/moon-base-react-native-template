import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppStackParamList } from "./AppNavigator";
import { Onboarding } from "@/screens";

export type AuthStackParamList = {
  Onboarding: undefined;
};

export type AuthStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};
