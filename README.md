# Api Documentation

Build / View (web-based) API Documentation System
- [ ] editor
- [ ] viewer
- [ ] github support

## Editor
Better, simplified RestAPI builder in advance common templating.
A document comprised 3 components: parameters, entities, templates.

### Parameters
A **Parameter** is data schema and/or parameter datatype definition. Which corresponds Parameter/Schema entity at OpenAPI Specification.
OpenAPI Specification distinct parameter and/or schema to minimize schema migration efforts. Though it makes extra burden on defining data-entry. Here, it either aggregated in a single class, paramters.
Parameters on the documentation has determined every elements on openAPI specification except placement. 


### Entities
A **Entity** is a request-response tuple/pair. An API design inherited to have - a single response to a request. If it's not, it must be distinct by parameter separation. There it should be an another pair, because parameter is not the same.
Grouping entities within identical pathes comprises an Endpoint at openAPI spec definition.

### Templates
**Templates** provide combinatorial manner, which are corresponding Tags at openAPI specification, but also integrates templated i) path syntax ii) method preset and either iii) request/response parameter preset/candidates. Mix & Match templates will ease building multiple entity variations at less-designer-effort.


## Viewer



## Github support

