import InstructionText from "~/components/test/InstructionText";

describe('Alternate InstructionText Test 1', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders single string with newline correctly', () => {
            const testText = 'Alternate\nTest\nString';
            cy.mount(<InstructionText>{testText}</InstructionText>);
        });
    });
});
