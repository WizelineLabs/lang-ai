import InstructionText from "~/components/test/InstructionText";

describe('Alternate InstructionText Test 1', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders non-string children correctly', () => {
            cy.mount(
                <InstructionText>
                    <span id="testSpan">Alternate Test Span</span>
                </InstructionText>
            );
            cy.get('#testSpan').should('contain', 'Alternate Test Span');
        });
    });
});
