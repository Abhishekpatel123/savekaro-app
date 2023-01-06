import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login, Register, ForgotPassword } from "../screens";

const SignedOutStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"login"}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        component={Login}
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
  );
};

export default SignedOutStack;
