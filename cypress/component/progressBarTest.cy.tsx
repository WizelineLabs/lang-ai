import AudioPlayer from "~/components/AudioPlayer";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays progress bar', () => {
      const audioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN'; // replace with a valid url
      cy.mount(<AudioPlayer audioUrl={audioUrl} />);
      cy.get('progress').should('exist');
    });
  });
});
