import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.GOOGLE_CLOUD_PROJECT}.firebaseapp.com`,
  databaseURL: `https://${process.env.GOOGLE_CLOUD_PROJECT}.firebaseio.com`,
  projectId: `${process.env.GOOGLE_CLOUD_PROJECT}`,
  storageBucket: `${process.env.GOOGLE_CLOUD_PROJECT}.appspot.com`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appID: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  getCurrentUser = () => {
    const email = this.auth.currentUser.email;
    const name = this.auth.currentUser.displayName;
    const id = this.auth.currentUser.uid;
    return { email, name, id };
  };

  signOut = () => this.auth.signOut();
}

export default Firebase;
