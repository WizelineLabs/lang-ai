import InstructionText from "~/components/test/InstructionText";

describe('Alternate InstructionText Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders multiple strings correctly', () => {
            const testText = ['First Test String', 'Second Test String', 'Third Test String'];
            cy.mount(<InstructionText>{testText.join('\n')}</InstructionText>);
            cy.contains('First Test String');
            cy.contains('Second Test String');
            cy.contains('Third Test String');
        });
    });
});
