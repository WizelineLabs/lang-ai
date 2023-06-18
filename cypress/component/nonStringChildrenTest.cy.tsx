import InstructionText from "~/components/test/InstructionText";

describe('InstructionText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('renders non-string children correctly', () => {
      cy.mount(
        <InstructionText>
          <span id="testSpan">Test Span</span>
        </InstructionText>
      );
      cy.get('#testSpan').should('contain', 'Test Span');
    });
  });
});
