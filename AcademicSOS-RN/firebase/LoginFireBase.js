import * as firebase from 'firebase';
import FireBaseConfig from "./FireBaseConfig.js";

const database = firebase.initializeApp(FireBaseConfig).database();

const LoginFB = {
  loginUser: function(id, pw) {
    firebase.auth().signInWithEmailAndPassword(`${id}@u.nus.edu`, `${pw}`).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
}

export default LoginFB;