describe("Test the form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3002");
    });
    it ("testing inputs", function() {
        cy.screenshot('my-image');
        cy.get('[data-cy="name"]').type("Melissa").should("have.value", "Melissa");
        cy.get('[data-cy="email"]').type("email@email.com").should("have.value", "email@email.com");
        cy.get('[data-cy="password"]').type("Pa55W0rd").should("have.value", "Pa55W0rd");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.get("form").submit();
    });
})