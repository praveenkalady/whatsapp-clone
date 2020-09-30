import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';

import 'firebase/auth'
import 'firebase/firestore';
import { createStore, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
const fbConfig = {
  apiKey: "AIzaSyDYplPTd9ogAyZhg4VdOLrC8Bb2QktsdCw",
  authDomain: "whatsapp-clone-76f69.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-76f69.firebaseio.com",
  projectId: "whatsapp-clone-76f69",
  storageBucket: "whatsapp-clone-76f69.appspot.com",
  messagingSenderId: "165880426845",
  appId: "1:165880426845:web:04731a8baa8f5f5298f8b4",
  measurementId: "G-9143VC7S55"
}


const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true 
}

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(fbConfig)
firebase.firestore() 
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth:authReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState,composeWithDevTools())

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}
export { provider };

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <App />
    </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
