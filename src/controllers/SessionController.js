const connection = require("../database/connection");
const { getCurrentUser } = require("../utils/auth");

module.exports = {
  async create(request, response) {
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

      return response.json({ name: ong.name });
    } catch (error) {
      console.error(error);
      return response.status(500).send("Internal Server Error");
    }
  },
};
