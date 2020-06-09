const admin = require("firebase-admin");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${process.env.GOOGLE_CLOUD_PROJECT}.firebaseio.com`,
});

module.exports = firebaseAdmin;
