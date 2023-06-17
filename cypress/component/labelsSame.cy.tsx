import ResponseText from "~/components/test/ResponseText";

describe('Alternate ResponseText Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders textarea with custom class', () => {
            const testText = 'Alternate Text';
            cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
            
        });
    });
});
