import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBpUx0B216OFRlSrDGVPm4T7CUTQYMv0BU",
  authDomain: "wb-catch-of-the-day-codywc.firebaseapp.com",
  databaseURL: "https://wb-catch-of-the-day-codywc-default-rtdb.firebaseio.com",
});

//rebase binding
const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

export default base;
