import projectInfo from './project.vue'
import datatypeTab from './datatypes.vue'

export default [
    {key: 'info', icon: 'information', title: 'Project', component: projectInfo},
    {key: 'datatype', icon: 'datatype', title: 'Datatypes', component: datatypeTab},
    {key: 'endpoint', icon: 'endpoint', title: 'Endpoints', component: null},
    {key: 'template', icon: 'tag', title: 'Templates', component: null},
    {key: 'preview', icon: 'eye', title: 'Preview', component: null},
]