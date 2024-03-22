// import Parameter from '@/models/parameter';
// import Request from '@/models/request';
// import Response from '@/models/response';
// import Template from '@/models/template';

import props from "@/field.properties.json";

const common_setting = {};
const field_keys = {
  parameters: [
    "name",
    "basistype",
    "migrate",
    "summary",
    "description",
    "validation",
    "items",
    "samples",
  ],
  request: [
    "method",
    "path",
    "summary",
    "description",
    "query",
    "cookies",
    "headers",
    "body",
  ],
  response: [
    "mimetype",
    "status",
    "summary",
    "description",
    "cookies",
    "headers",
    "body",
  ],
  template: [
    "name",
    "tag",
    "summary",
    "description",
    "inherit",
    "request",
    "response",
  ],
  query: ["key", "expect", "required", "default", "inherit", "misc"],
  cookie: ["key", "expect", "required", "inherit", "misc"],
  headers: ["key", "expect", "required", "inherit", "misc"],
};

console.log("field props",  
  Object.entries(field_keys)
  .map(([category,keys])=>({
    category, 
    p: props[category], 
    keys,
    // ks: keys.filter((k)=>!props[category][k])
  })));
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