import routes from "../../src/constants/routes.js";

describe("About page test", () => {
  it("Should be able to visit About page", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.contains("SOBRE").click();

    cy.url().should("include", String(routes.about));

    cy.contains("Sobre");
  });
});
