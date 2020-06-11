const connection = require("../database/connection");
const { getCurrentUser } = require("../utils/auth");

module.exports = {
  async create(request, response) {
    try {
      const user = getCurrentUser(request);
      const ong_id = String(user.id);

      const ong = await connection("ongs")
        .select("name")
        .where("id", ong_id)
        .first();

      if (!ong) {
        return response.status(403).send("Forbidden");
      }

      return response.json(ong);
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },
};
