import InstructionAudio from "~/components/test/InstructionAudio";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('verifies progress update during audio playback', () => {
      const testAudioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN';
      cy.mount(<InstructionAudio audioUrl={testAudioUrl} />);
      
      cy.get('span').click();
      
      // Simulate audio playback for 5 seconds
      cy.wait(5000);
      
      cy.get('progress').invoke('val').then((progressValue) => {
        expect(progressValue).to.be.greaterThan(0);
      });
    });
  });
});
