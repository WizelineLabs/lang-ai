import InstructionText from "~/components/test/InstructionText";

describe('InstructionText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('renders single string without newline correctly', () => {
      const testText = 'This is a single test string.';
      cy.mount(<InstructionText>{testText}</InstructionText>);
      cy.contains('This is a single test string.');
    });
  });
});
