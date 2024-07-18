import projectInfo from './project.vue'
import datatypeTab from './datatypes.vue'
import templateTab from './templates.vue';
import rawTextTab from './rawText.vue';
// import previewTab from './preview.vue';
import endpointTab from './endpoints.vue';

export default {
    components: {
        projectInfo,
        datatypeTab,
        templateTab,
        rawTextTab,
        // previewTab,
        endpointTab,
    },
    editTabs: [
        {key: 'info', icon: 'information', title: 'Project', component: 'project-info'},
        {key: 'datatype', icon: 'datatype', title: 'Datatypes', component: 'datatype-tab'},
        {key: 'endpoint', icon: 'endpoint', title: 'Endpoints', component: 'endpoint-tab'},
        {key: 'template', icon: 'tag', title: 'Templates', component: 'template-tab'},
        // {key: 'preview', icon: 'eye', title: 'Preview', component: 'preview-tab'},
        {key: 'rawtext', icon: 'text', title: 'txt', component: 'raw-text-tab'},
    ]
};