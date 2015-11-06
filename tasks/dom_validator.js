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
      options.ruleset = toArray(options.ruleset);
      options.ruleset.forEach(function(option) {
      	options.ruleset[option] = (require('grunt-dom-validator/ruleset/'+option+'.js'))[option]; ///common.js
        // grunt.log.writeln(JSON.stringify(options.ruleset[option]));
        //We loop over elements
        options.ruleset[option].forEach(function(ruleset){
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
                        var target = elem[rule](ruleProperty);
                        //Check for specific keywords
                        if(ruleValue === 'defined'){
                          if(!target){
                            respectedRule = false;
                          }
                        }else if( ruleValue === 'forbidden' ){ //
                          if(target){
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
                    grunt.log.write('Error found for selector "'+ selector +'" in file '+f );
                    violations.forEach(displayRuleError);
                    grunt.log.verbose.writeln('Faulty element is '+ elem.empty());
                  }
            });

            function displayRuleError(rule){
              grunt.log.writeln(' for rule "'+ rule.rule+'"');
            }

            grunt.config(['dom_validator','data',selector],vals);
          }
        );
      });
    }
  };

  grunt.registerMultiTask('dom_validator', 'Read and validate html.', function() {

    var options = this.options({});
    var done = this.async();

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
        processFile(f,dest,options,$);

      });
    });

    done();
  });

};
