import ResponseVideo from "~/components/test/ResponseVideo";

describe('ResponseVideo Component', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('renders correctly', () => {
      cy.mount(<ResponseVideo />);
      cy.get('video').should('exist');
      
    });
  });
});
