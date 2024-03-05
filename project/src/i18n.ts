import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    greeting: {
                        hello: "Hello World!"
                    },
                    questionnaire_space: {
                        q_dimensions: "What are the dimensions of the living space?",
                        rectangular: "Rectangular",
                        length: "Length",
                        width: "Width",
                        height: "Height",
                        other: "Other",
                        q_aspects:"Add which aspects we should take into account in your living space.",
                        aspect:"Aspect",
                        add_aspect: "Add aspect"
                    },
                    obstructions: {
                        window:"Window",
                        door:"Door",
                        radiator:"Radiator",
                        walloutlet:"Wall outlet",
                        switch:"Switch",
                        sloping_Wall:"Sloping wall",
                        other:"Other"
                    },
                    questionnaire_func: {
                        q_space:"Which living space do you want to optimize?",
                        space:{
                            guest_room:"Guest room",
                            living_room:"Living room",
                            bedroom:"Bedroom",
                        },
                        q_function:"What are the most important features you need to make the most of your living space?",
                        functions:{
                            bed:"Bed",
                            office_space:"Office space",
                            sofa:"Sofa",
                            storage_space:"Storage space",
                        }
                    },
                    questionnaire_specs: {
                        q_prefrences: "Do you have specific preferences for the layout of your living space?",
                        prefrences:{
                            wall:"Wall",
                            partition_wall:"Partition wall",
                            in_the_middle_of_space:"In the middle of space",
                        },
                        q_materials: "Which materials do you prefer to finish your modular furniture?",
                        materials:{
                            white:"White",
                            black:"Black",
                            birch:"Birch",
                            oak:"Oak",
                            walnut:"Walnut"
                        },
                        q_other:"Other specific wishes or requirements to take into account?"
                    },
                    contact: {
                        q_contact:"Leave your contact details so we can reach you",
                        firstname:"First name",
                        lastname:"Last name",
                        phone_number:"Phone number",
                        email:"E-mail",
                        address:"Address"
                    }
                }
            },
            nl: {
                translation: {
                    greeting: {
                        hello: "Hallo Wereld!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Wat zijn de afmetingen van de woonruimte?",
                        rectangular: "Rechthoekig",
                        length: "Lengte",
                        width: "Breedte",
                        height: "Hoogte",
                        other: "Anders",
                        q_aspects:"Voeg toe met welke aspecten we rekening moeten houden in jouw woonruimte.",
                        aspect:"Aspect",
                        add_aspect: "Voeg een aspect toe"
                    },
                    obstructions: {
                        window:"Raam",
                        door:"Deur",
                        radiator:"Radiator",
                        walloutlet:"Stopcontact",
                        switch:"Schakelaar",
                        sloping_Wall:"Schuine wand",
                        other:"Andere"
                    },
                    questionnaire_func: {
                        q_space:"Welke woonruimte wenst u te optimaliseren?",
                        space:{
                            guest_room:"Guest room",
                            living_room:"Living room",
                            bedroom:"Bedroom",
                        },
                        q_function:"Wat zijn de belangrijkste functies die u nodig heeft om uw woonruimte optimaal te benutten?",
                        functions:{
                            bed:"Bed",
                            office_space:"Bureauruimte",
                            sofa:"Sofa",
                            storage_space:"Opbergruimte",
                        }
                    },
                    questionnaire_specs: {
                        q_prefrences: "Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?",
                        prefrences:{
                            wall:"Muur",
                            partition_wall:"Scheidingswand",
                            in_the_middle_of_space:"Te midden van ruimte",
                        },
                        q_materials: "Welke materialen verkiest u ter afwerking van uw modulaire meubels?",
                        materials:{
                            white:"Wit",
                            black:"Zwart",
                            birch:"Berk",
                            oak:"Eik",
                            walnut:"Notelaar"
                        },
                        q_other:"Andere specifieke wensen of vereisten waarmee rekening te houden?"
                    },
                    contact: {
                        q_contact:"Laat uw contactgegevens achter zodat we u kunnen bereiken",
                        firstname:"Voornaam",
                        lastname:"Achternaam",
                        phone_number:"Telefoonnummer",
                        email:"E-mail",
                        address:"Adres"
                    }
                }
            },
            fr: {
                translation: {
                    greeting: {
                        hello: "Bonjour le monde!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Quelles sont les dimensions de l'espace de vie?",
                        rectangular: "Rectangulaire",
                        length: "Longueur",
                        width: "Largeur",
                        height: "Hauteur",
                        other: "Autres",
                        q_aspects:"Ajoutez les aspects que nous devons prendre en compte dans votre espace de vie.",
                        aspect:"Aspect",
                        add_aspect: "Ajouter un aspect"
                    },
                    obstructions: {
                        window:"Fenêtre",
                        door:"Porte",
                        radiator:"Radiateur",
                        walloutlet:"Prise murale",
                        switch:"Interrupteur",
                        sloping_Wall:"Mur en pente",
                        other:"Autre"
                    },
                    questionnaire_func: {
                        q_space:"Quel espace de vie souhaitez-vous optimiser?",
                        space:{
                            guest_room:"Chambre d'amis",
                            living_room:"le salon",
                            bedroom:"chambre à coucher",
                        },
                        q_function:"Quelles sont les caractéristiques les plus importantes dont vous avez besoin pour tirer le meilleur parti de votre espace de vie?",
                        functions:{
                            bed:"Lit",
                            office_space:"Bureau",
                            sofa:"Canapé",
                            storage_space:"Espace de stockage",
                        }
                    },
                    questionnaire_specs: {
                        q_prefrences: "Vous avez des préférences particulières pour l'aménagement de votre espace de vie?",
                        prefrences:{
                            wall:"Mur",
                            partition_wall:"Cloison",
                            in_the_middle_of_space:"Au milieu de l'espace",
                        },
                        q_materials: "Quels matériaux préférez-vous pour finir votre mobilier modulable?",
                        materials:{
                            white:"Blanc",
                            black:"Noir",
                            birch:"Bouleau",
                            oak:"Chêne",
                            walnut:"Noyer"
                        },
                        q_other:"D'autres souhaits ou exigences spécifiques à prendre en compte?"
                    },
                    contact: {
                        q_contact:"Laissez vos coordonnées afin que nous puissions vous joindre",
                        firstname:"Prénom",
                        lastname:"Nom de famille",
                        phone_number:"Numéro de téléphone",
                        email:"E-mail",
                        address:"Adresse"
                    }
                }
            },
            de: {
                translation: {
                    greeting: {
                        hello: "Hallo Welt!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Was sind die Abmessungen des Wohnraums?",
                        rectangular: "Rechteckig",
                        length: "Länge",
                        width: "Breite",
                        height: "Höhe",
                        other: "Andere",
                        q_aspects: "Fügen Sie hinzu, welche Aspekte wir in Ihrem Wohnraum berücksichtigen sollten.",
                        aspect: "Aspekt",
                        add_aspect: "Aspekt hinzufügen"
                    },
                    obstructions: {
                        window: "Fenster",
                        door: "Tür",
                        radiator: "Heizkörper",
                        walloutlet: "Steckdose",
                        switch: "Schalter",
                        sloping_Wall: "Schräge Wand",
                        other: "Andere"
                    },
                    questionnaire_func: {
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
                        }
                    },
                    questionnaire_specs: {
                        q_prefrences: "Haben Sie spezielle Vorlieben für die Gestaltung Ihres Wohnraums?",
                        prefrences: {
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
                            walnut: "Walnuss"
                        },
                        q_other: "Andere spezifische Wünsche oder Anforderungen, die berücksichtigt werden sollen?"
                    },
                    contact: {
                        q_contact: "Hinterlassen Sie Ihre Kontaktdaten, damit wir Sie erreichen können",
                        firstname: "Vorname",
                        lastname: "Nachname",
                        phone_number: "Telefonnummer",
                        email: "E-Mail",
                        address: "Adresse"
                    }
                }
            },
            es: {
                translation: {
                    greeting: {
                        hello: "¡Hola Mundo!"
                    },
                    questionnaire_space: {
                        q_dimensions: "¿Cuáles son las dimensiones del espacio habitable?",
                        rectangular: "Rectangular",
                        length: "Longitud",
                        width: "Ancho",
                        height: "Altura",
                        other: "Otro",
                        q_aspects: "Agrega qué aspectos debemos tener en cuenta en tu espacio habitable.",
                        aspect: "Aspecto",
                        add_aspect: "Agregar aspecto"
                    },
                    obstructions: {
                        window: "Ventana",
                        door: "Puerta",
                        radiator: "Radiador",
                        walloutlet: "Enchufe de pared",
                        switch: "Interruptor",
                        sloping_Wall: "Pared inclinada",
                        other: "Otro"
                    },
                    questionnaire_func: {
                        q_space: "¿Qué espacio habitable deseas optimizar?",
                        space: {
                            guest_room: "Habitación de invitados",
                            living_room: "Sala de estar",
                            bedroom: "Dormitorio",
                        },
                        q_function: "¿Cuáles son las características más importantes que necesitas para aprovechar al máximo tu espacio habitable?",
                        functions: {
                            bed: "Cama",
                            office_space: "Espacio de oficina",
                            sofa: "Sofá",
                            storage_space: "Espacio de almacenamiento",
                        }
                    },
                    questionnaire_specs: {
                        q_prefrences: "¿Tienes preferencias específicas para la distribución de tu espacio habitable?",
                        prefrences: {
                            wall: "Pared",
                            partition_wall: "Pared divisoria",
                            in_the_middle_of_space: "En el medio del espacio",
                        },
                        q_materials: "¿Qué materiales prefieres para terminar tus muebles modulares?",
                        materials: {
                            white: "Blanco",
                            black: "Negro",
                            birch: "Birch",
                            oak: "Roble",
                            walnut: "Nogal"
                        },
                        q_other: "¿Otras peticiones o requisitos específicos a tener en cuenta?"
                    },
                    contact: {
                        q_contact: "Deja tus datos de contacto para que podamos comunicarnos contigo",
                        firstname: "Nombre",
                        lastname: "Apellido",
                        phone_number: "Número de teléfono",
                        email: "Correo electrónico",
                        address: "Dirección"
                    }
                }
            },
            it: {
                translation: {
                    greeting: {
                        hello: "Ciao Mondo!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Quali sono le dimensioni dello spazio abitativo?",
                        rectangular: "Rettangolare",
                        length: "Lunghezza",
                        width: "Larghezza",
                        height: "Altezza",
                        other: "Altro",
                        q_aspects: "Aggiungi quali aspetti dovremmo considerare nel tuo spazio abitativo.",
                        aspect: "Aspetto",
                        add_aspect: "Aggiungi aspetto"
                    },
                    obstructions: {
                        window: "Finestra",
                        door: "Porta",
                        radiator: "Termosifone",
                        walloutlet: "Presa di corrente a parete",
                        switch: "Interruttore",
                        sloping_Wall: "Muro inclinato",
                        other: "Altro"
                    },
                    questionnaire_func: {
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
                        }
                    },
                    questionnaire_specs: {
                        q_prefrences: "Hai preferenze specifiche per la disposizione del tuo spazio abitativo?",
                        prefrences: {
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
                            walnut: "Noce"
                        },
                        q_other: "Altre richieste o requisiti specifici da considerare?"
                    },
                    contact: {
                        q_contact: "Lascia i tuoi dati di contatto in modo che possiamo raggiungerti",
                        firstname: "Nome",
                        lastname: "Cognome",
                        phone_number: "Numero di telefono",
                        email: "E-mail",
                        address: "Indirizzo"
                    }
                }
            }
        }
    });

export default i18n;