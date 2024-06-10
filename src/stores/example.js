import { defineStore } from "pinia";

export const useExampleStore = defineStore('example', {
    state() {
        return {
            list: [
                {
                    title: 'simple', 
                    location: 'https://raw.githubusercontent.com/insaint03/apidocs/main/data/simple.native.yaml',
                    desc: 'A simple example with a single entity and a single template',
                    
                },
                {
                    title: 'blog',
                    location: 'https://raw.githubusercontent.com/insaint03/apidocs/main/data/blog.native.yaml',
                    desc: 'A blog example with multiple entities and templates',
                    disabled: true,
                },
                {
                    title: 'meter',
                    location: 'https://raw.githubusercontent.com/insaint03/apidocs/main/data/meter.native.yaml',
                    desc: 'A meter example with multiple entities and templates',
                    disabled: true,
                },
                {
                    title: 'toDO',
                    location: 'https://raw.githubusercontent.com/insaint03/apidocs/main/data/toDo.native.yaml',
                    desc: 'A toDo example with multiple entities and templates',
                    disabled: true,
                }
            ]
        }
    },
});