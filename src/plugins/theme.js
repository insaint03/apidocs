const themes = {
    _default: {
        color: {
            background: '#FFFFFF',
            foreground: '#000000',
            primary: '#039BE5',
            secondary: '#43A047',
            accent: '#D81B60',
            info: '',
            warn: '',
            danger: '',
            migration: '#009688',
            datatype: '#43A047',
            tag: '#795548',
            template: '#FB8C00',
            api: '#039BE5',
            http_method: {
                GET: '#43A047',
                POST: '#FFC107',
                PUT: '#FF9800',
                DELETE: '#F44336',
            },
        },
        icon: {
            about: 'mdi-information',
            migration: 'mdi-database-export',
            tag: 'mdi-pound',
            datatype: 'mdi-oci',
            endpoint: 'mdi-api',
            is_expanded: 'mdi-chevron-up',
            to_expanding: 'mdi-chevron-down',
            links: {
                github: 'mdi-github',
                repository: 'mdi-source-repository',
                wiki: 'mdi-wikipedia',
                issue: 'mdi-ticket-outline',
                issues: 'mdi-ticket-outline',
                docs: 'mdi-file-document',
                document: 'mdi-file-document',
                guideline: 'mdi-file-document',
                license: 'mdi-file-certificate',
                terms: 'mdi-file-document-outline',
                privacy: 'mdi-file-document-outline',
                other: 'mdi-file-document-outline',
            }
        },
        field: {
            variant: 'underlined',
            readonly: true,
        },
        expanding_icon(value) {
            return value ? this.icon.is_expanded : this.icon.to_expanding;
        },
    }
}
export default {
    install(app, options={theme:'_default'}) {
        const theme = themes[options.theme];
        app.config.globalProperties.$thx = theme;
    }
}