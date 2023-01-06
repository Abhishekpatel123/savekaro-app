import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import mail from "../../icons/1x/mail.png";
import lock from "../../icons/1x/lock.png";
import confirm from "../../icons/1x/password.png";
import phones from "../../icons/1x/phone.png";
import usernames from "../../icons/1x/username.png";
import logo from "../../icons/app-lo.png";
import config from "../config";
import axiosInstance from "../api/axiosInstance";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email("Invalid email.").required("Required !"),
  phone: Yup.string()
    .matches(/^[0-9]+$/)
    .required(),
  password: Yup.string().required(),
  confirmPassword: Yup.ref("password"),
});

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <Spinner textContent="Loading.." visible={loading} />;
  }

  const handleRegister = async (values) => {
    setLoading(true);
    delete values.confirmPassword;
    try {
      console.log(config.register_url, "url ");
      const { data } = await axiosInstance.post("/user/register", values);
      alert(data.message);
      navigation.replace("login");
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center" }}>
        <Image source={logo} style={{ width: 160, height: 130 }} />
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 23,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Create New Account
      </Text>

      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={RegisterSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScrollView behavior="height" style={{ margin: 19 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",
                padding: 5,
                borderRadius: 10,
                margin: 5,
              }}
            >
              <Image
                source={usernames}
                style={{
                  height: 35,
                  width: 40,
                  margin: 3,
                }}
              />

              <TextInput
                placeholder="Full name"
                style={{ width: 300, marginLeft: 20 }}
                placeholderTextColor="black"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoFocus={true}
                autoComplete={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",
                padding: 5,
                borderRadius: 10,
                marginTop: 10,
                margin: 5,
              }}
            >
              <Image
                source={mail}
                style={{
                  width: 40,
                  height: 35,
                  borderRadius: 5,
                  margin: 3,
                }}
              />

              <TextInput
                placeholder="Email"
                style={{ width: 300, marginLeft: 20 }}
                placeholderTextColor="black"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoComplete={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 5,
                backgroundColor: "lightgray",
                padding: 5,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={lock}
                style={{
                  borderRadius: 5,
                  width: 35,
                  height: 45,
                  margin: 3,
                }}
              />

              <TextInput
                placeholder="Password"
                style={{ width: 300, marginLeft: 20 }}
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoComplete={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",
                padding: 5,
                margin: 5,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={confirm}
                style={{
                  height: 40,
                  width: 45,
                }}
              />

              <TextInput
                placeholder="Confirm Password"
                style={{ width: 300, marginLeft: 20 }}
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                autoComplete={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",
                padding: 5,
                borderRadius: 10,
                margin: 5,
                marginTop: 10,
              }}
            >
              <Image
                source={phones}
                style={{
                  width: 15,
                  height: 40,
                  marginLeft: 15,
                }}
              />
              <TextInput
                placeholder="Phone Number"
                style={{ width: 300, marginLeft: 35 }}
                placeholderTextColor="black"
                keyboardType="number-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                autoComplete={false}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: "green",
                  width: 200,
                  borderRadius: 20,
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Register
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Register;
