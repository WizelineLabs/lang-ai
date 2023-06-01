describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(5000)
    cy.contains('Evaluations').click()
    cy.wait(3000)
    cy.contains('See previous results').click()
  })
})