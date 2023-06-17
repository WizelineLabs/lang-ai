import ResponseVideo from "~/components/test/ResponseVideo";

describe('Alternate ResponseVideo Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('triggers playback of recorded video', () => {
            cy.mount(<ResponseVideo />);
            cy.get('.relative').click();
            cy.wait(5000); // Wait for 5 seconds
            cy.get('.relative').click();

            // Ensure the recorded video is displayed
            cy.get('video').should('exist').should('be.visible');
        });
    });
});
