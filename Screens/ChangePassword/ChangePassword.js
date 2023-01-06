import axios from "axios";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import config from "../../src/config";
import { Colors } from "../../constants/colors";
import CustomButtom from "../../helpers/CustomButtom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const change = () => {
    if (password === confPassword) {
      setLoading(true);
      axios
        .patch(
          config.changePassword_url,
          {
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.message);
          if (res.data.name) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
      setPassword("");
      setConfPassword("");
    } else {
      alert("Password's do not match!");
    }
  };

  if (loading) {
    return <Spinner visible={loading} textContent="Loading..." />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>
          Change Password
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 15 }}> New Password</Text>
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="New Password"
            placeholderTextColor="black"
            style={{
              backgroundColor: "lightgray",
              borderRadius: 10,
              padding: 10,
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 15 }}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            value={confPassword}
            onChangeText={(e) => setConfPassword(e)}
            placeholderTextColor="black"
            style={{
              backgroundColor: "lightgray",
              borderRadius: 10,
              padding: 10,
            }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <CustomButtom
          name="RESET PASSWORD"
          color={Colors.primary}
          onPress={change}
          style={{
            width: 240,
          }}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
