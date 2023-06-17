import InstructionAudio from "~/components/test/InstructionAudio";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('sets up audio element correctly', () => {
      const testAudioUrl = 'testUrl';
      cy.mount(<InstructionAudio audioUrl={testAudioUrl} />);
      cy.get('audio').should('have.attr', 'src', testAudioUrl);
    });
  });
});
