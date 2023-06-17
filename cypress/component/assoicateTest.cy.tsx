import ResponseText from "~/components/test/ResponseText";

describe('Alternate ResponseText Test 1', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('associates label correctly with textarea', () => {
            const testText = 'Different Text';
            cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
        });
    });
});
