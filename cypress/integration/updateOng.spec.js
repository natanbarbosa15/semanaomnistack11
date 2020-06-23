import routes from "../../src/constants/routes.js";

describe("Update account test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "identitytoolkit/**").as("firebase");
    cy.route("POST", "api/v1/sessions").as("session");
    cy.route("GET", "api/v1/profile").as("profile");
    cy.route("GET", "api/v1/ongs/**").as("getOng");
    cy.route("PUT", "api/v1/ongs").as("updateOng");
  });

  it("Should be able update ONG", () => {
    cy.get("a#updateProfile").click();

    cy.url().should("include", String(routes.updateProfile));

    cy.wait("@getOng");

    // Verify current ONG info
    cy.get("input#name").should("have.value", "Teste");
    cy.get("input#email").should("have.value", "teste@teste.com");
    cy.get("input#whatsapp").should("have.value", "(41) 99999-9999");
    cy.get("input#cep").should("have.value", "80020-100");
    cy.get("input#city").should("have.value", "Curitiba");
    cy.get("input#state").should("have.value", "PR");
    cy.get("input#neighborhood").should("have.value", "Centro");
    cy.get("input#street").should("have.value", "Praça Tiradentes");
    cy.get("input#streetNumber").should("have.value", "1");

    // Update ONG info
    cy.get("input#name")
      .clear()
      .type("Teste Update")
      .should("have.value", "Teste Update");
    cy.get("input#email")
      .clear()
      .type("update@update.com")
      .should("have.value", "update@update.com");
    cy.get("input#whatsapp")
      .clear()
      .type("41999999998")
      .should("have.value", "(41) 99999-9998");
    cy.get("input#cep")
      .clear()
      .type("80020120")
      .should("have.value", "80020-120")
      .blur();
    cy.get("input#city").should("have.value", "Curitiba");
    cy.get("input#state").should("have.value", "PR");
    cy.get("input#neighborhood").should("have.value", "Centro");
    cy.get("input#street").should("have.value", "Travessa Nestor de Castro");
    cy.get("input#streetNumber").clear().type("1").should("have.value", "1");

    cy.get("button#atualizar").click();

    cy.wait("@updateOng");

    cy.url().should(
      "eq",
      String(Cypress.config().baseUrl + String(routes.login))
    );

    // Get an input, type into it and verify that the value has been updated
    cy.get("input#email")
      .type("update@update.com")
      .should("have.value", "update@update.com");
    cy.get("input#password")
      .type("teste12345")
      .should("have.value", "teste12345");

    cy.contains("LOGIN").click();

    cy.wait("@firebase");

    cy.wait("@session");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.getToken().then((result) => cy.wrap(result).should("exist"));

    cy.wait("@profile");

    cy.get("a#updateProfile").click();

    cy.wait("@getOng");

    // Verify current ONG info
    cy.get("input#name").should("have.value", "Teste Update");
    cy.get("input#email").should("have.value", "update@update.com");
    cy.get("input#whatsapp").should("have.value", "(41) 99999-9998");
    cy.get("input#cep").should("have.value", "80020-120");
    cy.get("input#city").should("have.value", "Curitiba");
    cy.get("input#state").should("have.value", "PR");
    cy.get("input#neighborhood").should("have.value", "Centro");
    cy.get("input#street").should("have.value", "Travessa Nestor de Castro");
    cy.get("input#streetNumber").should("have.value", "1");
  });
});
