import {passRoomDimensions} from "../helperfuncs/helperspace.js";

describe('First test',()=>{

  beforeEach('visit application', ()=>{
    cy.visit('');
  })


  it('Looking for logo', ()=>{
    //Visits the baseUrl that is passed in cypress.config.cjs
    cy.get('img#logo').should('be.visible');
  });


  it('Making sure every element on the sidebar is displayed', ()=>{
    cy.get('nav.nav-menu').should('be.visible'); //Sidebar should be shown
    cy.get('img#logo').should('be.visible');  //Furnify logo should be visible

    //use of datatest-id
    cy.get('[datatest-id="btn-nav-sidebar-next"]');
    //Multiple aspect buttons
    cy.get('[datatest-id="btn-space-aspect-window"]')
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
    //TODO: add datatest-id/names see: https://docs.cypress.io/guides/references/best-practices

    cy.get('[datatest-id="btn-space-room-rectangular"]').click();
    passRoomDimensions([badInput, 7, 2]);
    cy.contains(badInput).should("not.exist");  //making sure input doesn't get saved
  })

  it("Changing roomdimensions and making sure it's saved when navigating to next part of questionnaire", ()=>{
    let inputValues=[13, 7.9, 34]
    cy.get('[datatest-id="btn-space-room-rectangular"]').click();
    passRoomDimensions(inputValues);
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="btn-nav-sidebar-previous"]').click();
    //TODO: delete line below when rectangular button is fixed
    cy.get('[datatest-id="btn-space-room-rectangular"]').click();
    cy.get('[datatest-id="input-space-room-rectangularlength"]').should('have.value', inputValues[0]);
    cy.get('[datatest-id="input-space-room-rectangularwidth"]').should('have.value', inputValues[1]);
    cy.get('[datatest-id="input-space-room-rectangularheight"]').should('have.value', inputValues[2]);
  })

  it("Adding and deleting obstructions");

  it("");
})
