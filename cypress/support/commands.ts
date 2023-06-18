import { mount } from 'cypress/react'

// Custom commands can be added here
Cypress.Commands.add('mount', mount);

// Extend the Cypress Chainable interface to include the declaration of your custom command
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: typeof mount;
    }
  }
}
