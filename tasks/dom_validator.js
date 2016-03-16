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
var chai = require('chai');
var ccheerio = require('chai-cheerio');
var logic = require('json-logic-js');
var glob = require('glob');
var _ = require('underscore');
var traverse = require('traverse');

var toArray = function(value) {
  return (Array.isArray(value)) ? value : [value];
};


module.exports = function(grunt) {
  module.exports.rules = {};
  _.extend(logic.operators, ccheerio);
  var processFile = function(f, dest, options, $, window){

    if(options.ruleset){
      var violented = 0;
      options.ruleset = toArray(options.ruleset);
      options.selectors = {};
      options.rulesets = {};
      options.rules = {};
      options.ruleset.forEach(function(option) {

        /**
         * Load every rules related to the modulePath
         * @param  {String} modulePath [regexp Path to the rules]
         */
        var loadRules = function (modulePath, ruleset){
          //make an index of selector per rule to fasten the research of rules
          glob.sync( modulePath ).forEach( function( file ) {
            options.rulesets[ruleset] = require( path.resolve( file ) );
            // Rule should be name the same way than its export
            var ruleName = _.first(_.keys(options.rulesets[ruleset]));
            var rule = options.rulesets[ruleset][ruleName];

            //rule oriented check
            options.rules[ruleName] = rule;

            //selector oriented check
            traverse(rule.conditions).forEach(function(condition){
              //this is sortof suboptimal as it may happen more than once (ex multiple selector)
              if(!_.has(options.selectors, condition.selector)){
                options.selectors[condition.selector] = {};
              }

              if(!_.has(options.selectors[condition.selector], ruleset)){
                options.selectors[condition.selector][ruleset] = [];
              }
              options.selectors[condition.selector][ruleset].push(rule);
            });

          });
        };

        var modulePath = '';
        var moduleName = '';
        if(grunt.util.kindOf(option) === 'string'){
          moduleName = option;
          modulePath = 'grunt-dom-validator/rules/'+option+'/*.js';
        }
        else{ // If it contains an object and an src field, we should take the path "as it"
            moduleName = option.name;
            modulePath = path.resolve(option.src);
        }
        grunt.log.writeln(moduleName);
          loadRules(modulePath, moduleName);
        });

        /**
         * Returns an array of rules to apply for this selector
         * @param  {string} selector [jq selector]
         * @return {[Rules]}          [an array of rule to test]
         */
         var lookUp = function (selector){
          var rules = [];
          _(options[selector]).forEach(function(ruleset){
            _(ruleset).forEach(function(rule){
              rules.push(options.rulesets.ruleset.rule);
            });
          });
          return rules;
        }


        /**
         * Custom engine to check the validity
         * @param  {Object} rule    [the rule description, condition, element to get, etc]
         * @param  {jQDOM} element [the element to which the rule should be applied]
         * @return {boolean}         [valid|n]
         */
         var applyLogic = function (rule, element){
          var supported = true;
          var validity = false;

          /**
           * Inline function to prepare the condition
           * TODO : replace with chai-cheerio when json-logic-js will support extension of operators
           * @param  {[type]} rule    [the rule to evaluate]
           * @return {[type]}         [the conditions to evaluate ]
           */
          var chaiTests = function(rule){
            //element is shared by parent scope !! We need the function to be here
            var expect = chai.expect;
            var value = void 0;
            var result = void 0;

            var element = $(rule.selector)[rule.target];
            var testsOperators = rule.expected.join('.');

            if(rule.target){
              value = element[rule.target];
            }else{
              value = element;
            }
            //one of an array
            //If multiple values required, define multiple conditions
            if(_.isArray(rule.value)){
              result = expect(rule.value)[testsOperators];
            }else{
              result = expect(value)[testsOperators](rule.value);
            }

            //we overwrite the selector definition to only have the value
            return createRule(result);
          };

          /**
           * Adapt our rule to the json-logic-js format
           * @param  {[type]} rule [description]
           * @return {json-logic-js rule}      [description]
           */
          var createRule = function(result){
              //2 solutions here:
              // 1) use tests from chai-cheerio and only test == true with json-logic-js
              // OR
              // 2) use tests from json-logic-js directly

              //1) exepected = {
              //      "==" : {"val" : true}
              //   }

              var structure = {
                  "===" : [ result, true]
              };
            return structure;
          };


          //check if all functions are supported
          var logic = void 0;

          logic = _.cloneDeepWith(logic.conditions, chaiTests);

          //Logic should be of format
          // logic = {
          //      "===" :{
          //         [ result, true]
          //      }
          // }

          //or for multi-cond :
          // logic = {
          //      "and":{
          //        "===" :{
          //         [ result, true]
          //        },
          //        "===" :{
          //         [ result2, true]
          //        }
          //     }
          // }

            validity = logic.apply(rule);
            if(validity){
              return validity;
            }else{
              //TODO: error handler
              return rule.error;
            }


        };
        grunt.log.writeln(JSON.stringify(options.rules));
        _.forIn(options.rules, function(name, rule){
          var elements = $(rule.selector);
          _.forEach(elements, function(element){
            applyLogic(rule, elements[element]);
          });
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
