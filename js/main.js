/*----------------------------
 * Configuration et constantes
----------------------------*/
let currentLang = 'fr';
const LANG_PATH = 'lang';
const LANG_ATTR = 'data-i18n';

/*----------------------------
 * Fonctions utilitaires
----------------------------*/
/**
 * Récupère une traduction imbriquée par clé pointée
 * @param {Object} translations - Objet de traductions
 * @param {String} key - Clé pointée (ex: "header.nav.projects")
 * @returns {String|null} Valeur traduite ou null
 */
function getTranslation(translations, key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
}

/*----------------------------
 * Fonctions principales
----------------------------*/
/**
 * Charge et applique les traductions pour une langue donnée
 * @param {String} lang - Code de la langue (fr ou en)
 */
async function loadLanguage(lang) {
    try {
        const response = await fetch(`${LANG_PATH}/${lang}.json`);
        const translations = await response.json();

        // Appliquer les traductions à tous les éléments avec data-i18n
        document.querySelectorAll(`[${LANG_ATTR}]`).forEach(element => {
            const key = element.getAttribute(LANG_ATTR);
            const value = getTranslation(translations, key);
            if (value) {
                element.textContent = value;
            }
        });

        // Mettre à jour la langue du document
        document.documentElement.setAttribute('lang', lang);
        currentLang = lang;
    } catch (error) {
        console.error(`Erreur lors du chargement de la langue ${lang}:`, error);
    }
}

/**
 * Bascule entre les langues (FR ↔ EN)
 */
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    loadLanguage(currentLang);
   
    document.getElementById('language-select').textContent = 
        currentLang === 'fr' ? 'EN' : 'FR';   
}

/*----------------------------
 * Initialisation
----------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    // Charger la langue par défaut
    loadLanguage(currentLang);

    // Ajouter l'événement sur le bouton de langue
    const langButton = document.getElementById('language-select');
    langButton.addEventListener('click', toggleLanguage);
});
