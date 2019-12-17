import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

  var config = {
    apiKey: "AIzaSyAUjbbv6BvgW9kY8I4aG-BroukmQYJBq2Q",
    authDomain: "soundsphere-f7c67.firebaseapp.com",
    databaseURL: "https://soundsphere-f7c67.firebaseio.com",
    projectId: "soundsphere-f7c67",
    storageBucket: "soundsphere-f7c67.appspot.com",
    messagingSenderId: "739868308791",
    appId: "1:739868308791:web:f627e0148f751e043c96b2",
    measurementId: "G-JVV82P0ESB"
  };

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;