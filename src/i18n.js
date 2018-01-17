import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import LanguageJson from "./locales/";
import { reactI18nextModule } from "react-i18next";
import language from "./locales/";
import { getLocalItem } from "./utils/util";
var languageItem = getLocalItem("language");
var languageType = "cn";
if (languageItem) {
	languageType = languageItem.data;
}

i18n
	//.use(XHR)
	.use(LanguageDetector)
	.use(reactI18nextModule) // if not using I18nextProvider
	.init(
		{
			resources: language,
			translations: ["translation"],
			defaultNS: "translation",
			fallbackLng: languageType,
			lng: languageType,
			debug: true,
			interpolation: {
				escapeValue: false // not needed for react!!
			},
			// react i18next special options (optional)
			react: {
				wait: true
			}
		},
		(err, t) => {
			if (err) {
				return console.error(err);
			}
			console.log("i18n successfully initialized");
		}
	);
export default i18n;
