describe("New profile page", () => {
  it("should load", () => {
    cy.visit("/en/workforce/create-profile");
    cy.get(".MuiTypography-root").contains("New Profile");
  });
  it("should not be able to continue", () => {
    cy.visit("/en/workforce/create-profile");
    cy.contains("Continue").click();
    cy.contains("Employee Identification");
  });
  it("should fill user and successfully continue", () => {
    cy.visit("/en/workforce/create-profile");

    //Employee Identification
    cy.get("input[name=employeeNumber]").type("1234567890");
    cy.get("input[name=lmsNumber]").type("0987654321");

    //Personal Details
    cy.get("input[name=firstName]").type("Yohann");
    cy.get("input[name=middleName]").type("Maurice");
    cy.get("input[name=lastName]").type("Fouquer");
    cy.get("input[name=preferredName]").type("None");
    cy.get("#mui-component-select-gender").click();
    cy.get('[data-value="male"]').click();

    //beurk !
    cy.get("#\\:R14klbbbelkq\\:").type("10301991");
    cy.get("input[name=sin]").type("00000000");
    cy.get("input[name=preferredLanguage]").type("whatever");

    //Residency Adress
    cy.get("input[name=address]").type("1 street erable");
    cy.get("input[name=postalCode]").type("h2k k2h");
    cy.get("input[name=stateProvince]").type("Quebec");
    cy.get("input[name=country]").type("Canada");

    //Contact Information
    cy.get("input[name=phoneNumber]").type("1234567890");
    cy.get("input[name=phoneType]").clear().type("cellular");
    cy.get("input[name=email]").type("no.no@noooooo.com");
    cy.get("input[name=secondaryEmail]").type("still.no@stillnooooo.com");

    cy.contains("Continue").click();
    cy.contains("Second");
  });
});
