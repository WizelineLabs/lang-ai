import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('plays back recorded video', () => {
      cy.mount(<ResponseVideo />);
      cy.get('.relative').click();
      cy.wait(5000); // Wait for 5 seconds
      cy.get('.relative').click();

      // Wait for the recorded video to be displayed
      cy.get('video').should('exist').should('be.visible');

      
    });
  });
});
