import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('allows video download', () => {
      cy.mount(<ResponseVideo />);
      
      // Start video recording
      cy.wait(2000);
      cy.get('.relative').click();
      cy.wait(2000);
      
      // Stop video recording
      cy.get('.relative').click();
      cy.wait(2000); 
      
      // Wait for 5 seconds to simulate video processing
      cy.wait(5000);
      
      // Click on the download button
      cy.get('.h-6').click();
      
      // Wait for the download to complete (adjust waiting time as needed)
      cy.wait(3000);
      
      // Add any additional assertions if needed
      // ...
    });
  });
});
