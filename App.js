import React, { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import Login from "./Screens/Login/Login";
import Store from "./Store/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "./src/navigation";
import Register from "./Screens/Register/Register";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./Screens/NoInternet/NoInternet";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import axios from "axios";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Fonts } from "./src/styles";
// import {} from

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [internet, setInternet] = useState(null);

  const fetchInternet = async () =>
    await NetInfo.fetch().then((state) => setInternet(state.isConnected));

  // FONT
  const [fontsLoaded] = useFonts(Fonts.fontStore);

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
          <Provider store={{ ...Store }}>
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
                component={Drawer}
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
