import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('associates label correctly with textarea', () => {
      const testText = 'Test Text';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.get('textarea').should('have.id', 'message');
    });
  });
});
