import {checkContact, checkFunc, checkSpace, checkSpecs} from "./Languagecheck.js";

describe("Checking text in Italian is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'it-IT' });
                Object.defineProperty(win.navigator, 'languages', { value: ['it'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['it'] });
            },
            headers: {
                'Accept-Language': 'it',
            },
        });  });

    it("Sidebar space", ()=>{
        let space={
            q_dimensions: "Quali sono le dimensioni dello spazio abitativo?", rectangular: "Rettangolare", dimLength: "Lunghezza",
            dimWidth: "Larghezza", dimHeight: "Altezza", other: "Altro", q_aspects: "Aggiungi quali aspetti dovremmo considerare nel tuo spazio abitativo.",
            obstructions: { window: "Finestra", door: "Porta", radiator: "Termosifone", walloutlet: "Presa di corrente a parete", switch: "Interruttore",
                sloping_Wall: "Muro inclinato", other: "Altro",
                q_door:{
                    opening_door:"Come funziona l'impianto?",
                    inside_left:"All'interno della stanza, a sinistra",
                    inside_right:"All'interno della stanza, a destra",
                    outside:"fuori dalla stanza"
                },
                q_window:{
                    opening_window:"La finestra può aprirsi all'interno?",
                    yes:"si",
                    no:"no"
                }
            }}
        checkSpace(space);
    });

    it("Sidebar functional", ()=>{
        let functional={
            q_space: "Quale spazio abitativo desideri ottimizzare?",
            space: {
                guest_room: "Stanza degli ospiti",
                living_room: "Soggiorno",
                bedroom: "Camera da letto",
            },
            q_function: "Quali sono le caratteristiche più importanti di cui hai bisogno per sfruttare al meglio il tuo spazio abitativo?",
            functions: {
                bed: "Letto",
                office_space: "Spazio ufficio",
                sofa: "Divano",
                storage_space: "Spazio di archiviazione",
            },
            bed: {
                q_bed: "Quale materasso preferisci?",
                soft: "Extra morbido",
                medium: "Medio",
                sturdy: "Extra robusto",
                apply: "Non applicabile"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_preferences: "Hai preferenze specifiche per la disposizione del tuo spazio abitativo?",
            preferences: {
                wall: "Muro",
                partition_wall: "Muro divisorio",
                in_the_middle_of_space: "In mezzo allo spazio",
            },
            q_materials: "Quali materiali preferisci per la finitura dei tuoi mobili modulari?",
            materials: {
                white: "Bianco",
                black: "Nero",
                birch: "Betulla",
                oak: "Quercia",
                walnut: "Noce",
                color: "Colore",
                material: "Materiale"
            },
            q_other: "Altre richieste o requisiti specifici da considerare?"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={
            q_contact: "Lascia i tuoi dati di contatto in modo che possiamo raggiungerti",
            firstname: "Nome",
            lastname: "Cognome",
            phone_number: "Numero di telefono",
            email: "E-mail",
            address: "Indirizzo"
        }

        checkContact(contact);
    })
})