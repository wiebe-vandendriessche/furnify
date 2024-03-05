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
                        q_aspects:"",
                        aspect:"Aspect",
                        aspect_types: {
                            window:"Window",
                            door:"Door",
                            radiator:"Radiator",
                            walloutlet:"Wall outlet",
                            switch:"Switch",
                            sloping_Wall:"Sloping wall",
                            other:"Other"
                        },
                        add_aspect: "Add aspect"
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
                        q_aspects:"Add which aspects we should take into account in your living space.",
                        aspect:"Aspect",
                        aspect_types: {
                            window:"Raam",
                            door:"Deur",
                            radiator:"Radiator",
                            walloutlet:"Stopcontact",
                            switch:"Schakelaar",
                            sloping_Wall:"Schuine wand",
                            other:"Andere"
                        },
                        add_aspect: "Voeg een aspect toe"
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
                        aspect_types: {
                            window:"Fenêtre",
                            door:"Porte",
                            radiator:"Radiateur",
                            walloutlet:"Prise murale",
                            switch:"Interrupteur",
                            sloping_Wall:"Mur en pente",
                            other:"Autre"
                        },
                        add_aspect: "Ajouter un aspect"
                    }
                }
            }
        }
    });

export default i18n;