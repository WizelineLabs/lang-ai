import InstructionAudio from "~/components/test/InstructionAudio";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays instruction text', () => {
      const audioUrl = 'https://drive.google.com/uc?export=download&id=1iSEK_0zcbIg7hvAh7LkpRHAA_clDBGTN'; // replace with a valid url
      cy.mount(<InstructionAudio audioUrl={audioUrl} />);
      cy.contains('Press the following button and listen to the sentence.');
    });
  });
});
