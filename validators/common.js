module.exports.common = [
	{
			"selector": "*",
			"rules": {
				"attr": {
					"style": "forbidden"
				}
			}

	},
	{
		"selector" : "button",
		"rules": {
			"closest": {
				"form": "defined"
			},
			"attr": {
			 	"type": ["button", "submit"]
			}

		}
	},
  {
    "selector": "form",
    "rules": {
      "attr": {
        "ng-submit": "defined"
      }
    }
  }

];
