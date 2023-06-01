import ResponseVideo from "~/components/test/ResponseVideo";

describe('cam.cy.tsx', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1280, 720)
    })
  it('playground', () => {
    cy.mount(<ResponseVideo/>);
    cy.wait(5000)
    cy.contains('Start Recording').click()
    cy.wait(5000)
    cy.contains('Stop Recording').click()
  })
})})