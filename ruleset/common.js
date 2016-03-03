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
			"respectLink" : function(elem){
				// https://docs.angularjs.org/api/ng/directive/ngHref
				// if using ngclick, you should have an href also
				if(elem.is('[ng-click]') && elem.is('[href]')
					|| elem.is('[ng-href]')
					|| elem.is('[ui-sref]')
				  || elem.is('[href]')){
          return true;
        }
				else{
					return false;
				}
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
