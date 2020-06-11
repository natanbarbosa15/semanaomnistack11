const connection = require("../database/connection");
const { getCurrentUser } = require("../utils/auth");

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
        "ongs.neighborhood",
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
      const user = getCurrentUser(request);
      if (!user) {
        return response.status(403).send("Forbidden");
      }
      const ong_id = String(user.id);

      const [id] = await connection("incidents")
        .insert({
          title,
          description,
          value,
          ong_id,
        })
        .returning("id");

      return response.json({ id });
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },

  async read(request, response) {
    try {
      const { id } = request.params;
      const user = getCurrentUser(request);
      if (!user) {
        return response.status(403).send("Forbidden");
      }
      const ong_id = String(user.id);

      const incident = await connection("incidents")
        .select([
          "incidents.*",
          "ongs.name",
          "ongs.email",
          "ongs.whatsapp",
          "ongs.cep",
          "ongs.city",
          "ongs.state",
          "ongs.neighborhood",
          "ongs.street",
          "ongs.streetNumber",
        ])
        .join("ongs", "ongs.id", "=", "incidents.ong_id")
        .where("incidents.id", id)
        .first();

      if (!incident) {
        return response.status(404).json({ message: "Not found." });
      }

      if (incident.ong_id !== ong_id) {
        return response
          .status(401)
          .json({ message: "Operation not permitted." });
      }

      return response.json(incident);
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },

  async update(request, response) {
    try {
      const { title, description, value } = request.body;
      const { id } = request.params;
      const user = getCurrentUser(request);
      if (!user) {
        return response.status(403).send("Forbidden");
      }

      const ong_id = String(user.id);

      const incident = await connection("incidents")
        .select("ong_id")
        .where("id", id)
        .first();

      if (incident.ong_id !== ong_id) {
        return response.status(401).json({ error: "Operation not permitted." });
      }

      await connection("incidents")
        .update({
          title,
          description,
          value,
        })
        .where("id", id);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = getCurrentUser(request);
      if (!user) {
        return response.status(403).send("Forbidden");
      }
      const ong_id = String(user.id);

      const incident = await connection("incidents")
        .select("ong_id")
        .where("id", id)
        .first();

      if (!incident) {
        return response.status(404).json({ message: "Not found." });
      }

      if (incident.ong_id !== ong_id) {
        return response.status(401).json({ error: "Operation not permitted." });
      }

      await connection("incidents").delete().where("id", id);

      return response.status(204).send();
    } catch (error) {
      return response.status(500).send("Internal Server Error");
    }
  },
};
