import routes from "../../src/constants/routes.js";

describe("Update account password test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "identitytoolkit/**").as("firebase");
    cy.route("POST", "api/v1/sessions").as("session");
    cy.route("GET", "api/v1/profile").as("profile");
  });

  it("Should be able update ONG password", () => {
    cy.get("a#updatePassword").click();

    cy.url().should("include", String(routes.updatePassword));

    cy.get("input#oldPassword")
      .type("teste12345")
      .should("have.value", "teste12345");
    cy.get("input#password")
      .type("teste12345678")
      .should("have.value", "teste12345678");
    cy.get("input#confirmPassword")
      .type("teste12345678")
      .should("have.value", "teste12345678");

    cy.get("button#atualizar").click();

    cy.wait("@firebase");

    cy.url().should(
      "eq",
      String(Cypress.config().baseUrl) + String(routes.login)
    );

    // Get an input, type into it and verify that the value has been updated
    cy.get("input#email")
      .type("update@update.com")
      .should("have.value", "update@update.com");
    cy.get("input#password")
      .type("teste12345678")
      .should("have.value", "teste12345678");
    cy.contains("LOGIN").click();

    cy.wait("@firebase");

    cy.wait("@session");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.getToken().then((result) => cy.wrap(result).should("exist"));

    cy.wait("@profile");
  });
});
