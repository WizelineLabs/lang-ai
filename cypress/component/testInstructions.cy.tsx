import AudioPlayer from "~/components/AudioPlayer";

describe('Alternate InstructionAudio Test 1', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('displays custom instruction text', () => {
            const audioUrl = 'https://www.kozco.com/tech/LRMonoPhase4.mp3'; 
            cy.mount(<AudioPlayer audioUrl={audioUrl} />);
            cy.contains('Press the following button and listen to the sentence.');
        });
    });
});
