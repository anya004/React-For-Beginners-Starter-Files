import Rebase from "re-base";
import * as firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
});

const base = Rebase.createClass(firebaseApp.database());

//named export
export { firebaseApp };

//default export
export default base;
