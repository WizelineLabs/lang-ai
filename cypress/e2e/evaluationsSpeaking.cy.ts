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
    cy.wait(10000)
    cy.contains('Go to Evaluations').click()
    cy.wait(2000)
    cy.get('.bg-red-600').click()
    cy.wait(2000)
    cy.get('.rounded-md').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.rounded-md').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.rounded-md').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.rounded-md').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.rounded-md').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.absolute').click()
    cy.wait(2000)
    cy.get('.rounded-md').click()
    cy.wait(3000)
    cy.contains('See Your Grades').click();

    cy.wait(4000)
    cy.get('.rounded-md').click()
    
  
  })
})