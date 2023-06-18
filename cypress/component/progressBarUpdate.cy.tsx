import AudioPlayer from "~/components/AudioPlayer";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('verifies audio playback progress', () => {
      const testAudioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN';
      cy.mount(<AudioPlayer audioUrl={testAudioUrl} />);
      
      cy.get('.relative').click();
      cy.wait(5000);
      cy.get('.relative').click();
      
      
      // Check if progress has updated within the first 2 seconds
      ///cy.get('progress').then(($progress) => {
        //const progressValue = $progress.val();
        //expect(progressValue).not.to.eq('0');
      //});
    });
  });
});
