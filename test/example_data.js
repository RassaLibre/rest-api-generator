var example = {
  "models": [
    {
      "name": "Oven",
      "id": ":1",
      "properties": [
        {
          "id": ":2",
          "name": "SKU",
          "type": {
            "type": "string",
            "length": 30,
            "regex": "^[A-Z1-9]{2}-[A-Z1-9]{2}$"
          }
        },
        {
          "id": ":3",
          "name": "name",
          "type": {
            "type": "string",
            "length": 30
          }
        },
        {
          "id": ":4",
          "name": "parts",
          "type": {
            "type": "array",
            "key": "integer",
            "value": "Part"
          }
        },
        {
          "id": ":5",
          "name": "status",
          "type": {
            "type": "string",
            "length": 30
          }
        },
        {
          "id": ":6",
          "name": "createdAt",
          "type": {
            "type": "timestamp"
          }
        },
        {
          "id": ":7",
          "name": "updatedAt",
          "type": {
            "type": "timestamp"
          }
        },
        {
          "id": ":8",
          "name": "location",
          "type": {
            "type": "Location"
          }
        }
      ],
      "endpoints": [
        {
          "id": ":33",
          "type": "GET",
          "url": "ovens/"
        },
        {
          "id": ":34",
          "type": "GET",
          "url": "ovens/:id"
        },
        {
          "id": ":35",
          "type": "PUT",
          "url": "ovens/:id"
        },
        {
          "id": ":36",
          "type": "DELETE",
          "url": "ovens/:id"
        },
        {
          "id": ":37",
          "type": "POST",
          "url": "ovens/"
        }
      ]
    },
    {
      "name": "Pallet",
      "id": ":9",
      "properties": [
        {
          "id": ":10",
          "name": "SKU",
          "type": {
            "type": "string",
            "length": 30,
            "regex": "^[A-Z1-9]{2}-[A-Z1-9]{2}$"
          }
        },
        {
          "id": ":11",
          "name": "parts",
          "type": {
            "type": "array",
            "key": "integer",
            "value": "Part"
          }
        },
        {
          "id": ":12",
          "name": "location",
          "type": {
            "type": "Location"
          }
        },
        {
          "id": ":13",
          "name": "createdAt",
          "type": {
            "type": "timestamp"
          }
        },
        {
          "id": ":14",
          "name": "updatedAt",
          "type": {
            "type": "timestamp"
          }
        }
      ],
      "endpoints": [
        {
          "id": ":38",
          "type": "GET",
          "url": "pallets/"
        },
        {
          "id": ":39",
          "type": "GET",
          "url": "pallets/:id"
        },
        {
          "id": ":40",
          "type": "PUT",
          "url": "pallets/:id"
        },
        {
          "id": ":41",
          "type": "DELETE",
          "url": "pallets/:id"
        },
        {
          "id": ":42",
          "type": "POST",
          "url": "pallets/"
        },
        {
          "id": ":43",
          "type": "POST",
          "url": "pallets/:id/parts"
        },
        {
          "id": ":44",
          "type": "GET",
          "url": "pallets/:id/parts"
        },
        {
          "id": ":45",
          "type": "GET",
          "url": "pallets/:id/parts/:part_id"
        },
        {
          "id": ":46",
          "type": "PUT",
          "url": "pallets/:id/parts/:part_id"
        },
        {
          "id": ":47",
          "type": "DELETE",
          "url": "pallets/:id/parts/:part_id"
        }
      ]
    },
    {
      "name": "Location",
      "id": ":15",
      "properties": [
        {
          "id": ":16",
          "name": "SKU",
          "type": {
            "type": "string",
            "length": 30,
            "regex": "[A-Z]{1}[1-9]{2}-[1-9]{2}$"
          }
        },
        {
          "id": ":17",
          "name": "name",
          "type": {
            "type": "string",
            "length": 30
          }
        },
        {
          "id": ":18",
          "name": "geoLocation",
          "type": {
            "type": "geojson"
          }
        },
        {
          "id": ":19",
          "name": "createdAt",
          "type": {
            "type": "timestamp"
          }
        },
        {
          "id": ":20",
          "name": "updatedAt",
          "type": {
            "type": "timestamp"
          }
        }
      ],
      "endpoints": [
        {
          "id": ":48",
          "type": "GET",
          "url": "locations/"
        },
        {
          "id": ":49",
          "type": "GET",
          "url": "locations/:id"
        },
        {
          "id": ":50",
          "type": "PUT",
          "url": "locations/:id"
        },
        {
          "id": ":51",
          "type": "DELETE",
          "url": "locations/:id"
        },
        {
          "id": ":52",
          "type": "POST",
          "url": "locations/"
        }
      ]
    },
    {
      "name": "Part",
      "id": ":21",
      "properties": [
        {
          "id": ":22",
          "name": "SKU",
          "type": {
            "type": "string",
            "length": 30,
            "regex": "^[1-9]{2}-[A-Z1-9]{2}-[A-Z1-9]{2}$"
          }
        },
        {
          "id": ":23",
          "name": "name",
          "type": {
            "type": "string",
            "length": 30
          }
        },
        {
          "id": ":24",
          "name": "count",
          "type": {
            "type": "integer",
            "min": 0
          }
        },
        {
          "id": ":25",
          "name": "price",
          "type": {
            "type": "double",
            "min": 0
          }
        },
        {
          "id": ":26",
          "name": "value",
          "type": {
            "type": "double",
            "min": 0
          }
        },
        {
          "id": ":27",
          "name": "createdAt",
          "type": {
            "type": "timestamp"
          }
        },
        {
          "id": ":28",
          "name": "updatedAt",
          "type": {
            "type": "timestamp"
          }
        }
      ],
      "endpoints": [
        {
          "id": ":53",
          "type": "GET",
          "url": "parts/"
        },
        {
          "id": ":54",
          "type": "GET",
          "url": "parts/:id"
        },
        {
          "id": ":55",
          "type": "PUT",
          "url": "parts/:id"
        },
        {
          "id": ":56",
          "type": "DELETE",
          "url": "parts/:id"
        },
        {
          "id": ":57",
          "type": "POST",
          "url": "parts/"
        },
        {
          "id": ":58",
          "type": "GET",
          "url": "parts/:id/pallets"
        },
        {
          "id": ":59",
          "type": "POST",
          "url": "parts/:id/pallets"
        }
      ]
    }
  ],
  "associations": [
    {
      "id": ":29",
      "name": "lays on",
      "model1": {
        "name": "Part",
        "id": ":21"
      },
      "model2": {
        "name": "Pallet",
        "id": ":9"
      }
    },
    {
      "id": ":30",
      "name": "made out of",
      "model1": {
        "name": "Oven",
        "id": ":1"
      },
      "model2": {
        "name": "Part",
        "id": ":21"
      }
    },
    {
      "id": ":31",
      "name": "positioned at",
      "model1": {
        "name": "Pallet",
        "id": ":9"
      },
      "model2": {
        "name": "Location",
        "id": ":15"
      }
    },
    {
      "id": ":32",
      "name": "positioned at",
      "model1": {
        "name": "Oven",
        "id": ":1"
      },
      "model2": {
        "name": "Location",
        "id": ":15"
      }
    }
  ]
};

module.exports = example;