const firebaseAdmin = require("../utils/firebaseAdmin");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ongs = await connection("ongs").select("*");

    return res.json(ongs);
  },

  async create(req, res) {
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
      } = req.body;

      const user = await firebaseAdmin.auth().createUser({
        email,
        password,
        emailVerified: true,
        displayName: `${name} ${email}`,
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

        return res.status(200).send();
      }
    } catch (error) {
      if (error.errorInfo.code === "auth/email-already-exists") {
        return res
          .status(400)
          .send({ message: "O Email fornecido já está cadastrado." });
      }
      return res.status(500).send("Internal Server Error");
    }
  },
};
