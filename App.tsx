import "./global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import ErrorBoundary from "react-native-error-boundary";
import { StyleSheet } from "react-native";
import { loadSelectedTheme, useThemeConfig } from "@/utils";
import { APIProvider } from "@/api";
import { AppNavigator } from "@/navigators";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

SplashScreen.hideAsync();

export default function App() {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <KeyboardProvider>
              <ThemeProvider value={theme}>
                <APIProvider>
                  <BottomSheetModalProvider>
                    {children}
                    <FlashMessage position="top" />
                  </BottomSheetModalProvider>
                </APIProvider>
              </ThemeProvider>
            </KeyboardProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
