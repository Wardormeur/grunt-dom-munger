# grunt-dom-validator

> Read HTML documents using CSS selectors.

Use this task to read and check your HTML documents.  Typical use cases include:

* Test your html usage to framework usage
* Enforce guidelines on front-end side

* v0.1 : initial test to see if it's worth continuing
* v0.2 : change format to independant rules with respect to arrays of functions (see rules folder)
* v0.3 : multiple formatters
* v0.4 : overload of rules & rule priority

Exemple of usage :
```javascript
/**
 * configuration for DOM validator to enforce HTML rules
 * usage cli : grunt dom_validator --src='www/app/send-money/*.html'
 * 						 grunt dom_validator --ruleset='ngmd'
 * @type {Object}
 */
module.exports = function(grunt){
  //doesnt support array it seems
  i_ruleset = grunt.option('ruleset');
  i_src = grunt.option('src');
  //by default, set the ruleset to common & ngmd
  ruleset = i_ruleset? i_ruleset : ['common', 'ngmd'];
  //which files to apply to
  src = i_src ? i_src:'www/app/**/*.html';

  return {
    checkDOM: {
      options: {
        ruleset: ruleset //see test for example of custom exterior ruleset
      },
      src: src
    }
  };
};
```
