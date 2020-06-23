import routes from "../../src/constants/routes.js";

require("./login.spec.js");

describe("Create new incident test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "identitytoolkit/**").as("firebase");
    cy.route("GET", "api/v1/profile").as("profile");
    cy.route("POST", "api/v1/incidents").as("createIncident");
    cy.route("GET", "api/v1/incidents/**").as("getIncident");
    cy.route("PUT", "api/v1/incidents/**").as("updateIncident");
    cy.route("DELETE", "api/v1/incidents/**").as("deleteIncident");
  });

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

    cy.get("button#cadastrar").click();

    cy.wait("@createIncident");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.wait("@profile");

    cy.get("p#title").contains("Teste Title");
    cy.get("p#description").contains("Teste Description");
    cy.get("p#value").contains("21");
  });
  it("Should be able to create second Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title 2")
      .should("have.value", "Teste Title 2");

    cy.get("textarea#description")
      .type("Teste Description 2")
      .should("have.value", "Teste Description 2");

    cy.get("input#value").type("22").should("have.value", "22");

    cy.get("button#cadastrar").click();

    cy.wait("@createIncident");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.wait("@profile");

    cy.get("p#title").contains("Teste Title 2");
    cy.get("p#description").contains("Teste Description 2");
    cy.get("p#value").contains("22");
  });
  it("Should be able to create third Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title 3")
      .should("have.value", "Teste Title 3");

    cy.get("textarea#description")
      .type("Teste Description 3")
      .should("have.value", "Teste Description 3");

    cy.get("input#value").type("23").should("have.value", "23");

    cy.get("button#cadastrar").click();

    cy.wait("@createIncident");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.wait("@profile");

    cy.get("p#title").contains("Teste Title 3");
    cy.get("p#description").contains("Teste Description 3");
    cy.get("p#value").contains("23");
  });
  it("Should be able to create fourth Incident", () => {
    cy.get("a#newIncident").click();

    cy.url().should(
      "eq",
      Cypress.config().baseUrl + String(routes.newIncident)
    );

    cy.get("input#title")
      .type("Teste Title 4")
      .should("have.value", "Teste Title 4");

    cy.get("textarea#description")
      .type("Teste Description 4")
      .should("have.value", "Teste Description 4");

    cy.get("input#value").type("24").should("have.value", "24");

    cy.get("button#cadastrar").click();

    cy.wait("@createIncident");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.wait("@profile");

    cy.get("p#title").contains("Teste Title 4");
    cy.get("p#description").contains("Teste Description 4");
    cy.get("p#value").contains("24");
  });
  it("Should be able to update an Incident", () => {
    cy.get("a#updateIncident").first().click();

    cy.url().should(
      "include",
      Cypress.config().baseUrl + String(routes.updateIncident)
    );

    cy.wait("@getIncident");

    cy.get("input#title").should("have.value", "Teste Title");

    cy.get("textarea#description").should("have.value", "Teste Description");

    cy.get("input#value").should("have.value", "21");

    cy.get("input#title")
      .clear()
      .type("Teste Title Update")
      .should("have.value", "Teste Title Update");

    cy.get("textarea#description")
      .clear()
      .type("Teste Description Update")
      .should("have.value", "Teste Description Update");

    cy.get("input#value").clear().type("555").should("have.value", "555");

    cy.get("button#atualizar").click();

    cy.wait("@updateIncident");

    cy.url().should("eq", Cypress.config().baseUrl + String(routes.profile));

    cy.wait("@profile");

    cy.get("p#title").contains("Teste Title Update");
    cy.get("p#description").contains("Teste Description Update");
    cy.get("p#value").contains("555");
  });
  it("Should be able to delete created Incident", () => {
    cy.get("button#delete").click({ multiple: true });

    cy.wait("@deleteIncident");

    cy.reload();

    cy.wait("@profile");

    cy.wait("@firebase");

    cy.get("p#title").should("not.exist");
    cy.get("p#description").should("not.exist");
    cy.get("p#value").should("not.exist");
  });
});
