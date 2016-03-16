//TODO : export to the following format existing rules
//each rule should be named so you can overwrite or extend it
module.exports.forbidden_style_inline =
{
  //structure for json-logic-js
  "conditions": [{
    "selector": "*",
    "expected" : ["not", "have", "property"],
    "value" : "style"
  }],
  "error": {
    "type": "blocker",
    "message" : "Inline style is forbidden"
  }
};


//recovery des données
//test = apply conditions avec les données recovered
