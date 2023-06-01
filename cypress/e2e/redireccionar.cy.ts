describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(5000)
    cy.contains('Learn').click()
  })
})