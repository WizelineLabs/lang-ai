describe('template spec', () => {
    it('passes', () => {
      cy.visit('https://dev-langai.e2e271jfqq7g6.us-east-1.cs.amazonlightsail.com/login')
      cy.wait(2000)
      cy.get('.mb-3').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > form > .button').click()
      cy.wait(2000)
      cy.get('#username').type('patoestrada@gmail.com');
      cy.get('#password').type('JRbyuj6Bj:Nugfu');
      cy.get('.cf772ffae > .c89f1057d').click()
      cy.get('.mb-3').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > form > .button').click()
      cy.wait(2000)
      cy.get('[href="/grades"]').click()
      cy.wait(5000)
      cy.get('.bg-transparent > .font-medium').click()
      cy.wait(5000)
      
    
    })
  })