describe("app e2e", () => {
  it("should connect", () => {
    cy.visit("http://192.168.0.106:3000/leleka");
  });

  it("should to login", () => {
    cy.contains("Login").click();
    cy.get("input[placeholder='Phone, email, or username']")
      .type("leleka1")
      .should("have.value", "leleka1");
    cy.get("input[placeholder='Password']")
      .type("@Leleka1")
      .should("have.value", "@Leleka1");
    cy.contains("Next").click();
    cy.get("button[aria-label='Close']").click();
  });

  it("should to create tweet", () => {
    cy.get("textarea")
      .type("Tweet for e2e test", { force: true })
      .should("have.value", "Tweet for e2e test");
    cy.get("button[type='submit']")
      .should("have.text", "Tweet")
      .click({ force: true });
  });

  it("should to logout ", () => {
    cy.contains("logout").click({ force: true });
  });
});
