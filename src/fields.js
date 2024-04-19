import props from '@/field.properties.yaml'


const common_setting = {};
const field_keys = {
  service: [
    'title',
    'version',
    'license',
    'contributors',
    'links',
  ],
  parameters: [
    "name",
    "basistype",
    "validation",
    "items",
  ],
  parameter_desc: [
    "migration",
    "description",
  ],
  request: [
    "method",
    "path",
    "query",
    "cookies",
    "headers",
    "body",
  ],
  response: [
    "mimetype",
    "status",
    "cookies",
    "headers",
    "body",
  ],
  template: [
    "name",
    "extend",
    "tagname",
  ],
  items: ["required", "key", "datatype", "description"],
  query: ["key", "expect", "required", "default", "inherit", "misc"],
  cookies: ["key", "expect", "required", "inherit", "misc"],
  headers: ["key", "expect", "required", "inherit", "misc"],
  entity: ["path", "method", "request_body", "response_type", "response_body"],
};

export default Object.fromEntries(
  Object.entries(field_keys).map(([category, keys]) => [
    category,
    keys.map((key) =>
      Object.assign(
        { key, label: key },
        common_setting,
        props[category][key] || {}
      )
    ),
  ])
);