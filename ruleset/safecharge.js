module.exports.ngmd = [

	{
		"selector" : "md-subheader",
		"rules": {
			"parent": {
				"h2": "defined"
			}

		}
	},
	{
		"selector" : ".md-actions",
		"rules": {
			"attr": {
				"class": ['single-button','wrapped-buttons','inline-buttons']
			}
		}
	},
	{
    "selector" : "md-card",
    "rules": {
      "find": {
        ".main-card-container": "defined"
      },
      "find": {
        "md-content": "defined"
      }
    }
  },
  {
    "selector" : "md-tab",
    "rules" : {
      "parent" : {
        "md-tabs" : "defined"
      }
    }
  }

];
