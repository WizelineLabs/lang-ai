describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(2000)
    cy.contains('Learn').click()
    cy.wait(2000)
    cy.contains('Conversational').click()
    cy.wait(2000)
    cy.contains('Date').click()
    cy.wait(2000)
    cy.contains('Level').click()
  })
})