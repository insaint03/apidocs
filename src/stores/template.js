import { defineStore } from 'pinia'

import Template  from '@/models/template'

export const useTemplateStore = defineStore('template', {
    state: ()=>({
        // template item tree
        items: [],


    })
});