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
  },
	{
		"selector": "a",
		"rules": {
			"attr": {
					"ng-href": "defined"
				},
			"attr": {
					"ng-sref" : "defined"
				}
		}
	},
	{
		"selector" : "input",
		"rules" : {
			"attr": {
				"name" : "defined"
			},
			"prev": {
				"label": "defined"
			}
		}
	}

];
