describe('First test',()=>{
    it('Looking for logo', ()=>{
        //Visits the baseUrl that is passed in cypress.config.js
        cy.visit('')
        cy.get('img#logo').should('be.visible')
    })
})