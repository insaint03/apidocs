import { defineStore } from "pinia";
import { useProjectStore } from "./project";

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
            ],
            guide: {
                en: import.meta.env.VITE_GUIDE_LOCATION,
                ko: import.meta.env.VITE_GUIDE_LOCATION_KO,
            },
            presets: [
                {title: 'Guide Example', d: 'guide.example.en'},
                {title: '가이드 예제', d: 'guide.example.ko'},
            ],
            project: useProjectStore(),
        }
    },
});