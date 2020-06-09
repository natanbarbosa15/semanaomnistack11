const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    try {
      const encodedHeader = request.header("x-endpoint-api-userinfo");
      const decodedHeader = JSON.parse(Buffer.from(encodedHeader, "base64"));
      const ong_id = String(decodedHeader.id);

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
