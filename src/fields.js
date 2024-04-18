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
    "items",
    "description",
    "validation",
    "migrate",
    "samples",
  ],
  request: [
    "method",
    "path",
    "summary",
    "query",
    "cookies",
    "headers",
    "body",
  ],
  response: [
    "mimetype",
    "status",
    "summary",
    "cookies",
    "headers",
    "body",
  ],
  template: [
    "name",
    "extends",
  ],
  items: ["required", "key", "datatype", "description"],
  query: ["key", "expect", "required", "default", "inherit", "misc"],
  cookie: ["key", "expect", "required", "inherit", "misc"],
  headers: ["key", "expect", "required", "inherit", "misc"],
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