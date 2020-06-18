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
    this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);
  }

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(function (user) {
        if (user) {
          const email = user.email;
          const name = user.displayName;
          const id = user.uid;
          resolve({ email, name, id });
        } else {
          resolve({ email: null, name: null, id: null });
        }
      });
    });
  };

  signOut = () => this.auth.signOut();
}

export default Firebase;
