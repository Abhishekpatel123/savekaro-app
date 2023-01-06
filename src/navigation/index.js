import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

// -
import SignedInStack from "./SignedInStack";
import SignedOutStack from "./SignedOutStack";
import { setAccessToken } from "../store/features/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const isUserLoggedIn = async () => {
    console.log(
      accessToken,
      await AsyncStorage.getItem("accessToken"),
      "accessToken redux, in async storage"
    );

    if (!accessToken)
      dispatch(setAccessToken(await AsyncStorage.getItem("accessToken")));
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      {accessToken ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
};

export default Navigation;
