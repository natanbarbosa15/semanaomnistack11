const firebase = jest.genMockFromModule("firebase-admin");

const createUser = jest.fn(
  ({ email, password, emailVerified, displayName }) => {
    return Promise.resolve({
      uid: 1,
      email,
      password,
      emailVerified,
      displayName,
    });
  }
);

firebase.initializeApp = () => {
  return {
    auth: () => {
      return {
        createUser,
      };
    },
  };
};

module.exports = firebase;
