// System-managed layout — extend in place, never rewrite from scratch.
// Keep the provider chain intact: ErrorBoundary → OneDollarStats → SafeArea → QueryClient.
// To switch navigation, replace only the <Slot /> line with <Stack /> or <Tabs />.
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { ProgressProvider } from "../lib/progress";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "../components/__ErrorBoundary";
import { OneDollarStatsProvider } from "../lib/__analytics";
import { isWeb, startWebSafeArea } from "../lib/__web-safe-area";
import appJson from "../app.json";

const queryClient = new QueryClient();

const applicationId = appJson.expo.extra.applicationId ?? "";
const hostname = applicationId ? `${applicationId}-mobile` : "localhost";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/poppins-regular.ttf"),
    PoppinsSemi: require("../assets/fonts/poppins-semibold.ttf"),
    PoppinsBold: require("../assets/fonts/poppins-bold.ttf"),
  });
  useEffect(() => {
    if (isWeb) startWebSafeArea();
  }, []);

  if (!fontsLoaded)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f9f3",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="#78a747" />
      </View>
    );

  return (
    <ErrorBoundary>
      {/* Runable analytics provider — do not remove, required for analytics tracking */}
      <OneDollarStatsProvider
        config={{
          hostname,
          collectorUrl: "https://r.lilstts.com/events",
          devmode: true,
        }}
      >
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar style="dark" />
            <ProgressProvider>
              <Slot />
            </ProgressProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </OneDollarStatsProvider>
    </ErrorBoundary>
  );
}
