import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('clears the textarea', () => {
      const testText = 'Initial Text';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.get('textarea').clear().type('Some Text');
      cy.get('textarea').invoke('val', '').trigger('input');
      cy.get('textarea').should('have.value', '');
    });
  });
});
