import InstructionText from "~/components/test/InstructionText";

describe('Alternate InstructionText Test', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders placeholder text for empty string', () => {
            cy.mount(<InstructionText>{''}</InstructionText>);
        });
    });
});
