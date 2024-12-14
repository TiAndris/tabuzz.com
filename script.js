// Böngésző nyelvének ellenőrzése
const browserLanguage = navigator.language || navigator.userLanguage;
const languageCode = browserLanguage.split('-')[0]; // Csak a nyelv rövid kódja (pl. 'en', 'de')

console.log('Detected Browser Language:', browserLanguage);
console.log('Extracted Language Code:', languageCode);

// Nyelvleképezés az Android badge-hez
const languageMap = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    bn: "Bengali",
    eu: "Basque",
    bs: "Bosnian",
    bg: "Bulgarian",
    my: "Burmese",
    ca: "Catalan",
    zh: "Chinese",
    "zh-HK": "Chinese-HK",
    "zh-TW": "Chinese-TW",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    et: "Estonian",
    fil: "Filipino",
    fi: "Finnish",
    fr: "French",
    "fr-CA": "French-CA",
    gl: "Galician",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    he: "Hebrew",
    hi: "Hindi",
    hu: "Hungarian",
    is: "Icelandic",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    ko: "Korean",
    ky: "Kyrgyz",
    lo: "Lao",
    lv: "Latvian",
    lt: "Lithuanian",
    mk: "Macedonian",
    ms: "Malay",
    ml: "Malayalam",
    mr: "Marathi",
    mn: "Mongolian",
    ne: "Nepali",
    no: "Norwegian",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    "pt-BR": "Portuguese-BR",
    "pt-PT": "Portuguese-PT",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    sr: "Serbian",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    es: "Spanish",
    "es-419": "Spanish-LATAM",
    sw: "Swahili",
    sv: "Swedish",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese",
    zu: "Zulu"
};

// Android badge fájlok
const androidBadgeBasePath = 'AndroidGetIt/';
const androidLanguageName = languageMap[languageCode] || "English"; // Fallback angolra
const androidBadgeFileName = `GetItOnGooglePlay_Badge_Web_color_${androidLanguageName}.png`;

// Fallback fájlok
const androidFallback = 'GetItOnGooglePlay_Badge_Web_color_English.png';

// Apple badge fájlok
const appleBadgeBasePath = 'AppleGetIt/';
const appleLanguageCode = languageCode.toUpperCase(); // Nagybetűs nyelvkód
const appleFallbackFile = 'US-UK.svg';


// Fájlok ellenőrzése és beállítása
console.log('Setting badges...');
setBadge('google-play-link', 'google-play-badge', androidBadgeBasePath, androidBadgeFileName, androidFallback, 'Android');
setAppleBadge('apple-store-link', 'apple-store-badge', appleBadgeBasePath, appleLanguageCode, appleFallbackFile);

// Függvények
function setBadge(linkId, imgId, basePath, fileName, fallbackFileName, platform) {
    const imgElement = document.getElementById(imgId);
    const linkElement = document.getElementById(linkId);
    const filePath = `${basePath}${fileName}`;

    console.log(`[${platform}] Attempting to fetch:`, filePath);

    // Ellenőrizzük, hogy a fájl létezik-e
    fetch(filePath, { method: 'HEAD' })
        .then((response) => {
            if (response.ok) {
                console.log(`[${platform}] File found:`, filePath);
                imgElement.src = filePath;
            } else {
                console.warn(`[${platform}] File not found:`, filePath);
                console.log(`[${platform}] Falling back to:`, `${basePath}${fallbackFileName}`);
                imgElement.src = `${basePath}${fallbackFileName}`;
            }
        })
        .catch((error) => {
            console.error(`[${platform}] Fetch error for file:`, filePath, error);
            console.log(`[${platform}] Using fallback:`, `${basePath}${fallbackFileName}`);
            imgElement.src = `${basePath}${fallbackFileName}`;
        });

    // Beállítjuk az alapértelmezett linket
    if (linkId === 'google-play-link') {
        linkElement.href = 'https://play.google.com/store/apps/com.tabuzz.tabuzz';
    } else if (linkId === 'apple-store-link') {
        linkElement.href = 'https://www.apple.com/app-store/';
    }
}

function setAppleBadge(linkId, imgId, basePath, languageCode, fallbackFile) {
    const imgElement = document.getElementById(imgId);
    const linkElement = document.getElementById(linkId);

    // Generáljuk a nyelvkódhoz tartozó fájl elérési útját
    const filePath = `${basePath}${languageCode}.svg`;

    console.log(`[Apple] Attempting to fetch: ${filePath}`);

    // Ellenőrizzük, hogy a fájl létezik-e
    fetch(filePath, { method: 'HEAD' })
        .then((response) => {
            if (response.ok) {
                console.log(`[Apple] File found: ${filePath}`);
                imgElement.src = filePath; // A megtalált fájl elérési útja
            } else {
                console.warn(`[Apple] File not found for language code: ${languageCode}. Falling back to: ${fallbackFile}`);
                imgElement.src = `${basePath}${fallbackFile}`; // Fallback fájl használata
            }
        })
        .catch((error) => {
            console.error(`[Apple] Fetch error for file: ${filePath}`, error);
            console.log(`[Apple] Using fallback: ${fallbackFile}`);
            imgElement.src = `${basePath}${fallbackFile}`; // Fallback fájl használata hiba esetén
        });

    // Beállítjuk az Apple Store linket
    linkElement.href = 'https://www.apple.com/app-store/';
}
