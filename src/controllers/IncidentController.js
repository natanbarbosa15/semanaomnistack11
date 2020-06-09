const firebaseAdmin = require("../utils/firebaseAdmin");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.cep",
        "ongs.city",
        "ongs.state",
        "ongs.street",
        "ongs.streetNumber",
      ])
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents);
  },

  async create(request, response) {
    try {
      const { title, description, value } = request.body;
      const idToken = request.headers.authorization.split("Bearer ")[1];
      const user = await firebaseAdmin.auth().verifyIdToken(idToken, true);
      if (user) {
        const ong_id = user.uid;

        const [id] = await connection("incidents")
          .insert({
            title,
            description,
            value,
            ong_id,
          })
          .returning("id");

        return response.json({ id });
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

  async read(request, response) {
    try {
      const { id } = request.params;
      const idToken = request.headers.authorization.split("Bearer ")[1];
      const user = await firebaseAdmin.auth().verifyIdToken(idToken, true);
      if (user) {
        const ong_id = user.uid;

        const incident = await connection("incidents")
          .select([
            "incidents.*",
            "ongs.name",
            "ongs.email",
            "ongs.whatsapp",
            "ongs.cep",
            "ongs.city",
            "ongs.state",
            "ongs.street",
            "ongs.streetNumber",
          ])
          .join("ongs", "ongs.id", "=", "incidents.ong_id")
          .where("incidents.id", id)
          .first();

        if (incident.ong_id !== ong_id) {
          return response
            .status(401)
            .json({ error: "Operation not permitted." });
        }

        return response.json(incident);
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

  async delete(request, response) {
    try {
      const { id } = request.params;
      const idToken = request.headers.authorization.split("Bearer ")[1];
      const user = await firebaseAdmin.auth().verifyIdToken(idToken, true);
      if (user) {
        const ong_id = user.uid;

        const incident = await connection("incidents")
          .select("ong_id")
          .where("id", id)
          .first();

        if (incident.ong_id !== ong_id) {
          return response
            .status(401)
            .json({ error: "Operation not permitted." });
        }

        await connection("incidents").where("id", id).delete();

        return response.status(204).send();
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
