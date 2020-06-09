const firebaseAdmin = require("../utils/firebaseAdmin");
const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    try {
      const idToken = request.headers.authorization.split("Bearer ")[1];
      const user = await firebaseAdmin.auth().verifyIdToken(idToken, true);
      if (user) {
        const ong_id = user.uid;

        const ong = await connection("ongs")
          .select("name")
          .where("id", ong_id)
          .first();

        if (!ong) {
          return response.status(403).send("Forbidden");
        }

        return response.json(ong);
      } else {
        return response.status(403).send("Forbidden");
      }
    } catch (error) {
      if (error.code === "auth/id-token-expired") {
        return response.status(403).send("Forbidden");
      }
      return response.status(500).send("Internal Server Error");
    }
  },
};
