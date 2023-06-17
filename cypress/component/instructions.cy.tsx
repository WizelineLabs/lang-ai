import InstructionAudio from "~/components/test/InstructionAudio";

describe('Alternate InstructionAudio Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('displays different instruction text', () => {
            const audioUrl = 'https://www.kozco.com/tech/piano2-CoolEdit.mp3';
            cy.mount(<InstructionAudio audioUrl={audioUrl} />);
            cy.contains('Press the following button and listen to the sentence.');
        });
    });
});
