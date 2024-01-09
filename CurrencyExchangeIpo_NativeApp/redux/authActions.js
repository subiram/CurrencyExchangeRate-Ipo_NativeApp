// authActions.js

export const setUsername = (username) => ({
  type: "SET_USERNAME",
  payload: username,
});

export const setPassword = (password) => ({
  type: "SET_PASSWORD",
  payload: password,
});

export const setCaptcha = (captcha) => ({
  type: "SET_CAPTCHA",
  payload: captcha,
});

export const setInputCaptcha = (inputCaptcha) => ({
  type: "SET_INPUT_CAPTCHA",
  payload: inputCaptcha,
});

export const setErrorMessage = (errorMessage) => ({
  type: "SET_ERROR_MESSAGE",
  payload: errorMessage,
});

export const setSignupUsername = (signupUsername) => ({
  type: "SET_SIGNUP_USERNAME",
  payload: signupUsername,
});

export const setSignupEmail = (signupEmail) => ({
  type: "SET_SIGNUP_EMAIL",
  payload: signupEmail,
});

export const setSignupPassword = (signupPassword) => ({
  type: "SET_SIGNUP_PASSWORD",
  payload: signupPassword,
});

export const setSignupErrorMessage = (signupErrorMessage) => ({
  type: "SET_SIGNUP_ERROR_MESSAGE",
  payload: signupErrorMessage,
});

export const saveUserData = (userData) => ({
  type: "SAVE_USER_DATA",
  payload: userData,
});
