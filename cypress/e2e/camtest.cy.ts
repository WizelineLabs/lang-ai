describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/camtest')
    cy.wait(5000)
    cy.contains('Start Recording').click()
    cy.wait(5000)
    cy.contains('Stop Recording').click()
    cy.get('.border-red > .flex > :nth-child(2)').click()
  })
})