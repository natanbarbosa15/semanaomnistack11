import routes from "../../src/constants/routes.js";

require("./login.spec.js");

describe("Create new incident test", () => {
  it("Should be able to create first Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title")
      .should("have.value", "Teste Title");

    cy.get("textarea#description")
      .type("Teste Description")
      .should("have.value", "Teste Description");

    cy.get("input#value").type("21").should("have.value", "21");

    cy.get("button").contains("Cadastrar").click();

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.get("li").contains("Teste Title");
    cy.get("li").contains("Teste Description");
    cy.get("li").contains("21");
  });
  it("Should be able to create second Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title")
      .should("have.value", "Teste Title");

    cy.get("textarea#description")
      .type("Teste Description")
      .should("have.value", "Teste Description");

    cy.get("input#value").type("21").should("have.value", "21");

    cy.get("button").contains("Cadastrar").click();

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.get("li").contains("Teste Title");
    cy.get("li").contains("Teste Description");
    cy.get("li").contains("21");
  });
  it("Should be able to create third Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title")
      .should("have.value", "Teste Title");

    cy.get("textarea#description")
      .type("Teste Description")
      .should("have.value", "Teste Description");

    cy.get("input#value").type("21").should("have.value", "21");

    cy.get("button").contains("Cadastrar").click();

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.get("li").contains("Teste Title");
    cy.get("li").contains("Teste Description");
    cy.get("li").contains("21");
  });
  it("Should be able to create fourth Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title")
      .should("have.value", "Teste Title");

    cy.get("textarea#description")
      .type("Teste Description")
      .should("have.value", "Teste Description");

    cy.get("input#value").type("21").should("have.value", "21");

    cy.get("button").contains("Cadastrar").click();

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.get("li").contains("Teste Title");
    cy.get("li").contains("Teste Description");
    cy.get("li").contains("21");
  });
  it("Should be able to delete created Incident", () => {
    cy.get("li")
      .contains("Teste Title")
      .then((element) => {
        cy.get("button#delete").click({ multiple: true });
      });
    cy.reload();
    cy.get("li").should("not.exist");
  });
});
