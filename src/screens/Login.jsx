import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";

import { Logo, Button } from "../components/atoms";
import { Colors } from "../styles";
import axiosInstance from "../api/axiosInstance";
import { loginApi, setAccessToken, setUser } from "../store/features/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Required !"),
  password: Yup.string().required(),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  
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

  // useEffect(() => {
  //   getPrev();
  // }, []);

  // Loading logged in user.. if exist
  // const getPrev = async () => {
  //   const accessToken = await AsyncStorage.getItem("accessToken");
  //   if (!accessToken) return;
  //   dispatch(setAccessToken(accessToken));
  //   try {
  //     const { data } = await axiosInstance.get("/user/me", {
  //       headers: { Authorization: "Bearer " + accessToken },
  //     });
  //     dispatch(setUser(data.user));
  //     navigation.replace("home");
  //   } catch (err) {
  //     console.log(err, "erro");
  //     alert("Session has expired please login ->!");
  //   }
  // };

  // Login handler...
  const handleLogin = async (values) => {
    try {
      console.log(values,'va')
      dispatch(loginApi(values));
      // const { data } = await axiosInstance().post("/user/login", values);
      // console.log(data, "data");
      // dispatch(setAccessToken(data.accessToken));
      // dispatch(setAccessToken(data.user));
      // AsyncStorage.setItem("accessToken", data.accessToken);
      // navigation.replace("home");
    } catch (err) {
      console.log(err, "err");
      alert("Email/Password is incorrect");
    }
  };

  // loader..
  // if (loading) {
  //   return <Spinner textContent="Loading..." visible={loading} />;
  // }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.primary.main, paddingTop: 40 }}
    >
      <View style={{ alignItems: "center" }}>
        <Logo />
      </View>
      <View style={{ margin: 60 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={LoginSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                placeholder="Email..."
                style={{ padding: 10, borderBottomWidth: 0.3 }}
                placeholderTextColor="black"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoFocus={true}
                // autoComplete={false}
              />
              <TextInput
                placeholder="Password..."
                style={{ padding: 10, borderBottomWidth: 0.3, marginTop: 20 }}
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                // autoComplete={false}
              />
              <TouchableOpacity
                style={{
                  padding: 10,
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: 20,
                  marginTop: 30,
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  LOG IN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("forgotpassword")}
              >
                <Text
                  style={{
                    padding: 10,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Don't have an account?</Text>

        <TouchableOpacity
          style={{
            padding: 10,
            alignItems: "center",
            backgroundColor: "green",
            borderRadius: 20,
            width: 150,
            marginTop: 5,
          }}
          onPress={() => navigation.navigate("register")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
