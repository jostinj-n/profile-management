describe("Home page", () => {
  it("Home page loads in english", () => {
    cy.visit("/en");
    cy.get("main").contains("Welcome");
  });
  it("Home page loads in french", () => {
    cy.visit("/fr");
    cy.get("main").contains("Bienvenue");
  });
});
