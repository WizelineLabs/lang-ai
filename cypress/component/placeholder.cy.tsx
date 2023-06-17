import ResponseText from "~/components/test/ResponseText";

describe('ResponseText Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays a custom placeholder text', () => {
      const testText = 'Enter your response here';
      const customPlaceholder = 'Enter your response here';
      cy.mount(<ResponseText text={testText} didChangeText={() => {}} />);
      cy.wait(2000);
    });
  });
});
