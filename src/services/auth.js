export const getToken = () => {
  const keys = Object.keys(window.sessionStorage);
  const key = keys.find((element) => element.startsWith("firebase"));
  var token = undefined;
  if (key) {
    token = JSON.parse(window.sessionStorage.getItem(key)).stsTokenManager
      .accessToken;
  }
  return token;
};
export const login = async (email, password, firebase) => {
  try {
    const user = await firebase.signInWithEmailAndPassword(email, password);
    return user.user;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (firebase) => {
  try {
    await firebase.signOut();
  } catch (error) {
    console.log(error);
  }
};
