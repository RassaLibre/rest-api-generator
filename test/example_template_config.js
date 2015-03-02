var config = {
  "name" : "NodeJS REST API template collection",
  "description" : "Template collection for creating NodeJS REST API",
  "templates" : {
    "normal" : [
      {
        "path" : "blueprint/blueprint.tmpl.apib"
      },
      {
        "path" : "api/server.tmpl.js",
        "destination" : "something/something/"
      }
    ],
    "atomic" : [
      {
        "path" : "blueprint/random_json_builder.tmpl.apib"
      },
      {
        "path" : "blueprint/single_GET_request.tmpl.apib"
      }
    ],
    "duplicated" : [
      {
        "path" : "api/app/routes/controller.tmpl.js",
        "scope" : "model.models",
        "reference" : "model",
        "name_property" : "name"
      },
      {
        "path" : "api/app/models/data_structure.tmpl.js",
        "scope" : "model.models",
        "reference" : "model",
        "name_property" : "name",
        "destination" : "api/app/"
      }
    ]
  }
};

module.exports = config;
