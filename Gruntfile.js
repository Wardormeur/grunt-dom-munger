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
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },
    // Configuration to be run (and then tested).
    dom_munger: {
      test: {
        options: {
            $('#filepath').text('Made from ' + file);
          }
        },
        src: 'test/fixtures/index.html',
      },
      test2: {
        options: {
          read: {selector:'script',attribute:'src',writeto:'test',isPath:true}
        },
        src: 'test/fixtures/index.html'
      },
      test_callback_read: {
        options: {
          callback: function ($, file) {
            return false;
          }
        },
        src: 'test/fixtures/formatted.html'
      },
    write_src: {
      test: {
        src: ['<%= dom_munger.data.links_order %>','<%= dom_munger.data.scripts_order %>']
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');


  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'dom_munger', 'write_src', 'concat', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', [ 'test']);

};
