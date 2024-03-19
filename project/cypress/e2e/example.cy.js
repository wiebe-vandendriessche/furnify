describe('First test',()=>{
  it('Looking for logo', ()=>{
    //Visits the baseUrl that is passed in cypress.config.cjs
    cy.visit('')
    cy.get('img#logo').should('be.visible')
  })
})