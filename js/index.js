let textarea = document.querySelector("textarea");
let output = document.querySelector("textarea.output");
let counter = document.querySelector(".counter");
let languagesMenu = document.querySelectorAll("select");
let switchBtn = document.querySelector(".btn.switch");
let translateBtn = document.querySelector(".btn.translate");
let isLoading = true;
let fromSelect = document.querySelector(".from");
let toSelect = document.querySelector(".to");
const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};
let languagesEntries = Object.entries(countries);
textarea.addEventListener("input", () => {
  /* change the counter when the user write or delete characters and based on the counter the button disabled or enabeld */
  let text = textarea.value;
  translateBtn.disabled = !text.length > 0;
  counter.innerHTML = `${textarea.value.length} / 500`;
});

languagesMenu.forEach((menu) => {
  /*Adding the languages to the selects */
  languagesEntries.map((lang) => {
    menu.innerHTML += `<option class="language" value="${lang[0]}">${lang[1]}</option>`;
  });
});
switchBtn.addEventListener("click", () => {
  /*Switch Languages */
  let fromLang = fromSelect.value;
  let toLang = toSelect.value;
  fromSelect.value = toLang;
  toSelect.value = fromLang;
});
translateBtn.addEventListener("click", () => {
  /*Get the languages and fetch the translation */
  let text = textarea.value;
  let fromLang = fromSelect.value;
  let toLang = toSelect.value;
  output.innerHTML = "Translating...";
  fetch(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      isLoading = false;
      if (data.responseStatus != 200 || !data.responseData.translatedText) {
        output.innerHTML =
          data.responseData.translatedText == null
            ? "No Translation Found"
            : data.responseData.translatedText;
        output.classList.add("error");
      } else {
        output.innerHTML = data.responseData.translatedText;
        output.classList.remove("error");
      }
    });
});
