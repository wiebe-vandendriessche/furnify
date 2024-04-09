export function passRoomDimensions(params){

    cy.get('[datatest-id="input-space-room-rectangular-length"]').clear().type(params[0]); //passing unallowed value
    cy.get('[datatest-id="input-space-room-rectangular-width"]').clear().type(params[1]); //clearing full input and passing a value
    cy.get('[datatest-id="input-space-room-rectangular-height"]').clear().type(params[2]);

}

export function passObstacleDimensions(params){
    cy.get('[datatest-id="input-obst-'+params.type+'-length"]').clear().type(params.Length);
    cy.get('[datatest-id="input-obst-'+params.type+'-height"]').clear().type(params.Height);
    cy.get('[datatest-id="input-obst-'+params.type+'-width"]').clear().type(params.Width);
}