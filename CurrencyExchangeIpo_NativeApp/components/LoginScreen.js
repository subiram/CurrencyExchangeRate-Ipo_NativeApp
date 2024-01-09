import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword, setErrorMessage, setCaptcha } from "../redux/authActions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [enteredCaptcha, setEnteredCaptcha] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000);
    dispatch(setCaptcha(randomCaptcha.toString()));
  };

  const handleLogin = () => {
    const { username, password } = authState;

    if (!enteredCaptcha) {
      dispatch(setErrorMessage("Please enter the captcha."));
    } else if (username === "subi" && password === "mypassword" && enteredCaptcha === authState.captcha) {
      console.log("Authenticated User!");
      navigation.navigate("Dashboard");
    } else {
      dispatch(setErrorMessage("Invalid credentials or captcha. Please try again."));
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => dispatch(setUsername(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => dispatch(setPassword(text))}
        />

        <Text style={styles.captchaText}>Captcha: {authState.captcha}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Captcha"
          onChangeText={(text) => setEnteredCaptcha(text)} // Update local state
        />

        {authState.errorMessage ? (
          <Text style={styles.errorText}>{authState.errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
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
    elevation: 3,
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
  captchaText: {
    fontSize: 16,
    marginBottom: 8,
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
});

export default LoginScreen;
