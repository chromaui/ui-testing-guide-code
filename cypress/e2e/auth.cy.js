describe("The Login Page", () => {
  it("user can authenticate using the login form", () => {
    const email = "alice.carr@test.com";
    const password = "k12h1k0$5;lpa@Afn";

    cy.visit("/");

    // Fill out the form
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(`${password}`);

    // Click the sign-in button
    cy.get("button[type=submit]").click();

    // UI should display the user's task list
    cy.get('[aria-label="tasks"] div').should("have.length", 6);
  });
});
