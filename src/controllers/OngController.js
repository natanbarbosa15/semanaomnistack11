const firebaseAdmin = require("../utils/firebaseAdmin");
const connection = require("../database/connection");
const { getCurrentUser } = require("../utils/auth");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    try {
      const {
        name,
        email,
        password,
        whatsapp,
        cep,
        city,
        state,
        neighborhood,
        street,
        streetNumber,
      } = request.body;

      const user = await firebaseAdmin.auth().createUser({
        email,
        password,
        emailVerified: true,
        displayName: String(name),
      });

      if (user) {
        const id = user.uid;

        await connection("ongs").insert({
          id,
          name,
          email,
          whatsapp,
          cep,
          city,
          state,
          neighborhood,
          street,
          streetNumber,
        });

        return response.status(200).send();
      }
    } catch (error) {
      if (error.errorInfo.code === "auth/email-already-exists") {
        return response
          .status(400)
          .send({ message: "O Email fornecido já está cadastrado." });
      }
      console.error(error);
      return response.status(500).send("Internal Server Error");
    }
  },

  async update(request, response) {
    try {
      const {
        name,
        email,
        password,
        whatsapp,
        cep,
        city,
        state,
        neighborhood,
        street,
        streetNumber,
      } = request.body;

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

      await firebaseAdmin.auth().updateUser(user.id, {
        email,
        password,
        displayName: `${name} ${email}`,
      });

      await connection("ongs")
        .update({
          name,
          email,
          whatsapp,
          cep,
          city,
          state,
          neighborhood,
          street,
          streetNumber,
        })
        .where("id", user.id);

      return response.status(200).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send("Internal Server Error");
    }
  },

  async delete(request, response) {
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

      await firebaseAdmin.auth().deleteUser(user.id);
      await connection("ongs").delete().where("id", user.id);
      await connection("incidents").delete().where("ong_id", user.id);

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send("Internal Server Error");
    }
  },
};
