import InstructionText from "~/components/test/InstructionText";

describe('InstructionText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('renders nothing for empty string', () => {
      cy.mount(<InstructionText>{''}</InstructionText>);
    });
  });
});
