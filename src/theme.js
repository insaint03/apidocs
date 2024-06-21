export default {
    color: {
        primary: '#FFD700',
        info: '#FFD700',
        datatype: '#FFD700',
        template: '#FFD700',
        entity: '#FFD700',
        tag: '#FFD700',
    },
    font: {

    },
    btn: {

    },
    field: {
        variant: 'underlined',
        placeholder: '(unspecified)'
    },
    expanding_icon(value) {
        return `mdi-chevron-${value?'up':'down'}`;
    },
}