import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('renders initial text correctly', () => {
      const testText = 'Test Text';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.get('textarea').should('have.value', testText);
    });
  });
});
