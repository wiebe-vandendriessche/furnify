export function passRoomDimensions(params){

    cy.get('[datatest-id="input-space-room-rectangular-length"]').clear().type(params[0]); //passing unallowed value
    cy.get('[datatest-id="input-space-room-rectangular-width"]').clear().type(params[1]); //clearing full input and passing a value
    cy.get('[datatest-id="input-space-room-rectangular-height"]').clear().type(params[2]);

}