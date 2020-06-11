const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
const basePath = "/api/v1";

describe("ONG, Session, Profile and Incidents", () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app).post(`${basePath}/ongs`).send({
      name: "teste",
      email: "teste@teste.com",
      password: "teste12345",
      whatsapp: "+5541999999999",
      cep: "80000-000",
      city: "Curitiba",
      state: "PR",
      neighborhood: "Centro",
      street: "Rua Centro",
      streetNumber: "1",
    });
    expect(response.statusCode).toBe(200);
  });

  it("should be able to list all ONGs", async () => {
    const ongTest = await connection("ongs").select("*").first();

    const response = await request(app).get(`${basePath}/ongs`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: String(ongTest.id),
        name: "teste",
        email: "teste@teste.com",
        whatsapp: "+5541999999999",
        cep: "80000-000",
        city: "Curitiba",
        state: "PR",
        neighborhood: "Centro",
        street: "Rua Centro",
        streetNumber: "1",
      },
    ]);
  });

  it("should be able to create a Login session", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const response = await request(app)
      .post(`${basePath}/sessions`)
      .set({ "x-endpoint-api-userinfo": token });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
  });

  it("should be able to create an Incident", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const response = await request(app)
      .post(`${basePath}/incidents`)
      .set({ "x-endpoint-api-userinfo": token })
      .send({
        title: "Teste",
        description: "Teste",
        value: 1200.05,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to list all Incidents", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const incidentTest = await connection("incidents").select("*").first();

    const response = await request(app).get(`${basePath}/incidents`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: Number(incidentTest.id),
        title: "Teste",
        description: "Teste",
        value: 1200.05,
        ong_id: String(ongTest.id),
        name: "teste",
        email: "teste@teste.com",
        whatsapp: "+5541999999999",
        cep: "80000-000",
        city: "Curitiba",
        state: "PR",
        neighborhood: "Centro",
        street: "Rua Centro",
        streetNumber: "1",
      },
    ]);
  });

  it("should be able to read a Incident", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const incidentTest = await connection("incidents").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const response = await request(app)
      .get(`${basePath}/incidents/${ongTest.id}`)
      .set({ "x-endpoint-api-userinfo": token });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: Number(incidentTest.id),
      title: "Teste",
      description: "Teste",
      value: 1200.05,
      ong_id: String(ongTest.id),
      name: "teste",
      email: "teste@teste.com",
      whatsapp: "+5541999999999",
      cep: "80000-000",
      city: "Curitiba",
      state: "PR",
      neighborhood: "Centro",
      street: "Rua Centro",
      streetNumber: "1",
    });
  });

  it("should be able to list profile details for ONG", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const incidentTest = await connection("incidents").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const response = await request(app)
      .get(`${basePath}/profile`)
      .set({ "x-endpoint-api-userinfo": token });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: Number(incidentTest.id),
        title: "Teste",
        description: "Teste",
        value: 1200.05,
        ong_id: String(ongTest.id),
      },
    ]);
  });

  it("should be able to update an Incident", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const incidentTest = await connection("incidents").select("*").first();

    const data = {
      title: "Update",
      description: "Update",
      value: 12500,
    };

    const response = await request(app)
      .put(`${basePath}/incidents/${incidentTest.id}`)
      .set({ "x-endpoint-api-userinfo": token })
      .send(data);

    expect(response.statusCode).toBe(200);

    data.id = incidentTest.id;
    data.ong_id = ongTest.id;

    const result = await connection("incidents")
      .select("*")
      .where("id", ongTest.id);

    expect(result[0]).toEqual(data);
  });

  it("should be able to delete an Incident", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const incidentTest = await connection("incidents").select("*").first();

    const response = await request(app)
      .delete(`${basePath}/incidents/${incidentTest.id}`)
      .set({ "x-endpoint-api-userinfo": token });

    expect(response.statusCode).toBe(204);
  });

  it("should be able to update ONG", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const data = {
      name: "update",
      email: "update@teste.com",
      password: "teste12345",
      whatsapp: "+5541999999998",
      cep: "90000-000",
      city: "Update",
      state: "PR",
      neighborhood: "Update",
      street: "Rua Update",
      streetNumber: "2",
    };

    const response = await request(app)
      .put(`${basePath}/ongs`)
      .set({ "x-endpoint-api-userinfo": token })
      .send(data);

    expect(response.statusCode).toBe(200);

    delete data.password;
    data.id = ongTest.id;

    const result = await connection("ongs").select("*").where("id", ongTest.id);

    expect(result[0]).toEqual(data);
  });

  it("should be able to delete ONG", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const response = await request(app)
      .delete(`${basePath}/ongs/${ongTest.id}`)
      .set({ "x-endpoint-api-userinfo": token });

    expect(response.statusCode).toBe(204);
  });
});
