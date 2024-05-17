import {Project, Datatype, Template, Entity} from '@/models';

export default {

    async loads(filepath) {
        // TODO: clear current data
        Datatype.clear();
        Template.clear();

        // try import file content from the path
        let content = null;
        content = await import(filepath);

        // build project info
        const project = new Project(content.project);

        // and load datatypes
        const datatypes = content.datatypes.map((d)=>Datatype.setup(d));

        // then templates next,
        const templates = content.templates.map((t)=>Template.setup(t));

        // finally, load entities
        const entities = content.entities.map((e)=>Entity.setup(e));

        return {
            project,
            datatypes,
            templates,
            entities,
        };
    }
}