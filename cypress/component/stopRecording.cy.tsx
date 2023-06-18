import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('records and stops recording', () => {
      cy.mount(<ResponseVideo />);
      
      // Start recording
      cy.get('.relative').click();
      
      // Wait for 5 seconds
      cy.wait(5000);
      
      // Stop recording
      cy.get('.relative').click();
    });
  });
});
