import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('allows video download', () => {
      cy.mount(<ResponseVideo />);
      
      cy.mount(<ResponseVideo />);
      cy.wait(2000);
      cy.get('.relative').click();
      cy.wait(2000); 
      cy.get('.relative').click();
      
      cy.wait(5000); // Wait for 5 seconds

       // Wait for the download button to become available
       cy.get('.h-6').click();
 
       // Wait for the download to complete
       cy.wait(3000); // Adjust the waiting time based on the file size and download speed


    });
  });
});
