import { useFonts } from "expo-font";
import { Redirect, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import Colors from "@/constants/Colors";
import { AuthProvider } from "@/context/authContext";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// const CLERK_FRONTEND_API = Constants.manifest.extra.clerkFrontendApi;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key!);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache!}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/(modals)/login");
  //   }
  // }, [isLoaded]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            title: "",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: Colors.bgColor,
            },
            headerTitleAlign: "center", // Center the title
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => router.back()}>
            //     <Ionicons name="close-outline" size={28} color={"white"}/>
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: Colors.bgColor,
            },
            headerTitleAlign: "center", // Center the title
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => router.back()}>
            //     <Ionicons name="close-outline" size={28} color={"white"}/>
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              color: "white",
            },
            headerStyle: {
              backgroundColor: Colors.bgColor,
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
