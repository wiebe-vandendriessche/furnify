describe('First test',()=>{
  it('Looking for logo', ()=>{
    //Visits the baseUrl that is passed in cypress.config.cjs

    cy.visit('', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'nl-BE' });
        Object.defineProperty(win.navigator, 'languages', { value: ['nl'] });
        Object.defineProperty(win.navigator, 'accept_languages', { value: ['nl'] });
      },
      headers: {
        'Accept-Language': 'nl',
      },
    });
    cy.get('img#logo').should('be.visible')
  });
  it('Sidebar should be open', ()=>{
    cy.visit('');
    cy.get('nav.nav-menu').should('be.visible');
  });


  it('Clicking sidebar should close it', ()=>{
    cy.visit('');
    cy.get('div.menu-bars > svg').click();
    cy.get('nav.nav-menu').should('not.be.visible');
  });





})
