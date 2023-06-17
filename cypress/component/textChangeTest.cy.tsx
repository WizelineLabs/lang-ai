import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('updates text correctly', () => {
      let testText = 'Test Text';
      cy.mount(<ResponseText text={testText} didChangeText={(newText) => testText = newText} />);
      
      const newText = 'New Text';
      cy.get('textarea').clear().type(newText);
    });
  });
});
