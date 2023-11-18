import { createContext, useReducer, useEffect } from "react";
import { useSelector } from 'react-redux';
import apiService from '../app/apiService';
import {isValidToken} from '../utils/jwt';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const INITIALIZE = "INITIALIZE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const CREATE_USER_SUCCESS ="CREATE_USER_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case CREATE_USER_SUCCESS:
      return{
        ...state,
        isAuthenticated: true,
        user: null,
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      case UPDATE_PROFILE:
        const {
          name
        } = action.payload;
        return {...state,
          user:{...state.user,
            name
          }}
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = ( accessToken, userId ) => {
  if ( accessToken ) {
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('userId', userId);
      apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('userId');
      delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updatedProfile, currentUser } = useSelector((state)=> state.user)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const userId = window.localStorage.getItem("userId");

        if ( accessToken && userId && isValidToken(accessToken) ) {
            setSession(accessToken, userId);
  
            const response = await apiService.get(`/users/${userId}`);
            const user = response.data.items;
            console.log("user in initialize: ", user);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, [] );

  useEffect(() => {
    if ( updatedProfile )
    dispatch({
      type: UPDATE_PROFILE,
      payload: updatedProfile
    });
  },[updatedProfile]);


  const login = async ({email, password}, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    console.log("response in login", response)
    const {user, accessToken} = response.data;
    const userId = user._id;

    setSession (accessToken, userId);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const register = async ({name, email, password}, callback) => {
    const response = await apiService.post("/users", {name, email, password });
    console.log("response in register", response)
    const {user, accessToken} = response.data;
    const userId = user._id;
    setSession (accessToken, userId);
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: { user },
    });
    callback();
  };


  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };