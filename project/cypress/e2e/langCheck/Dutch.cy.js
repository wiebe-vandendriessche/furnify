import {checkContact, checkFunc, checkSpace, checkSpecs, checkObstacles} from "./Languagecheck.js";

describe("Checking text in Dutch is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'nl-BE' });
                Object.defineProperty(win.navigator, 'languages', { value: ['nl'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['nl'] });
            },
            headers: {
                'Accept-Language': 'nl',
            },
        });  });

    it("Sidebar space", ()=>{


        let space={ q_dimensions: "Wat zijn de afmetingen van de woonruimte?", rectangular: "Rechthoekig", dimLength: "Lengte", dimWidth: "Breedte",
                dimHeight: "Hoogte", other: "Anders",
            q_space:"Welke woonruimte wenst u te optimaliseren?",
            space:{
                guest_room:"Logeerkamer",
                living_room:"Woonkamer",
                bedroom:"Slaapkamer",
            },
            q_preferences: "Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?",
            preferences:{
                wall:"Muur",
                partition_wall:"Scheidingswand",
                in_the_middle_of_space:"Te midden van ruimte",
            }

        }
        checkSpace(space);
    });



    it("Sidebar functional", ()=>{
        let functional={  q_function:"Wat zijn de belangrijkste functies die u nodig heeft om uw woonruimte optimaal te benutten?",
            functions:{
                bed:"Bed",
                office_space:"Bureauruimte",
                sofa:"Sofa",
                storage_space:"Opbergruimte",
            },
            bed:{
                q_bed:"Welke matras verkiest u?",
                soft:"Extra zacht",
                medium:"Medium",
                sturdy:"Extra stevig",
                apply: "Niet van toepassing"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_materials: "Welke materialen verkiest u ter afwerking van uw modulaire meubels?",
            materials:{
                color:"kleur",
                material:"materiaal",
                white:"Wit",
                black:"Zwart",
                birch:"Berk",
                oak:"Eik",
                walnut:"Notelaar"
            },
            q_other:"Andere specifieke wensen of vereisten waarmee rekening te houden?"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={
            q_contact:"Laat uw contactgegevens achter zodat we u kunnen bereiken",
            firstname:"Voornaam",
            lastname:"Achternaam",
            email:"E-mail",
            address:"Adres"
        };

        checkContact(contact);
    })
})