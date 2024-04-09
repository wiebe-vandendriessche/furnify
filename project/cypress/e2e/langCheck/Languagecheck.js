export function checkSpace(space){
    //Here we check that all elements that should contain text, are correct(ly translated)
    cy.get('[datatest-id="question-space-dimensions"]').should('have.text', space.q_dimensions);
    cy.get('[datatest-id="btn-space-room-rectangular"]').should('have.text', space.rectangular).click();
    cy.get('[datatest-id="btn-space-room-other"]').should('have.text', space.other);
    cy.get('[datatest-id="label-space-room-rectangular-length"]').should('have.text', space.dimLength);
    cy.get('[datatest-id="label-space-room-rectangular-width"]').should('have.text', space.dimWidth);
    cy.get('[datatest-id="label-space-room-rectangular-height"]').should('have.text', space.dimHeight);
    cy.get('[datatest-id="question-space-aspects"]').should('have.text', space.q_aspects);
    cy.get('[datatest-id="btn-space-aspect-window"]').should('have.text', space.obstructions.window).click();
    cy.get('[datatest-id="btn-space-aspect-door"]').should('have.text', space.obstructions.door).click();
    cy.get('[datatest-id="btn-space-aspect-other"]').should('have.text', space.obstructions.other);
    cy.get('[datatest-id="btn-obstacle-expand-window"]').should('have.text', space.obstructions.window).click();
    cy.get('[datatest-id="question-obstacle-window-opening"]').should('include.text', space.obstructions.q_window.opening_window);
    cy.get('[datatest-id="btn-obstacle-delete-window"]').click();
    cy.get('[datatest-id="btn-obstacle-expand-window"]').should('not.exist');
    cy.get('[datatest-id="btn-obstacle-expand-door"]').should('have.text', space.obstructions.door).click();
    cy.get('[datatest-id="question-obstacle-door-opening"]').should('include.text', space.obstructions.q_door.opening_door);
    //cy.get('[datatest-id=""]').should('have.text', space.add_aspect);
}

export function checkFunc(func){
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="question-func-space"]').should('have.text', func.q_space);
    cy.get('[datatest-id="question-func-function"]').should('have.text', func.q_function);
    cy.get('[datatest-id="btn-func-room-guestroom"]').should('have.text', func.space.guest_room);
    cy.get('[datatest-id="btn-func-room-living_room"]').should('have.text', func.space.living_room);
    cy.get('[datatest-id="btn-func-room-bedroom"]').should('have.text', func.space.bedroom);
    cy.get('[datatest-id="btn-func-bed"]').should('have.text', func.functions.bed).click();
    cy.get('[datatest-id="btn-func-office_space"]').should('have.text', func.functions.office_space);
    cy.get('[datatest-id="btn-func-sofa"]').should('have.text', func.functions.sofa);
    cy.get('[datatest-id="btn-func-storage_space"]').should('have.text', func.functions.storage_space);
    //cy.get('[datatest-id="question-func-bed"]').should('have.text', func.bed.q_bed);
    cy.get('[datatest-id="btn-func-bed-soft"]').should('have.text', func.bed.soft);
    cy.get('[datatest-id="btn-func-bed-medium"]').should('have.text', func.bed.medium);
    cy.get('[datatest-id="btn-func-bed-sturdy"]').should('have.text', func.bed.sturdy);
    cy.get('[datatest-id="btn-func-bed-apply"]').should('have.text', func.bed.apply);

}

export function checkSpecs(specs){
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="question-specs-preferences"]').should('have.text', specs.q_preferences);
    cy.get('[datatest-id="btn-specs-preferences-wall"]').should('have.text', specs.preferences.wall);
    cy.get('[datatest-id="btn-specs-preferences-partition_wall"]').should('have.text', specs.preferences.partition_wall);
    cy.get('[datatest-id="btn-specs-preferences-middle_wall"]').should('have.text', specs.preferences.in_the_middle_of_space);
    cy.get('[datatest-id="question-specs-materials"]').should('have.text', specs.q_materials);
    cy.get('[datatest-id="btn-specs-material-birch"]').should('have.text', specs.materials.birch);
    cy.get('[datatest-id="btn-specs-material-oak"]').should('have.text', specs.materials.oak);
    cy.get('[datatest-id="btn-specs-material-walnut"]').should('have.text', specs.materials.walnut);
    cy.get('[datatest-id="btn-specs-color-white"]').should('have.text', specs.materials.white);
    cy.get('[datatest-id="btn-specs-color-black"]').should('have.text', specs.materials.black);
    cy.get('[datatest-id="question-specs-other"]').should('have.text', specs.q_other);
}

export function checkContact(contact){
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="btn-nav-sidebar-next"]').click();
    cy.get('[datatest-id="question-contact"]').should('have.text', contact.q_contact);
    cy.get('[datatest-id="label-contact-firstname"]').should('have.text', contact.firstname);
    cy.get('[datatest-id="label-contact-lastname"]').should('have.text', contact.lastname);
    cy.get('[datatest-id="label-contact-email"]').should('have.text', contact.email);
    cy.get('[datatest-id="label-contact-address"]').should('have.text', contact.address);
}