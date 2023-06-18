import InstructionText from "~/components/test/InstructionText";

describe('Alternate InstructionText Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders nested components correctly', () => {
            cy.mount(
                <InstructionText>
                    <div>
                        <h1 id="testHeading">Test Heading</h1>
                        <p>Test Paragraph</p>
                    </div>
                </InstructionText>
            );
            cy.get('#testHeading').should('contain', 'Test Heading');
            cy.contains('Test Paragraph');
        });
    });
});
