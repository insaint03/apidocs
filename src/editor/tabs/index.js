import projectInfo from './project.vue'
import datatypeTab from './datatypes.vue'

export default {
    components: {
        projectInfo,
        datatypeTab,
    },
    editTabs: [
        {key: 'info', icon: 'information', title: 'Project', component: 'project-info'},
        {key: 'datatype', icon: 'datatype', title: 'Datatypes', component: 'datatype-tab'},
        {key: 'endpoint', icon: 'endpoint', title: 'Endpoints', component: null},
        {key: 'template', icon: 'tag', title: 'Templates', component: null},
        {key: 'preview', icon: 'eye', title: 'Preview', component: null},
    ]
};