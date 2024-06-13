const locale_key = 'i18n';
const default_locale = 'en';
const dictionaries = {
    en: {
        text: 'English',
        items: {
            label: 'properties',
        }
    },
    ko: {text: '한국어'},    
};

export default {
    install(app, options) {
        const locale = localStorage.getItem(locale_key) 
            || (options||{locale:default_locale}).locale;
        // 
        app.config.globalProperties.$_lang = locale;
        // app.config.globalProperties.$dictionaries = dictionaries;
        app.config.globalProperties.$dict = new Proxy(dictionaries, {
            get: (target, prop) => {
                return dictionaries[app.config.globalProperties.$_lang][prop];
            },
            get locales() { 
                return Object.keys(dictionaries);
            },
            set language(lang) {
                if(dictionaries[lang] == null) {
                    throw new Error(`Language ${lang} is not supported.`);
                }
                localStorage.setItem(locale_key, lang);
                app.config.globalProperties.$_lang = lang;
            },
        });
    }
}