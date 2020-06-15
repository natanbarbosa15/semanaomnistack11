const connection = require("../database/connection");
const { getCurrentUser } = require("../utils/auth");

module.exports = {
  async index(request, response) {
    try {
      const user = await getCurrentUser(request);
      if (!user) {
        return response.status(403).send("Forbidden");
      }
      const ong = await connection("ongs")
        .select("*")
        .where("id", user.id)
        .first();
      if (!ong) {
        return response.status(403).send("Forbidden");
      }
      const ong_id = String(ong.id);

      const incidents = await connection("incidents")
        .select("*")
        .where("ong_id", ong_id);

      return response.json(incidents);
    } catch (error) {
      console.error(error);
      return response.status(500).send("Internal Server Error");
    }
  },
};
