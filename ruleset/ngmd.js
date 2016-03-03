module.exports.ngmd = [

	{
		"selector" : "md-button",
		"rules": {
			"closest": {
				"form": "defined"
			},
      "respectTypeActionClick": function (elem){
		        if(elem.is('[ng-click]') && elem.attr('type') === 'button'){
		          return true;
		        }
						else{
							return false;
						}
	      },
			"respectTypeActionSubmit": function (elem){
	        if(!elem.is('[ng-click]') && elem.attr('type') === 'submit'){
	          return true;
	        }
					else{
						return false;
					}
      }	,
			"attr": {
			 	"type": ["button", "submit"]
			}
		}
	},
	{
		"selector" : "md-dialog",
		"rules": {
			"find": {
				".md-actions": "defined"
			}
		}
	},
	{
		"selector" : ".md-dialog-content, md-dialog-content",
		"rules": {
			"parent": {
				"md-dialog" : "defined"
			}
		}
	},
	{
		"selector" : ".md-actions, md-dialog-actions",
		"rules": {
			"parent": {
				"md-dialog" : "defined"
			}
		}
	},
	{
		"selector" : "md-button",
		"rules": {
			"attr": {
					"class": ['md-warn', 'md-primary', 'md-accent', 'md-raised']
			},
			"attr":	{
					"aria-label": "defined"
			}
		}
	},
	{
		"selector" : "md-card-content",
		"rules": {
			"parent": {
					"md-card": "defined"
			}
		}
	},
	{
		"selector" : "md-checkbox",
		"rules": {
			"attr": {
					"ng-model": "defined"
			},
			"attr": {
					"aria-label": "defined"
			}
		}
	},
	{
		"selector" : "md-fab-toolbar",
		"rules": {
			"find": {
					"md-fab-trigger": "defined"
			},
			"find":{
				"md-fab-actions" : "defined"
			}
		}
	},
	{
		"selector" : "md-radio-group",
		"rules" : {
			"attr":{
				"ng-model" : "defined"
			}
		}
	},
	{
		"selector" : "md-radio-button",
		"rules" : {
			"parent":{
				"md-radio-group" : "defined"
			}
		}
	},
	{
		"selector": "md-icon",
		"rules" : {
			"attr" : {
				"md-font-icon" : "defined"
			},
			"attr": {
				"aria-label" : "defined"
			}
		}
	},
	{
		"selector" : "input",
		"rules" : {
			"parent" : {
				"md-input-container" : "defined"
			},
			"attr": {
				"ng-model" : "defined"
			}
		}
	},
	{
		"selector" : "md-select",
		"rules" : {
			"parent" : {
				"md-input-container" : "defined"
			},
			"attr": {
				"ng-model" : "defined"
			}
		}
	},
	{
		"selector" : "md-list-item",
		"rules" : {
			"parent" : {
				"md-list" : "defined"
			}
		}
	},
	{
		"selector" : "md-menu-bar",
		"rules" : {
			"parent" : {
				"md-menu" : "defined"
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
	},
	{
		"selector" : "md-grid-list",
		"rules" : {
			"find" : {
				"md-grid-tile" : "defined"
			}
		}
	},
	{
		"selector" : "md-grid-tile",
		"rules" : {
			"parent" : {
				"md-grid-list" : "defined"
			}
		}
	}

];
