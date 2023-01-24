import React, { useEffect, useState, useCallback } from "react";
import { Text, LogBox } from "react-native";
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Navigation from "./src/navigation";
import NoInternet from "./Screens/NoInternet/NoInternet";
import { Fonts } from "./src/styles";
import Store from "./Store/store";
import { store } from "./src/store";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

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
        <Provider store={store}>
          <Navigation />
        </Provider>
      ) : (
        <NoInternet />
      )}
    </>
  );
};

export default App;
