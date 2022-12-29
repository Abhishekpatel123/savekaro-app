import React, { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import Login from "./Screens/Login/Login";
import Store from "./Store/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNav/DrawerNavigation";
import Register from "./Screens/Register/Register";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./Screens/NoInternet/NoInternet";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import axios from "axios";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [internet, setInternet] = useState(null);

  // FONT
  const [fontsLoaded] = useFonts({
    Bold: require("./src/assets/fonts/RobotoMono-Bold.ttf"),
    "Bold-Italic": require("./src/assets/fonts/RobotoMono-BoldItalic.ttf"),
    ExtraLight: require("./src/assets/fonts/RobotoMono-ExtraLight.ttf"),
    "ExtraLight-Italic": require("./src/assets/fonts/RobotoMono-ExtraLightItalic.ttf"),
    Italic: require("./src/assets/fonts/RobotoMono-Italic.ttf"),
    Light: require("./src/assets/fonts/RobotoMono-Light.ttf"),
    "Light-Italic": require("./src/assets/fonts/RobotoMono-LightItalic.ttf"),
    Medium: require("./src/assets/fonts/RobotoMono-Medium.ttf"),
    "Medium-Italic": require("./src/assets/fonts/RobotoMono-MediumItalic.ttf"),
    Regular: require("./src/assets/fonts/RobotoMono-Regular.ttf"),
    SemiBold: require("./src/assets/fonts/RobotoMono-SemiBold.ttf"),
    SemiBoldItalic: require("./src/assets/fonts/RobotoMono-SemiBoldItalic.ttf"),
    Thin: require("./src/assets/fonts/RobotoMono-Thin.ttf"),
    ThinItalic: require("./src/assets/fonts/RobotoMono-ThinItalic.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) await SplashScreen.hideAsync();
  // }, [fontsLoaded]);

  const fetchInternet = async () => {
    await NetInfo.fetch().then((state) => {
      setInternet(state.isConnected);
    });
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    fetchInternet();
  }, []);

  if (!fontsLoaded) return <Text>font not loaded yet</Text>;
  else SplashScreen.hideAsync();

  return (
    <>
      {internet ? (
        <NavigationContainer>
          <Provider store={Store}>
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen
                name="login"
                options={{
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={Login}
              />
              <Stack.Screen
                name="home"
                options={{
                  headerShown: false,
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={DrawerNavigation}
              />
              <Stack.Screen
                name="register"
                options={{
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={Register}
              />
              <Stack.Screen
                name="forgotpassword"
                options={{
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={ForgotPassword}
              />
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      ) : (
        <NoInternet />
      )}
    </>
  );
};

export default App;
