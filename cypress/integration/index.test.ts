describe("Saga Cart example", () => {
  before(() => {
    cy.visit("/");
  });

  xit("Title must be present at loading", () => {
    cy.findByText("Saga Cart").should("be.visible");
  });

  // xit("User should load with mock data", () => {
  //   cy.intercept("/user/U10000", {
  //     id: "U10000",
  //     name: "Carrie Mathison",
  //     country: "USD",
  //     address1: "555 Langley",
  //     phone: 18001234567,
  //   });
  //   cy.findByText(/Carrie Mathison/).should("be.visible");
  // });

  it("Loading message is displayed", () => {
    cy.findByText(/Please wait/).should("be.visible");
  });

  // test ordering matters!!!
  // If we test that the check out button is disabled after checking that
  // the Velvet Mousepad is visible, then the test waits for that element
  // to be displayed before checking the state of the Check Out button,
  // which most likely be enabled by then
  it("Checkout button should be disabled on load", () => {
    cy.findByRole("button", { name: "Check Out" })
      .should("be.visible")
      .and("not.be.enabled");
  });

  it("Increase a quantity for the displayed item", () => {
    cy.findByText("Velvet Mousepad").should("be.visible");
  });

  it("Checkout button should be enabled, then increase quantity", () => {
    cy.findByRole("button", { name: "Check Out" })
      .should("be.visible")
      .and("be.enabled");
    cy.get(".btn.btn-secondary:nth-of-type(2)").first().should("be.visible");
    cy.get(".btn.btn-secondary:nth-of-type(2)").first().click();
  });
});
