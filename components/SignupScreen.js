// SignupScreen.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupUsername,
  setSignupEmail,
  setSignupPassword,
  setSignupErrorMessage,
  saveUserData
} from "../redux/authActions";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleRegister = () => {
    // Access the state using authState
    const { signupUsername, signupEmail, signupPassword } = authState;

    // Validate the form fields
    if (!signupUsername || !signupEmail || !signupPassword) {
      dispatch(setSignupErrorMessage("All fields are mandatory."));
    } else if (!/^[a-zA-Z0-9_]+$/.test(signupUsername)) {
      dispatch(
        setSignupErrorMessage(
          "Username should be alphanumeric with underscores and no spaces."
        )
      );
    } else if (!/^\S+@\S+\.\S+$/.test(signupEmail)) {
      dispatch(setSignupErrorMessage("Invalid email address."));
    } else {
      // Save the user data (you can dispatch an action to save it to Redux store or perform an API call)
      // For now, let's just display the data
      console.log("Username:", signupUsername);
      console.log("Email:", signupEmail);
      console.log("Password:", signupPassword);
      dispatch(
        saveUserData({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
        })
      );

      // Navigate back to the login screen
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => dispatch(setSignupUsername(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => dispatch(setSignupEmail(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => dispatch(setSignupPassword(text))}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {authState.signupErrorMessage ? (
        <Text style={styles.errorText}>{authState.signupErrorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 3, // for Android 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  loginButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default SignupScreen;
