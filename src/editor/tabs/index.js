import projectInfo from './project.vue'
import datatypeTab from './datatypes.vue'
import templateTab from './templates.vue';
import previewTab from './preview.vue';

export default {
    components: {
        projectInfo,
        datatypeTab,
        templateTab,
        previewTab,
    },
    editTabs: [
        {key: 'info', icon: 'information', title: 'Project', component: 'project-info'},
        {key: 'datatype', icon: 'datatype', title: 'Datatypes', component: 'datatype-tab'},
        {key: 'endpoint', icon: 'endpoint', title: 'Endpoints', component: null},
        {key: 'template', icon: 'tag', title: 'Templates', component: 'template-tab'},
        {key: 'preview', icon: 'eye', title: 'Preview', component: 'preview-tab'},
    ]
};