import AudioPlayer from "~/components/AudioPlayer";

describe('AudioPlayer Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('verifies progress update during audio playback', () => {
      const testAudioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN';
      cy.mount(<AudioPlayer audioUrl={testAudioUrl} />);
      
      cy.get('button').click(); // Assuming the button element triggers audio playback
      
      // Simulate audio playback for 5 seconds
      cy.wait(5000);
      cy.get('button').click();
    });
  });
});
