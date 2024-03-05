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
                        rectangular: "Rectangular",
                        length: "Length",
                        width: "Width",
                        height: "Height",
                        other: "Other",
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
                        rectangular: "Rechthoekig",
                        length: "Lengte",
                        width: "Breedte",
                        height: "Hoogte",
                        other: "Anders",
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
                        rectangular: "Rectangulaire",
                        length: "Longueur",
                        width: "Largeur",
                        height: "Hauteur",
                        other: "Autres",
                        add_aspect: "Ajouter un aspect"
                    }
                }
            }
        }
    });

export default i18n;