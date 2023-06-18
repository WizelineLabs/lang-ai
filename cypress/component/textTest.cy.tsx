import InstructionText from "~/components/test/InstructionText";

describe('InstructionText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays text correctly', () => {
      const testText = 'This is a test string.\nThis is another test string.';
      cy.mount(<InstructionText>{testText}</InstructionText>);
      cy.contains('This is a test string.');
      cy.contains('This is another test string.');
    });
  });
});
