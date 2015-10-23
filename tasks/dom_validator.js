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
      	options.ruleset[option] = (require('grunt-dom-validator/validators/'+option+'.js'))[option]; ///common.js
        //We loop over elements
        options.ruleset[option].forEach(function(rule){
           var selector = rule.selector;
            //We get occurences
            var vals = $(selector).map(function(i,elem){
              return $(elem);
            });
            //Process rules
            vals.forEach(function(elem){
              for (var elem_rule in rule.rules) {
                  var fn = rule.rules;
                for (var ruleProperty in fn[elem_rule]){
                  var target = elem[elem_rule](ruleProperty);
                  var ruleValue = fn[elem_rule][ruleProperty];
                  var respected = true;
                  //Check for specific keywords
                  if(ruleValue === 'defined'){
                    if(!target){
                      respected = false;
                    }
                  }else if( ruleValue === 'forbidden' ){ //
                    if(target){
                      respected = false;
                    }
                  }else{//We look for specific values
                    if(grunt.util.kindOf(ruleValue) === 'array'){
                      respected = ruleValue.indexOf(target) >= 0 ;
                    }else{
                      respected = target === ruleValue;
                    }

                  }
                  if(!respected){
                    grunt.log.writeln('Error found for selector "'+selector+'" for rule "'+ elem_rule + ':'+ ruleProperty +'" in file '+f );
                    elem.innerHtml = '';
                    grunt.log.verbose.writeln('Faulty element is '+ elem.empty());
                  }
                }
              }
            });


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
