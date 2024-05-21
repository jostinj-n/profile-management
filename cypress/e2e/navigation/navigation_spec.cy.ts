describe("Test navbar navigation", () => {
  it("can go to create new profile", () => {
    cy.visit("/en");

    cy.get('[data-testid="navbar-workforce"]').click();
    cy.get('[data-testid="navbar-workforce-create-profile"]').click();
    cy.url().should("include", "/workforce/create-profile");
  });
  it("can go back to home page", () => {
    cy.visit("/en");
    cy.get('[data-testid="navbar-home"]').click();
    cy.url().should("eq", "http://localhost:3000/en");
  });
});
