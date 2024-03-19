import LocalizedStrings from 'react-native-localization';
import { englishStrings } from './language_data/english';
import { hindiStrings } from './language_data/hindi';

export const  strings = new LocalizedStrings({
    en:englishStrings,
    hi: hindiStrings
   });

export const changeLanguage = (languageKey) => {
    strings.setLanguage(languageKey)
    }