import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('renders correctly with label', () => {
      const testText = 'Test Text';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.contains('Write down what happened during the previous conversation');
    });
  });
});
