//This is a subset of common to test functionnalities of this lib
//each element is testing one scenario
module.exports.ruleset = [
	{
		"selector" : "a",
		"rules": {
			"testFunction": function (elem){
					if(elem.is('[ng-href]') || elem.is('[href]')){
						return true;
					}
					else{
						return false;
					}
			},
		}
	},
  {
		"selector" : "button",
		"rules": {
			"attr": {
				"type": ["button", "submit"]
			}
		}
	},
  {
    "selector" : "img.defined",
    "rules": {
      "attr": {
        "src": "defined"
      }
    }
  },
  {
    "selector" : "img.specific",
    "rules": {
      "attr": {
        "src": "http://ljdchost.com/ijJH1xd.gif"
      }
    }
  },
];
