import AudioPlayer from "~/components/AudioPlayer";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('verifies audio playback progress', () => {
      const testAudioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN';
      cy.mount(<AudioPlayer audioUrl={testAudioUrl} />);
      
      cy.get('span').click();
      
      // Wait for the audio to play for 2 seconds
      cy.wait(2000);
      
      // Check if progress has updated within the first 2 seconds
      cy.get('progress').then(($progress) => {
        const progressValue = $progress.val();
        expect(progressValue).not.to.eq('0');
      });
    });
  });
});
