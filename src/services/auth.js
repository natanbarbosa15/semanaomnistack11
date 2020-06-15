export const TOKEN_KEY = "@firebase-Token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = async (email, password, firebase) => {
  try {
    const user = await firebase.signInWithEmailAndPassword(email, password);
    const token = await user.user.getIdToken(true);
    localStorage.setItem(TOKEN_KEY, token);
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
