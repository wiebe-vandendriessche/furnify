import {checkContact, checkFunc, checkSpace, checkSpecs} from "./Languagecheck.js";

describe("Checking text in German is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'de-BE' });
                Object.defineProperty(win.navigator, 'languages', { value: ['de'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['de'] });
            },
            headers: {
                'Accept-Language': 'de',
            },
        });  });

    it("Sidebar space", ()=>{
        let space={ q_dimensions: "Was sind die Abmessungen des Wohnraums?",
                rectangular: "Rechteckig",
                dimLength: "Länge",
                dimWidth: "Breite",
                dimHeight: "Höhe",
                other: "Andere",
                q_aspects: "Fügen Sie hinzu, welche Aspekte wir in Ihrem Wohnraum berücksichtigen sollten.",
            obstructions: {
                window: "Fenster",
                door: "Tür",
                radiator: "Heizkörper",
                walloutlet: "Steckdose",
                switch: "Schalter",
                sloping_Wall: "Schräge Wand",
                other: "Andere",
                q_door:{
                    opening_door:"Wie wird die Tür geöffnet?",
                    inside_left:"Im Inneren des Raums, links",
                    inside_right:"Im Inneren des Raums, rechts",
                    outside:"außerhalb des Raumes"
                },
                q_window:{
                    opening_window:"Kann man das Fenster nach innen öffnen?",
                    yes:"ja",
                    no:"nein"
                }
            }};

        checkSpace(space);
    });


    it("Sidebar functional", ()=>{
        let functional={
            q_space: "Welchen Wohnraum möchten Sie optimieren?",
            space: {
                guest_room: "Gästezimmer",
                living_room: "Wohnzimmer",
                bedroom: "Schlafzimmer",
            },
            q_function: "Welche sind die wichtigsten Funktionen, die Sie benötigen, um das Beste aus Ihrem Wohnraum zu machen?",
            functions: {
                bed: "Bett",
                office_space: "Bürofläche",
                sofa: "Sofa",
                storage_space: "Stauraum",
            },
            bed: {
                q_bed: "Welche Matratze bevorzugen Sie?",
                soft: "Extra weich",
                medium: "Mittel",
                sturdy: "Extra fest",
                apply: "Nicht anwendbar"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_preferences: "Haben Sie spezielle Vorlieben für die Gestaltung Ihres Wohnraums?",
            preferences: {
                wall: "Wand",
                partition_wall: "Trennwand",
                in_the_middle_of_space: "In der Mitte des Raums",
            },
            q_materials: "Welche Materialien bevorzugen Sie zur Fertigstellung Ihrer modularen Möbel?",
            materials: {
                white: "Weiß",
                black: "Schwarz",
                birch: "Birke",
                oak: "Eiche",
                walnut: "Walnuss",
                color: "Farbe",
                material: "Material"
            },
            q_other: "Andere spezifische Wünsche oder Anforderungen, die berücksichtigt werden sollen?"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={   q_contact: "Hinterlassen Sie Ihre Kontaktdaten, damit wir Sie erreichen können",
            firstname: "Vorname",
            lastname: "Nachname",
            phone_number: "Telefonnummer",
            email: "E-Mail",
            address: "Adresse"
        }

        checkContact(contact);
    })
})