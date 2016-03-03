/*
 * grunt-dom-munger
 * https://github.com/cgross/grunt-dom-munger
 *
 * Copyright (c) 2013 Chris Gross
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

var toArray = function(value) {
  return (Array.isArray(value)) ? value : [value];
};

module.exports = function(grunt) {

  var processFile = function(f,dest,options,$,window){

    if(options.ruleset){
      var violented = 0;
      options.ruleset = toArray(options.ruleset);

      options.ruleset.forEach(function(option) {
        var modulePath = '';
        var moduleName = '';
        if(grunt.util.kindOf(option) === 'string'){
          moduleName = option;
          modulePath = 'grunt-dom-validator/ruleset/'+option+'.js';
        }
        else{ // If it contains an object and an src field, we should take the path "as it"
            moduleName = option.name;
            modulePath = path.resolve(option.src);
        }
      	options.ruleset[moduleName] = (require(modulePath))[moduleName]; ///common.js
        // grunt.log.writeln(JSON.stringify(options.ruleset[option]));
        //We loop over elements
        options.ruleset[moduleName].forEach(function(ruleset){
           var selector = ruleset.selector;
            //We get occurences
            var vals = $(selector).map(function(i,elem){
              return $(elem);
            });
            //Process rules
            vals.forEach(function(elem){
              var fn = ruleset.rules;
              var violations = [];
              for (var rule in fn) {
                  //We check tuhe rules one by one
                  if(typeof(fn[rule]) === 'function'){
                      if(!fn[rule](elem)){
                        violations.push({rule:rule});
                      }
                  }else{
                    for (var ruleProperty in fn[rule]){
                        var ruleValue = fn[rule][ruleProperty];
                        var respectedRule = true;
                        //if target is being retrieved through find/parents, it can be an array
                        var target = elem[rule](ruleProperty);
                        // console.log(target);
                        //Check for specific keywords
                        if(ruleValue === 'defined'){
                          if(!target || (target && target.length === 0)){
                            respectedRule = false;
                          }
                        }else if( ruleValue === 'forbidden' ){
                          //for attr, void 0 is an empty attr || target === void 0
                          if( target  || (target && target.length > 0)){
                            respectedRule = false;
                          }
                        }else{//We look for specific values
                          if(grunt.util.kindOf(ruleValue) === 'array'){
                            respectedRule = ruleValue.indexOf(target) >= 0 ;
                          }else{
                            respectedRule = target === ruleValue;
                          }

                        }
                        if(!respectedRule){
                          violations.push({rule:ruleProperty});
                        }
                      }
                    }
                  }
                  if(violations.length > 0){
                    grunt.log.write('Error found for selector "'+ selector['yellow'] +'" in file '+f);
                    violations.forEach(displayRuleError);
                    grunt.log.verbose.writeln('Faulty element is '+ elem.empty());
                    violented += violations.length;
                  }
            });

            function displayRuleError(rule){
              grunt.log.writeln(' for rule "'+ rule.rule['yellow']+'"');
            }
            grunt.config(['dom_validator','data',selector],vals);
          }
        );
      });
      return violented;
    }
    return false;
  };

  grunt.registerMultiTask('dom_validator', 'Read and validate html.', function() {

    var options = this.options({});
    var done = this.async();
    var violented = 0;
    if (this.filesSrc.length > 1 && this.data.dest){
      grunt.log.error('Dest cannot be specified with multiple src files.');
      done(false);
    }

    this.files.forEach(function(f) {

      var dest = f.dest;

      f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(f){

        var srcContents = grunt.file.read(f);

        var $ = cheerio.load(srcContents,{lowerCaseAttributeNames:false});
        var violations = processFile(f,dest,options,$);
        violented += violations;
      });
    });

    grunt.log.write(violented + ' violations found, congratulations !');
    done();
  });

};
