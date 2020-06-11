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

  it("should be able to delete an Incident", async () => {
    const ongTest = await connection("ongs").select("*").first();
    const token = Buffer.from(
      JSON.stringify({ id: String(ongTest.id) }),
      "binary"
    ).toString("base64");

    const response = await request(app)
      .delete(`${basePath}/incidents/${ongTest.id}`)
      .set({ "x-endpoint-api-userinfo": token });

    expect(response.statusCode).toBe(204);
  });
});
