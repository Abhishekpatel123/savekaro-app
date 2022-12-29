import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  onChangeText,
  onBlur,
  label,
  placeholder,
  error,
  touched,
  multiline = false,
  ...rest
}) => {
  return (
    <View style={[styles.root]}>
      <Text style={styles.label}> {label}</Text>
      {console.log(multiline)}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="black"
        style={[
          styles.input,
          {
            borderWidth: 1,
            borderColor: error ? "red" : "#333",
            textAlignVertical: multiline ? "top" : "center",
          },
        ]}
        multiline={multiline}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default React.memo(CustomInput);

const styles = StyleSheet.create({
  root: { marginTop: 12 },
  label: { fontSize: 15, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightgray",
  },
  errorText: { color: "red" },
});
