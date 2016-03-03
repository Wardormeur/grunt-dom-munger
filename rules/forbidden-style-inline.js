//TODO : export to the following format existing rules
//each rule should be named so you can overwrite or extend it
module.exports.rules.forbidden_style_inline =
{
  "attr": {
    "selector": "style",
    "value": null ,
    "quantity": "0"
  },
  "error": {
    "type": "blocker",
    "message" : "Inline style is forbidden"
  }
};
