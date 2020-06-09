const firebaseAdmin = require("../utils/firebaseAdmin");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    try {
      const idToken = request.headers.authorization.split("Bearer ")[1];
      const user = await firebaseAdmin.auth().verifyIdToken(idToken, true);
      if (user) {
        const ong_id = user.uid;

        const incidents = await connection("incidents")
          .select("*")
          .where("ong_id", ong_id);

        return response.json(incidents);
      } else {
        return response.status(403).send("Forbidden");
      }
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },
};
