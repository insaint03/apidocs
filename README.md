# vue3-bolierplate

Vite based vue3-boilerplate template.
Includes:
 - [x] vue-router
 - [x] vuetify3
 - [x] pinia store

## How to run

```bash
# run preview (default port 8080 @/vite.config.js)
$ vite

# run preview with port set
$ vite --port [PORT_NUMBER]

# run unit test
$ vitest
```

## Folder Hierarchy

 - [ ] **/.github** github actions
 - [x] **/src** main source root, aliased `'@/'`
   - [x] **./models** data models
   - [x] **./assets** media & data assets
   - [x] **./components** common components
   - [x] **./views** vue-router components and its path fragment
   - [x] **./plugins** common plugins, including vuetify, vue-router
   - [x] **./stores** pinia stores
 - [x] **/tests**  test folder, aliased `'%/'` (\*\*.test.\*\* or \*\*.spec.\*\*)
   - [x] **./models** test for data models
   - [x] **./components** test for components
   - [x] **./plugins** test for plugins
   - [x] **./stores** test store setup
   


## Licensed
MIT
