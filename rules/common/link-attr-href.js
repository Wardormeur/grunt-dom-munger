module.exports.link_attr_href =
{
  //structure for json-logic-js
  "conditions": {
    "selector": "a",
    "expected" : ["to", "include"],
    "value" : ["href", "ng-href", "ui-sref"]
  },
  "error": {
    "type": "blocker",
    "message" : "Inline style is forbidden"
  }
};
