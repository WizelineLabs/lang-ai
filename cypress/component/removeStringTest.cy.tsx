import InstructionText from "~/components/test/InstructionText";

describe('Alternate InstructionText Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('renders custom placeholder text for empty string', () => {
            cy.mount(<InstructionText>{''}</InstructionText>);
        });
    });
});

