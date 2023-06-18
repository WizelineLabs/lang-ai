import ResponseText from "~/components/test/ResponseText";
describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays the correct placeholder text', () => {
      const testText = '';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.get('textarea').should('have.attr', 'placeholder', 'Write your answer here.');
    });
  });
});
