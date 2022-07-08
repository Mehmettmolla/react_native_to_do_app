import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "-",
  authDomain: "-",
  projectId: "-",
  storageBucket: "-",
  messagingSenderId: "-",
  appId: "-"
};

  if(firebase.apps.length ===0){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;