import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyATFcSGYR2-7JzSb8gbkMWL7MdWphQWbok",
  authDomain: "react-gallery-f66cf.firebaseapp.com",
  databaseURL: "https://react-gallery-f66cf.firebaseio.com",
  projectId: "react-gallery-f66cf",
  storageBucket: "react-gallery-f66cf.appspot.com",
  messagingSenderId: "138325170415",
  appId: "1:138325170415:web:7fa6e40c2e43fcf501631a"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFireStore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectStorage, projectFireStore, timestamp };