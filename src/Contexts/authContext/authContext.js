import { useContext, createContext, useReducer } from "react";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../../Constants";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    user: JSON.parse(localStorage.getItem("AUTH_USER")) || undefined,
    isLoggedIn: localStorage.getItem("AUTH_TOKEN") ? true : false,
    token: localStorage.getItem("AUTH_TOKEN") || null,
    error: undefined,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case LOGIN_REQUEST: {
        return { ...state, isLoading: false };
      }
      case LOGIN_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          user: JSON.parse(localStorage.getItem("AUTH_USER")) || undefined,
          token: localStorage.getItem("AUTH_TOKEN") || undefined,
          isLoggedIn: true,
        };
      }
      case LOGIN_FAILED: {
        return {
          ...state,
          isLoggedIn: false,
          isLoading: false,
          error: action.payload,
        };
      }
      case SIGNUP_REQUEST: {
        return { ...state, isLoading: false };
      }
      case SIGNUP_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          user: JSON.parse(localStorage.getItem("AUTH_USER")) || undefined,
          token: localStorage.getItem("AUTH_TOKEN") || undefined,
          isLoggedIn: true,
        };
      }
      case SIGNUP_FAILED: {
        return {
          ...state,
          isLoggedIn: false,
          isLoading: false,
          error: action.payload,
        };
      }
      case LOGOUT: {
        return {
          ...state,
          isLoggedIn: false,
          isLoading: false,
          error: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth should be in AuthContext");
  }

  return context;
};

export { useAuth, AuthProvider };
