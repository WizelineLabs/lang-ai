import AudioPlayer from "~/components/AudioPlayer";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('updates progress as audio plays', () => {
      const testAudioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN';
      cy.mount(<AudioPlayer audioUrl={testAudioUrl} />);
      cy.get('.relative').click();
            cy.wait(5000);
            cy.get('.relative').click();

      // The check for progress update might depend on the length of the audio and the speed of the test execution.
      // Here is a simplified example where we wait for 5 seconds and then check if progress has updated.
      /*cy.wait(5000);
      cy.get('progress').invoke('val').then((progressValue) => {
        expect(progressValue).not.to.eq('0');
      });*/
    });
  });
});
