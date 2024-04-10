export function checkSpace(space){
    //Here we check that all elements that should contain text, are correct(ly translated)
    cy.get('[data-testid="question-space-dimensions"]').should('have.text', space.q_dimensions);
    cy.get('[data-testid="btn-space-room-rectangular"]').should('have.text', space.rectangular).click();
    cy.get('[data-testid="btn-space-room-other"]').should('have.text', space.other);
    cy.get('[data-testid="label-space-room-rectangular-length"]').should('have.text', space.dimLength);
    cy.get('[data-testid="label-space-room-rectangular-width"]').should('have.text', space.dimWidth);
    cy.get('[data-testid="label-space-room-rectangular-height"]').should('have.text', space.dimHeight);
    cy.get('[data-testid="question-space-aspects"]').should('have.text', space.q_aspects);
    cy.get('[data-testid="btn-space-aspect-window"]').should('have.text', space.obstructions.window).click();
    cy.get('[data-testid="btn-space-aspect-door"]').should('have.text', space.obstructions.door).click();
    cy.get('[data-testid="btn-space-aspect-other"]').should('have.text', space.obstructions.other);
    cy.get('[data-testid="btn-obstacle-expand-window"]').should('have.text', space.obstructions.window).click();
    cy.get('[data-testid="question-obstacle-window-opening"]').should('include.text', space.obstructions.q_window.opening_window);
    cy.get('[data-testid="btn-obstacle-delete-window"]').click();
    cy.get('[data-testid="btn-obstacle-expand-window"]').should('not.exist');
    cy.get('[data-testid="btn-obstacle-expand-door"]').should('have.text', space.obstructions.door).click();
    cy.get('[data-testid="question-obstacle-door-opening"]').should('include.text', space.obstructions.q_door.opening_door);
    //cy.get('[data-testid=""]').should('have.text', space.add_aspect);
}

export function checkFunc(func){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-func-space"]').should('have.text', func.q_space);
    cy.get('[data-testid="question-func-function"]').should('have.text', func.q_function);
    cy.get('[data-testid="btn-func-room-guestroom"]').should('have.text', func.space.guest_room);
    cy.get('[data-testid="btn-func-room-living_room"]').should('have.text', func.space.living_room);
    cy.get('[data-testid="btn-func-room-bedroom"]').should('have.text', func.space.bedroom);
    cy.get('[data-testid="btn-func-bed"]').should('have.text', func.functions.bed).click();
    cy.get('[data-testid="btn-func-office_space"]').should('have.text', func.functions.office_space);
    cy.get('[data-testid="btn-func-sofa"]').should('have.text', func.functions.sofa);
    cy.get('[data-testid="btn-func-storage_space"]').should('have.text', func.functions.storage_space);
    //cy.get('[data-testid="question-func-bed"]').should('have.text', func.bed.q_bed);
    cy.get('[data-testid="btn-func-bed-soft"]').should('have.text', func.bed.soft);
    cy.get('[data-testid="btn-func-bed-medium"]').should('have.text', func.bed.medium);
    cy.get('[data-testid="btn-func-bed-sturdy"]').should('have.text', func.bed.sturdy);
    cy.get('[data-testid="btn-func-bed-apply"]').should('have.text', func.bed.apply);

}

export function checkSpecs(specs){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-specs-preferences"]').should('have.text', specs.q_preferences);
    cy.get('[data-testid="btn-specs-preferences-wall"]').should('have.text', specs.preferences.wall);
    cy.get('[data-testid="btn-specs-preferences-partition_wall"]').should('have.text', specs.preferences.partition_wall);
    cy.get('[data-testid="btn-specs-preferences-middle_wall"]').should('have.text', specs.preferences.in_the_middle_of_space);
    cy.get('[data-testid="question-specs-materials"]').should('have.text', specs.q_materials);
    cy.get('[data-testid="btn-specs-material-birch"]').should('have.text', specs.materials.birch);
    cy.get('[data-testid="btn-specs-material-oak"]').should('have.text', specs.materials.oak);
    cy.get('[data-testid="btn-specs-material-walnut"]').should('have.text', specs.materials.walnut);
    cy.get('[data-testid="btn-specs-color-white"]').should('have.text', specs.materials.white);
    cy.get('[data-testid="btn-specs-color-black"]').should('have.text', specs.materials.black);
    cy.get('[data-testid="question-specs-other"]').should('have.text', specs.q_other);
}

export function checkContact(contact){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-contact"]').should('have.text', contact.q_contact);
    cy.get('[data-testid="label-contact-firstname"]').should('have.text', contact.firstname);
    cy.get('[data-testid="label-contact-lastname"]').should('have.text', contact.lastname);
    cy.get('[data-testid="label-contact-email"]').should('have.text', contact.email);
    cy.get('[data-testid="label-contact-address"]').should('have.text', contact.address);
}