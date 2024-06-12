export default {
    get dataLayer() {
        if(!window.dataLayer) {
            window.dataLayer = [];
            window.dataLayer.push({
                'gtm.start': Date.now(),
                event: 'gtm.js',
            });
        }
        return window.dataLayer;

    },
    push(event, argv) {
        this.dataLayer.push({
            ...(argv || {}),
            event: `adoc.${event}`,
        });
    
    }
}