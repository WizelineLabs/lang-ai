describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(2000)
    cy.contains('Bismarck').click()
  })
})