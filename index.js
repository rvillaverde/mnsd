require('./assets/less/index.less');

var angular = require('angular');
var uibs = require('angular-ui-bootstrap');
var _ = require('lodash');

require('angular-translate');
require('marked');
require('angular-marked');
require('ngstorage');

var langEn = require('./assets/js/lang/en.js');
var langEs = require('./assets/js/lang/es.js');
var langIt = require('./assets/js/lang/it.js');

var airtableService = require('./app/services/airtable.service.js');
var newsService = require('./app/services/news.service.js');

var manusdeiApp = angular.module('manusdeiApp', [uibs, 'pascalprecht.translate', 'hc.marked', 'ngStorage']);

var manusdeiController = require('./app/controllers/manusdei.controller.js');
var paragraphsDirective = require('./app/directives/paragraphs.directive.js');

manusdeiApp.controller('manusdeiController', manusdeiController);
manusdeiApp.directive('paragraphs', ['$compile', paragraphsDirective]);

manusdeiApp.service('airtableService', airtableService);
manusdeiApp.service('newsService', newsService);

manusdeiApp.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('es', langEs);

  $translateProvider.translations('en', langEn);
 
  $translateProvider.translations('it', langIt);
 
  $translateProvider.preferredLanguage('es');
  $translateProvider.useSanitizeValueStrategy(null);
}]);

manusdeiApp.filter('keys', function(){
  return function(input){
    if(!angular.isObject(input)){
      throw Error("Usage of non-objects with keylength filter!!")
    }
    return Object.keys(input);
  }
});

window.manusdeiApp = manusdeiApp;

