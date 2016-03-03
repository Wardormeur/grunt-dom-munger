'use strict';

var grunt = require('grunt'),
    exec = require('child_process').exec;
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.dom_validator = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  //As of v0.1 we don't have support for return error code,
  //so that we test over the "final string" value
  //TODO : separate use case instead of looking for strings
  nb_issue: function(test) {
    var expected = 11;
    test.expect(1);
    exec('grunt dom_validator:common --verbose', null, function(error, stdout) {
      var found = stdout.indexOf(expected + ' violations found');
      test.equal(
        found > -1,
        true,
        'Adjust number of test-cases, expected ' + expected
      );
      test.done();
    });
  },
  //
  support_function: function(test){
    test.expect(1);
    exec('grunt dom_validator:testFunction --verbose', null, function(error, stdout) {
      var count = (stdout.match(/Error/g) || []).length;
      var failing = stdout.indexOf('<a id="error"></a>');
      test.equal(
        count === 1 && failing > -1,
        true,
        'Test support_function failed'
      );
      test.done();
    });
  },
  //
  support_jquery_selector_attr: function(test){
    //attr
    test.expect(1);
    exec('grunt dom_validator:testSelectorAttr --verbose', null, function(error, stdout) {
      var count = (stdout.match(/Error/g) || []).length;
      var countDefinedEmpty = (stdout.match(/defined empty/g) || []).length;
      var countSpecificEmpty = (stdout.match(/specific empty/g) || []).length;
      var countSpecificUnexpected = (stdout.match(/specific unexpected/g) || []).length;
      console.log(count + '' + countDefinedEmpty + ''+ countSpecificEmpty + '' +countSpecificUnexpected);
      test.equal(
        count === 5 &&
        countDefinedEmpty === 2 &&
        countSpecificEmpty === 2 &&
        countSpecificUnexpected === 1,
        true,
        'Test support_jquery_selector_attr failed'
      );
      test.done();
    });

  },
  //
  // support_jquery_selector_parent: function(test){
  //   //parent
  //   //attr
  //   test.expect(1);
  //   exec('grunt dom_validator:testSelectorParent --verbose', null, function(error, stdout) {
  //     var found = stdout.indexOf('Error found for selector "*" in file test/common/common.html for rule "style"');
  //     test.equal(
  //       found > -1,
  //       true,
  //       'Test support_function failed'
  //     );
  //     test.done();
  //   });
  // },
};
