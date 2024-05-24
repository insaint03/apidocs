import Project from '@/models/project';
import { describe, test, expect } from 'vitest';

describe("Project Model", ()=> {
    describe('properties', ()=>{
        test('project name', ()=>{
            const prj = new Project({name: 'test'});
            expect(prj.name).toBe('test');
            prj.name = 'ntest';
            expect(prj.name).toBe('ntest');
        });
        test('project description', ()=>{
            const prj = new Project({description: 'test'});
            expect(prj.description).toBe('test');
            prj.description = 'ntest';
            expect(prj.description).toBe('ntest');
        });

        test('project version', ()=>{
            const prj = new Project({version: '1.0.0'});
            expect(prj.version).toBe('1.0.0');
            prj.version = '1.0.1';
            expect(prj.version).toBe('1.0.1');
        });

        test('project links', ()=>{
            const prj = new Project({});
            prj.links = [
                '(git) github <https://github.com>',
                '(doc) document <https://document.com|docs>'
            ].join('\n');

            expect(prj.links).toBeInstanceOf(Array);
            expect(prj.links).toHaveLength(2);

            let [git,doc] = prj.links;
            expect(git).to.contain({keytype: 'git', title: 'github'});
            expect(git.links[0]).to.contain({href: 'https://github.com', anchor: 'https://github.com'});
            expect(doc).to.contain({keytype: 'doc', title: 'document'});
            expect(doc.links[0]).to.contain({href: 'https://document.com', anchor: 'docs'});
        });

        test('project license', ()=>{
            const prj = new Project({});
            prj.license = '(mit) MIT License';
            expect(prj.license).to.contain({keytype: 'mit', title: 'MIT License'});
        });

        test('project history', ()=>{
            const prj = new Project({});
            prj.history_log({
                version: '1.0.0',
                date: '2021-01-01',
                items: [
                    '(add) added feature',
                    '(fix) fixed bug'
                ].join('\n')
            });

            expect(prj.history).toHaveLength(1);
            let [hist] = prj.history;
            expect(hist.version).toBe('1.0.0');
            expect(hist.date).toBe('2021-01-01');
            expect(hist.items).toHaveLength(2);

            // appending at same version
            prj.history_log({
                version: '1.0.0',
                items: ['(fix) nothing']
            });
            expect(prj.history).toHaveLength(1);
            [hist] = prj.history;
            expect(hist.items).toHaveLength(3);

            // appending at new version
            prj.history_log({
                version: '1.0.1',
                items: '(add) new feature',
            });
            expect(prj.history).toHaveLength(2);
            let [,news] = prj.history;
            expect(news.date).toEqual(new Date().toISOString());
            expect(news.items).toHaveLength(1);

            
        
        })

        test('project keywords', ()=>{
            const prj = new Project({keywords: 'test'});
            expect(prj.keywords).to.contain('test');

            prj.keywords = 'ntest';
            expect(prj.keywords).to.contain('ntest');
            expect(prj.keywords).not.to.contain('test');

            prj.keywords = 'ntest, test';
            expect(prj.keywords).to.contain('ntest');
            expect(prj.keywords).to.contain('test');

            prj.keywords = ['test'];
            expect(prj.keywords).to.contain('test');
            expect(prj.keywords).not.to.contain('ntest');
        });
    });

});