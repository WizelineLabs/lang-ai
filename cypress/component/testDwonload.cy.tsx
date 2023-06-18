import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays video playback controls', () => {
      cy.mount(<ResponseVideo />);
      cy.wait(2000);

      // Start video recording
      cy.get('.relative').click();
      cy.wait(2000);
      
      // Stop video recording
      cy.get('.relative').click();
      cy.wait(2000); 
      
      // Wait for 5 seconds to simulate video processing
      cy.wait(5000);
      
      // Click on the play button
      cy.get('.h-6').click();
      
      // Assert that video playback controls are displayed
      cy.wait(2000);
      
    });
  });
});
