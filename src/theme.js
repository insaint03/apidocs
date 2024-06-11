export default {
    colors: {
        primary: '#FFD700',
        info: '#FFD700',
        datatype: '#FFD700',
        template: '#FFD700',
        entity: '#FFD700',
        tag: '#FFD700',
    },
    fonts: {

    },
    fields: {
        variant: 'underlined',
    },
    expanding_icon(value) {
        return `mdi-chevron-${value?'up':'down'}`;
    },
}