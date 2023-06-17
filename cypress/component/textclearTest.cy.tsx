import ResponseVideo from "~/components/test/ResponseVideo";

describe('Alternate ResponseVideo Test 1', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('triggers video playback and stops after waiting', () => {
            cy.mount(<ResponseVideo />);
            cy.get('.relative').click();
            cy.wait(5000); // Wait for 5 seconds
            cy.get('.relative').click();

            // Wait for the recorded video to be displayed
            cy.get('video').should('exist').should('be.visible');
        });
    });
});
