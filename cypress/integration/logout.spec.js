describe("Logout test", () => {
  it("Should be able to do Logout", () => {
    cy.get("button#logout").click();

    cy.url().should("eq", String(Cypress.config().baseUrl + "/"));

    cy.getToken().then((result) => cy.wrap(result).should("not.exist"));
  });
});
