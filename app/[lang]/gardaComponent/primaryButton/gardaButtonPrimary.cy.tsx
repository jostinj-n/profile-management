import React from "react";
import { GardaButtonPrimary } from "./gardaButtonPrimary";

describe("<GardaButtonPrimary />", () => {
  it("renders", () => {
    cy.mount(<GardaButtonPrimary />);
  });
  it("should contains text children", () => {
    cy.mount(<GardaButtonPrimary>Welcome</GardaButtonPrimary>);
    cy.get(".MuiButtonBase-root").contains("Welcome");
  });
  it("should be contained and red", () => {
    cy.mount(<GardaButtonPrimary>Welcome</GardaButtonPrimary>);
  });
});
