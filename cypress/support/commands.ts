import '@testing-library/cypress/add-commands';

// Custom commands can be added here

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      // Custom command declaration can be added here
    }
  }
}
