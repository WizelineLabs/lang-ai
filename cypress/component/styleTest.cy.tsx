import InstructionText from "~/components/test/InstructionText";
describe('InstructionText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('applies the correct style to the text', () => {
      const testText = 'This is a test string.\nThis is another test string.';
      cy.mount(<InstructionText>{testText}</InstructionText>);
      cy.get('p')
        .should('have.class', 'whitespace-pre-wrap')
        .should('have.class', 'break-words')
        .should('have.class', 'text-base')
        .should('have.class', 'leading-normal')
        .should('have.class', 'text-primary');
    });
  });
});
