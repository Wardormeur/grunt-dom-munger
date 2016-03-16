/*
 * grunt-dom-munger
 * https://github.com/cgross/grunt-dom-munger
 *
 * Copyright (c) 2013 Chris Gross
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    // Configuration to be run (and then tested).
    dom_validator: {
      common: {
        options: {
            ruleset: [
              {
                name: 'common',
                src: 'rules/common/*.js'
              }
            ]
        },
        src: 'test/common/common.html',
      },
      testFunction:{
        options: {
            ruleset: [
              {
                name: 'common',
                src: 'rules/common/*.js'
              }
            ]
        },
        src: 'test/common/function.html',
      },
      testSelectorAttr:{
        options: {
            ruleset: [
              {
                name: 'common',
                src: 'rules/common/*.js'
              }
            ]
        },
        src: 'test/common/attr.html',
      },
    //   testParent:{
    //     options: {
    //         ruleset: [
    //           {
    //             name: 'ruleset',
    //             src: 'test/ruleset.js'
    //           }
    //         ]
    //     },
    //     src: 'test/common/parent.html',
    //   },
    //   testClosest:{
    //     options: {
    //         ruleset: [
    //           {
    //             name: 'ruleset',
    //             src: 'test/ruleset.js'
    //           }
    //         ]
    //     },
    //     src: 'test/common/selector-parent.html',
    //   },
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadTasks('tasks');


  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', [ 'test']);

};
