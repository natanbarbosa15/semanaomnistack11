import Constants from "expo-constants";
import axios from "axios";

/* Endereços para cada emulador/simulador:
 ** Genymotion:              http://10.0.3.2:3333/
 ** Emulador Android Studio: http://10.0.2.2:3333/
 ** Simulador IOS:           http://localhost:3333/
 */

function Api(firebase) {
  const api = axios.create({
    baseURL: String(Constants.manifest.extra.apiUrl),
    timeout: 10000,
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
