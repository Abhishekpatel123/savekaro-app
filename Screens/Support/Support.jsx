import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomInput from "../../helpers/CustomInput";
import { Formik } from "formik";
import * as yup from "yup";
import CustomButtom from "../../helpers/CustomButtom";
import config from "../../src/config";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { Colors } from "../../constants/colors";

const supportSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  phoneNumber: yup
    .string()
    .min(10, ({ min }) => `Phone number must be at least ${10} number`)
    .max(11, ({ min }) => `Phone number must be at most ${10} number`)
    .required("Phone number is required"),
  description: yup.string().required("Problem description is Required"),
});

const Support = () => {
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={{ flex: 1 }}
    // >

    <ScrollView>
      <View style={[styles.root, styles.image]}>
        <Image
          style={styles.image}
          source={require("../../icons/support.png")}
        />
        <View
          style={{
            width: "90%",
          }}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "91",
              description: "",
            }}
            validationSchema={supportSchema}
            onSubmit={async (values, actions) => {
              await axios
                .post(config.support_url, values)
                .then((res) => {
                  console.log(res.data);
                  alert("Successfull");
                })
                .catch((err) => alert("Server error"));
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <Spinner visible={isSubmitting} textContent="Loading..." />
                <CustomInput
                  label={"Your name"}
                  touched={touched.name}
                  error={errors.name}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="Enter your name"
                />
                <CustomInput
                  label={"E-mail"}
                  touched={touched.email}
                  error={errors.email}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                />
                <CustomInput
                  label={"Phone number"}
                  touched={touched.phoneNumber}
                  error={errors.phoneNumber}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  keyboardType="phone-pad"
                  placeholder="Enter your phone number"
                />
                <CustomInput
                  value={values.description}
                  touched={touched.description}
                  error={errors.description}
                  label={"Problem description"}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  multiline
                  numberOfLines={5}
                  placeholder="Enter description"
                />
                <CustomButtom
                  name="Submit"
                  color={Colors.primary}
                  isSubmitting={isSubmitting}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Support;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "white" },
  image: { alignItems: "center" },
});
