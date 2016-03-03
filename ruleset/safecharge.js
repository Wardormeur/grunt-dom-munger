module.exports.safecharge = [

	{
		"selector" : "md-subheader",
		"rules": {
			"parent": {
				"h2": "defined"
			}
		}
	},
	{
		"selector": ".main-card-container",
		"rules" : {
			"find": {
				"md-card" : "defined"
			}
		}
	},
	{
    "selector" : ".main-card-container > md-card",
    "rules": {
      "find": {
        "md-card-content": "defined"
      },
			"hasClass": {
				"md-padding": "forbidden"
			},
			"attr": {
				"layout-padding" : "forbidden"
			}
    }
	},
	{
		"selector" : ".main-card-container > md-card > md-card-content",
		"rules" : {
			"find": {
				"md-content": "defined"
			},
			"hasClass": {
				"md-padding": "forbidden"
			},
			"attr": {
				"layout-padding" : "forbidden"
			}
		}
	},

	{
		"selector" : ".main-card-container > md-card > md-card-content > * ",
		"rules" : {
			"hasClass": {
				"md-padding": "forbidden"
			},
			"attr": {
				"layout-padding" : "forbidden"
			}
		}
	},
	// {
	// 	"selector" : ".md-actions, md-dialog-actions",
	// 	"rules": {
	// 		"attr": {
	// 			"class": ['single-button','wrapped-buttons','inline-buttons']
	// 		}
	// 	}
	// },

  // {
  //   "selector" : "md-tab",
  //   "rules" : {
  //     "parent" : {
  //       "md-tabs" : "defined"
  //     }
  //   }
  // },

	//Each action is triggering an analytic event,
	//we check that we have enough information for each of those to be able to track it back
	{
		"selector" : "md-button, a, [ng-click]",
		"rules" : {
			"respectAnalytics" : function(elem){
					var required = ["name", "aria-label"];
					var found = false;
					required.map(function(attr){
						if(elem.attr(attr)){
							found = true;
						}
					});
					return found;
			}
		}
	},
	{
		"selector" : "[ng-href], [href], [ng-click]",
		"rules" : {
			"singleAction" : function(elem){
				var avoid = ['ng-href', 'href', 'ng-click'];
				var amount = 0;
				avoid.map(function(attr){
					if(elem.attr(attr)){
						amount ++;
					}
				});
				return amount === 1;
			}
		}
	}

];
