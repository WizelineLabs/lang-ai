import InstructionAudio from "~/components/test/InstructionAudio";

describe('InstructionAudio Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('displays "Listen" button initially', () => {
      const audioUrl = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';
      cy.mount(<InstructionAudio audioUrl={audioUrl} />);
      cy.contains('Listen');
    });
  });
});
