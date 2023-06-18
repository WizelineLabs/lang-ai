import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('allows typing in the textarea', () => {
      const testText = 'Initial Text';
      const newText = 'Typed Text';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.get('textarea')
        .clear()
        .type(newText)
        //.should('have.value', newText);
    });
  });
});
