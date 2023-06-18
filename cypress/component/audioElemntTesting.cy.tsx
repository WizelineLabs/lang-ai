import AudioPlayer from "~/components/AudioPlayer";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('checks audio setup', () => {
      const audioURL = 'testAudioSource';
      cy.mount(<AudioPlayer audioUrl={audioURL} />);
      cy.get('audio')
        .should('have.attr', 'src', audioURL);
    });
  });
});
