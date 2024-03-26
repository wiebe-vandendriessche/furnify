describe('First test',()=>{

  beforeEach('visit site', ()=>{
    cy.visit('', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'nl-BE' });
        Object.defineProperty(win.navigator, 'languages', { value: ['nl'] });
        Object.defineProperty(win.navigator, 'accept_languages', { value: ['nl'] });
      },
      headers: {
        'Accept-Language': 'nl',
      },
    });  })


  it('Looking for logo', ()=>{
    //Visits the baseUrl that is passed in cypress.config.cjs
    cy.get('img#logo').should('be.visible');
  });


  it('Sidebar should be open', ()=>{
    cy.get('nav.nav-menu').should('be.visible'); //Sidebar should be shown
    cy.get('img#logo').should('be.visible');  //Furnify logo should be visible

    //TODO: use of datatest-id
    cy.get('.bottom_btn > :nth-child(2)');
    cy.contains('Aspect'); //Button with aspect on it
  });

  /*it('Clicking logo should navigate to furnify', ()=>{
    cy.get('img#logo').click();
    cy.wait(5000);
    cy.url().then(($url)=>{
      cy.log("HIERREEEEEEEEEEEE");
      cy.log($url);
      //expect($url).to.eq("https://www.furnifyhome.eu");
    })
  })*/

  it('Clicking sidebar should close it', ()=>{
    cy.get('div.menu-bars > svg').click();
    cy.get('nav.nav-menu').should('not.be.visible');
  });

  it('Passing dimensions to rectangular form', ()=>{
    let badInput="RANDOM_TEXT";
    //cy.get('input.btn-check[value="Rectangular"]')
    //TODO: add datatest-id/names see: https://docs.cypress.io/guides/references/best-practices
    cy.get('.btn-group > :nth-child(2)').click();
    cy.get('input#rectangularLength').clear().type(badInput); //passing unallowed value
    cy.get('input#rectangularWidth').clear().type("7"); //clearing full input and passing a value
    cy.get('input#rectangularHeight').clear().type("2");
    cy.contains(badInput).should("not.exist");  //making sure input doesn't get saved
  })

  it("Making sure data doesn't get lost when going to next part of sidebar and back", ()=>{
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="btn-nav-sidebar-previous"]').click();
  })

  //it("Making")



})
