import routes from "../../src/constants/routes.js";

describe("Delete account test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "api/v1/ongs/**").as("getOng");
    cy.route("DELETE", "api/v1/ongs").as("deleteOng");
  });

  it("Should be able delete ONG", () => {
    cy.get("a#updateProfile").click();

    cy.url().should("include", String(routes.updateProfile));

    cy.wait("@getOng");

    cy.get("button#deleteOng").click();

    cy.get("button").contains("Sim").click();

    cy.wait("@deleteOng");

    cy.url().should(
      "eq",
      String(Cypress.config().baseUrl + String(routes.login))
    );

    cy.getToken().then((result) => cy.wrap(result).should("not.exist"));
  });
});
