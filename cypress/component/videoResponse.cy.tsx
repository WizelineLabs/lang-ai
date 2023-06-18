import ResponseVideo from "~/components/test/ResponseVideo";

describe('Alternate ResponseVideo Test 2', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('triggers playback of recorded video', () => {
      cy.mount(<ResponseVideo />);
      
      // Start recording
      cy.get('.relative').click();
      
      // Wait for 5 seconds
      cy.wait(5000);
      
      // Stop recording
      cy.get('.relative').click();
      
      // Ensure the recorded video is displayed
      cy.get('video').should('exist').should('be.visible');
    });
  });
});
