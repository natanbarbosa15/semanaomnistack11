import routes from "../../src/constants/routes.js";

describe("Login test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "identitytoolkit/**").as("firebase");
    cy.route("POST", "api/v1/sessions").as("session");
    cy.route("GET", "api/v1/profile").as("profile");
  });

  it("Should be able to do Login", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.contains("LOGIN").click();

    cy.url().should("include", String(routes.login));

    // Get an input, type into it and verify that the value has been updated
    cy.get("input#email")
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com");
    cy.get("input#password")
      .type("teste12345")
      .should("have.value", "teste12345");
    cy.contains("LOGIN").click();

    cy.wait("@firebase");

    cy.wait("@session");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.getToken().then((result) => cy.wrap(result).should("exist"));

    cy.wait("@profile");
  });
});
