export function passRoomDimensions(params){

    cy.get('[datatest-id="input-space-room-rectangularlength"]').clear().type(params[0]); //passing unallowed value
    cy.get('[datatest-id="input-space-room-rectangularwidth"]').clear().type(params[1]); //clearing full input and passing a value
    cy.get('[datatest-id="input-space-room-rectangularheight"]').clear().type(params[2]);

}