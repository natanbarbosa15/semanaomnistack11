const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    try {
      const encodedHeader = request.header("x-endpoint-api-userinfo");
      const decodedHeader = JSON.parse(Buffer.from(encodedHeader, "base64"));
      const ong_id = String(decodedHeader.id);

      const incidents = await connection("incidents")
        .select("*")
        .where("ong_id", ong_id);

      return response.json(incidents);
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },
};
