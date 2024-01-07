// authReducer.js

const initialState = {
  username: "",
  password: "",
  captcha: "",
  inputCaptcha: "",
  errorMessage: "",
  signupUsername: "",
  signupEmail: "",
  signupPassword: "",
  signupErrorMessage: "",
  userData: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CAPTCHA":
      return { ...state, captcha: action.payload };
    case "SET_INPUT_CAPTCHA":
      return { ...state, inputCaptcha: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    case "SET_SIGNUP_USERNAME":
      return { ...state, signupUsername: action.payload };
    case "SET_SIGNUP_EMAIL":
      return { ...state, signupEmail: action.payload };
    case "SET_SIGNUP_PASSWORD":
      return { ...state, signupPassword: action.payload };
    case "SET_SIGNUP_ERROR_MESSAGE":
      return { ...state, signupErrorMessage: action.payload };
    case "SAVE_USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default authReducer;
