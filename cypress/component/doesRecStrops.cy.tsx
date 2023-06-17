import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('plays and pauses video', () => {
      cy.mount(<ResponseVideo />);
      
      // Play the video
      cy.get('.relative').click();
      
      // Wait for 5 seconds
      cy.wait(5000);
      
      // Pause the video
      cy.get('.relative').click();
    });
  });
});
