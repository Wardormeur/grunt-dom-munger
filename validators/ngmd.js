module.exports.ngmd = [

	{
		"selector" : "md-button",
		"rules": {
			"closest": {
				"form": "defined"
			},
      "functions" : function (elem){
        if(elem.attr('ng-click') && elem.attr('type') !== 'button'){
          return false;
        }
      },
			"attr": {
			 	"type": ["button", "submit"]
			}

		}
	}

];
