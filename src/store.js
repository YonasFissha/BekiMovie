import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import notifyReducer from "./Reducers/notifyReducer";
import settingReducer from "./Reducers/settingReducer";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

//CustomerReducers

const firebaseConfig = {
  apiKey: "AIzaSyB7Evd2VZiVW_ub88nyZZKlkNMQUMitrXw",
  authDomain: "bekimovi.firebaseapp.com",
  databaseURL: "https://bekimovi.firebaseio.com",
  projectId: "bekimovi",
  storageBucket: "bekimovi.appspot.com",
  messagingSenderId: "194289090061",
  appId: "1:194289090061:web:59614c8b9102e110a85f44",
};

//React-Redux-Firebase Config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  setting: settingReducer,
});
//check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  const defaultValue = {
    allowRegistration: true,
  };

  localStorage.setItem("settings", JSON.stringify(defaultValue));
}
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
