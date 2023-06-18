import AudioPlayer from "~/components/AudioPlayer";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('verifies audio setup', () => {
      const audioSource = 'testAudioUrl';
      cy.mount(<AudioPlayer audioUrl={audioSource} />);
      cy.get('audio')
        .should('have.attr', 'src', audioSource);
    });
  });
});
