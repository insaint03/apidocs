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
        field: {
            variant: 'underlined',
            readonly: true,
        },
        expanding_icon(value) {
            return `mdi-chevron-${value?'up':'down'}`;
        },
    }
}
export default {
    install(app, options={theme:'_default'}) {
        const theme = themes[options.theme];
        app.config.globalProperties.$thx = theme;
    }
}