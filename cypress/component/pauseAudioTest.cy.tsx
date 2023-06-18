import AudioPlayer from "~/components/AudioPlayer";

describe('Alternate InstructionAudio Test 1', () => {
    context('720p resolution', () => {

        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        it('clicks "Listen" button and waits before clicking "Pause"', () => {
            const audioSrc = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';
            cy.mount(<AudioPlayer audioUrl={audioSrc} />);
            cy.contains('Listen').click();
            cy.wait(5000);
            cy.contains('Pause').click();
        });
    });
});
