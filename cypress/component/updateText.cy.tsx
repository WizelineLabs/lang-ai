import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('updates the text correctly', () => {
      const initialText = 'Initial Text';
      let receivedText = '';

      const didChangeText = (text: string) => {
        receivedText = text;
      };
      cy.wait(1000); // Adjust the wait duration as needed

      cy.mount(<ResponseText text={initialText} didChangeText={didChangeText} />);
      cy.get('textarea')
        .invoke('val', 'New Text')
        .trigger('input');

      
    });
  });
});
