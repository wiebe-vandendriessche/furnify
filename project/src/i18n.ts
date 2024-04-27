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
                        light:"Light",
                        other:"Other",
                        q_door:{
                            opening_door:"How does the door open?",
                            inside_left:"Inside the room, to the left",
                            inside_right:"Inside the room, to the right",
                            outside:"Outside the room"
                        },
                        q_window:{
                            opening_window:"Can the window open to the inside?",
                            yes:"yes",
                            no:"no",
                            window_wall:"Select the correct wall",
                            front: "front",
                            back: "back",
                            left: "left",
                            right: "right"
                        }
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
                        },
                        bed: {
                            q_size: "What is the width you would prefer?",
                            q_bed: "Which mattress do you prefer?",
                            soft: "Extra soft",
                            medium: "Medium",
                            sturdy: "Extra sturdy",
                            apply: "Not applicable"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Do you have specific preferences for the layout of your living space?",
                        preferences:{
                            wall:"Wall",
                            partition_wall:"Partition wall",
                            in_the_middle_of_space:"In the middle of space",
                        },
                        q_materials: "Which materials do you prefer to finish your modular furniture?",
                        materials:{
                            color: "Color",
                            material: "Material",
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
                        other:"Andere",
                        q_door:{
                            opening_door:"Hoe opent de deur?",
                            inside_left:"Binnen in de ruimte, naar links",
                            inside_right:"Binnen in de ruimte, naar rechts",
                            outside:"Buiten de ruimte"
                        },
                        q_window:{
                            opening_window:"Kan het raam naar binnen openen?",
                            yes: "ja",
                            no: "nee"
                        }
                    },
                    questionnaire_func: {
                        q_space:"Welke woonruimte wenst u te optimaliseren?",
                        space:{
                            guest_room:"Logeerkamer",
                            living_room:"Woonkamer",
                            bedroom:"Slaapkamer",
                        },
                        q_function:"Wat zijn de belangrijkste functies die u nodig heeft om uw woonruimte optimaal te benutten?",
                        functions:{
                            bed:"Bed",
                            office_space:"Bureauruimte",
                            sofa:"Sofa",
                            storage_space:"Opbergruimte",
                        },
                        bed:{
                            q_size: "Welke breedte verkiest u?",
                            q_bed:"Welke matras verkiest u?",
                            soft:"Extra zacht",
                            medium:"Medium",
                            sturdy:"Extra stevig",
                            apply: "Niet van toepassing"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?",
                        preferences:{
                            wall:"Muur",
                            partition_wall:"Scheidingswand",
                            in_the_middle_of_space:"Te midden van ruimte",
                        },
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
                        other:"Autre",
                        q_door:{
                            opening_door:"Comment s'ouvre la porte ?",
                            inside_left:"A l'intérieur de la salle, à gauche",
                            inside_right:"A l'intérieur de la salle, à droite",
                            outside:"Espace extérieur"
                        },
                        q_window:{
                            opening_window:"La fenêtre peut-elle s'ouvrir vers l'intérieur ?",
                            yes:"oui",
                            no:"non"
                        }
                    },
                    questionnaire_func: {
                        q_space:"Quel espace de vie souhaitez-vous optimiser?",
                        space:{
                            guest_room:"Chambre d'amis",
                            living_room:"Le salon",
                            bedroom:"Chambre à coucher",
                        },
                        q_function:"Quelles sont les caractéristiques les plus importantes dont vous avez besoin pour tirer le meilleur parti de votre espace de vie?",
                        functions:{
                            bed:"Lit",
                            office_space:"Bureau",
                            sofa:"Canapé",
                            storage_space:"Espace de stockage",
                        },
                        bed: {
                            q_size: "Quelle est la largeur que vous préférez ?",
                            q_bed: "Quel matelas préférez-vous?",
                            soft: "Extra doux",
                            medium: "Moyen",
                            sturdy: "Extra solide",
                            apply: "Non applicable"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Vous avez des préférences particulières pour l'aménagement de votre espace de vie?",
                        preferences:{
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
                            walnut:"Noyer",
                            color: "Couleur",
                            material: "Matériau"
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
                        },
                        bed: {
                            q_size: "Welche Breite würden Sie bevorzugen? ",
                            q_bed: "Welche Matratze bevorzugen Sie?",
                            soft: "Extra weich",
                            medium: "Mittel",
                            sturdy: "Extra fest",
                            apply: "Nicht anwendbar"
                        }
                    },
                    questionnaire_specs: {
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
                        other: "Otro",
                        q_door:{
                            opening_door:"cómo abrir la puerta",
                            inside_left:"dentro de la habitación, a la izquierda",
                            inside_right:"dentro de la habitación, a la derecha",
                            outside:"espacio exterior"
                        },
                        q_window:{
                            opening_window:"¿Puede abrirse la ventana hacia el interior?",
                            yes:"si",
                            no:"no"
                        }
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
                        },
                        bed: {
                            q_size: "¿Cuál es la anchura que prefiere?",
                            q_bed: "¿Qué colchón prefieres?",
                            soft: "Extra suave",
                            medium: "Medio",
                            sturdy: "Extra firme",
                            apply: "No aplicable"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "¿Tienes preferencias específicas para la distribución de tu espacio habitable?",
                        preferences: {
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
                            walnut: "Nogal",
                            color: "Color",
                            material: "Material"
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
                        other: "Altro",
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
                        },
                        bed: {
                            q_size: "Qual è la larghezza che preferite?",
                            q_bed: "Quale materasso preferisci?",
                            soft: "Extra morbido",
                            medium: "Medio",
                            sturdy: "Extra robusto",
                            apply: "Non applicabile"
                        }
                    },
                    questionnaire_specs: {
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