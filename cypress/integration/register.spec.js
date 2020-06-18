import routes from "../../src/constants/routes.js";

describe("User register test", () => {
  it("Should be able to do Register", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.contains("CADASTRO").click();

    cy.url().should("include", String(routes.register));

    // Get an input, type into it and verify that the value has been updated
    cy.get("input#name").type("Teste").should("have.value", "Teste");
    cy.get("input#email")
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com");
    cy.get("input#whatsapp")
      .type("41999999999")
      .should("have.value", "(41) 99999-9999");
    cy.get("input#cep")
      .type("80020100")
      .should("have.value", "80020-100")
      .blur();
    cy.get("input#city").should("have.value", "Curitiba");
    cy.get("input#state").should("have.value", "PR");
    cy.get("input#neighborhood").should("have.value", "Centro");
    cy.get("input#street").should("have.value", "Praça Tiradentes");
    cy.get("input#streetNumber").type("1").should("have.value", "1");
    cy.get("input#password")
      .type("teste12345")
      .should("have.value", "teste12345");
    cy.get("input#confirmPassword")
      .type("teste12345")
      .should("have.value", "teste12345");
    cy.get("input#termos").click();
    cy.contains("CADASTRAR").click();

    cy.url().should("eq", String(Cypress.config().baseUrl + "/"));
  });
});
