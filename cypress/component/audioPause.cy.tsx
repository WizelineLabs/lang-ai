import AudioPlayer from "~/components/AudioPlayer";


describe('Alternate InstructionAudio Test 2', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('activates audio playback and pauses it after waiting', () => {
            const audioSource = 'https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg';
            cy.mount(<AudioPlayer audioUrl={audioSource} />);
            cy.contains('Listen').click();
            cy.wait(5000);
            cy.contains('Pause').click();
        });
    });
});
