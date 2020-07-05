import axios from "axios";

function Api(firebase) {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 15000,
  });

  api.interceptors.request.use(async (config) => {
    if (firebase) {
      const signed = await firebase.isSignedIn();
      if (signed) {
        const token = await firebase.getIdToken();
        if (token) {
          if (process.env.NODE_ENV === "production") {
            config.headers.Authorization = `Bearer ${token}`;
          } else {
            config.headers["x-endpoint-api-userinfo"] = `${token}`;
          }
        }
      }
    }
    return config;
  });

  return api;
}

export default Api;
