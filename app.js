(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/app/app.coffee":[function(require,module,exports){
require('./ng-app');



},{"./ng-app":"/Users/Trikster/static_sites/DelightSoftSite/src/app/ng-app.coffee"}],"/Users/Trikster/static_sites/DelightSoftSite/src/app/ng-app.coffee":[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('app', ['ngRoute', require('./ui/ui'), require('./tableOfContent')])).name;

ngModule.run([
  '$rootScope', '$location', (function($rootScope, $location) {
    $rootScope.title = '';
    $rootScope.urlStartsWith = (function(s) {
      return $location.path().startsWith(s);
    });
    $rootScope.toggleSidebar = (function() {
      $('body').toggleClass('hide-video');
    });
  })
]);

ngModule.directive('dsCacheContent', [
  '$templateCache', (function($templateCache) {
    return {
      restrict: 'A',
      compile: (function(element, attrs) {
        $templateCache.put(attrs.dsCacheContent, element.html());
      })
    };
  })
]);

ngModule.config([
  '$routeProvider', '$locationProvider', (function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise('/');
  })
]);



},{"./tableOfContent":"/Users/Trikster/static_sites/DelightSoftSite/src/app/tableOfContent.coffee","./ui/ui":"/Users/Trikster/static_sites/DelightSoftSite/src/app/ui/ui.coffee"}],"/Users/Trikster/static_sites/DelightSoftSite/src/app/tableOfContent.coffee":[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('tableOfContent', ['ngRoute'])).name;

ngModule.config([
  '$routeProvider', (function($routeProvider) {
    var setPageTitle;
    setPageTitle = function(pageTitle) {
      return [
        '$rootScope', (function($rootScope) {
          $rootScope.pageTitle = pageTitle;
        })
      ];
    };
    $routeProvider.when('/', {
      templateUrl: '/tmpl/index.html',
      controller: setPageTitle('DelightSoft.ru')
    }).when('/dscommon', {
      templateUrl: '/tmpl/dscommon/index.html',
      controller: setPageTitle('DelightSoft.ru / DSCommon')
    }).when('/dscommon/process', {
      templateUrl: '/tmpl/dscommon/process/index.html',
      controller: setPageTitle('DelightSoft.ru / Процесс DSCommon')
    }).when('/dscommon/server', {
      templateUrl: '/tmpl/dscommon/server/index.html',
      controller: setPageTitle('DelightSoft.ru / DSCommon Сервер')
    }).when('/dscommon/server/code-generation', {
      templateUrl: '/tmpl/dscommon/server/code-generation.html',
      controller: setPageTitle('DelightSoft.ru / Механизм кодогенерации')
    }).when('/dscommon/server/database', {
      templateUrl: '/tmpl/dscommon/server/database.html',
      controller: setPageTitle('DelightSoft.ru / База данных')
    }).when('/dscommon/server/cost', {
      templateUrl: '/tmpl/dscommon/server/cost.html',
      controller: setPageTitle('DelightSoft.ru / Стоимость')
    }).when('/dscommon/server/quality', {
      templateUrl: '/tmpl/dscommon/server/quality.html',
      controller: setPageTitle('DelightSoft.ru / Качество')
    }).when('/dscommon/server/rights-managment', {
      templateUrl: '/tmpl/dscommon/server/rights-managment.html',
      controller: setPageTitle('DelightSoft.ru / Система прав')
    }).when('/dscommon/server/workflow', {
      templateUrl: '/tmpl/dscommon/server/workflow.html',
      controller: setPageTitle('DelightSoft.ru / Реализованы все основные механизмы документооборота')
    }).when('/dscommon/jsapp', {
      templateUrl: '/tmpl/dscommon/jsapp/index.html',
      controller: setPageTitle('DelightSoft.ru / DSCommon JSApp')
    }).when('/projects', {
      templateUrl: '/tmpl/projects/index.html',
      controller: setPageTitle('DelightSoft.ru / Проекты')
    }).when('/projects/autopark', {
      templateUrl: '/tmpl/projects/autopark.html',
      controller: setPageTitle('DelightSoft.ru / Проект: Автопарк')
    }).when('/projects/cms', {
      templateUrl: '/tmpl/projects/cms.html',
      controller: setPageTitle('DelightSoft.ru / Проект: CMS (Content Management System)')
    }).when('/projects/myconomy', {
      templateUrl: '/tmpl/projects/myconomy.html',
      controller: setPageTitle('DelightSoft.ru / Проект: MyConomy - прототип обмена списками покупок')
    }).when('/projects/survey', {
      templateUrl: '/tmpl/projects/survey.html',
      controller: setPageTitle('DelightSoft.ru / Проект: Aнкетирование посетителей')
    }).when('/company', {
      templateUrl: '/tmpl/company.html',
      controller: setPageTitle('DelightSoft.ru / О компании')
    }).when('/contacts', {
      templateUrl: '/tmpl/contacts.html',
      controller: setPageTitle('DelightSoft.ru / Контакты')
    }).when('/test', {
      templateUrl: '/tmpl/test/index.html',
      controller: setPageTitle('DelightSoft.ru / Редактируемая статья')
    });
  })
]);

ngModule.run([
  '$rootScope', (function($rootScope) {
    $rootScope.pageTitle = 'DelightSoft.ru';
  })
]);



},{}],"/Users/Trikster/static_sites/DelightSoftSite/src/app/ui/ui.coffee":[function(require,module,exports){
var ngModule, uiCtrl;

module.exports = (ngModule = angular.module('ui/ui', [])).name;

uiCtrl = ['$rootScope', '$scope', '$http', '$location', '$timeout', (function($rootScope, $scope, $http, $location, $timeout) {})];

ngModule.directive('gallery', [
  (function() {
    return {
      restrict: 'A',
      scope: true,
      link: (function($scope, element, attrs) {
        var i, j, openPhotoSwipe, params, pictures, ref;
        pictures = [];
        if (attrs.gallery) {
          params = $scope.$eval(attrs.gallery);
        }
        for (i = j = 1, ref = params.count + 1; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
          pictures.push({
            src: './images/screenshots/' + params.title + '/screen0' + i + '.jpg',
            w: 1440,
            h: 773
          });
        }
        openPhotoSwipe = (function(index) {
          var gallery, options, pswpElement;
          pswpElement = document.querySelectorAll('.pswp')[0];
          options = {
            index: index,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
          };
          gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pictures, options);
          gallery.init();
        });
        $scope.openPic = (function(index) {
          openPhotoSwipe(index);
        });
      })
    };
  })
]);

ngModule.directive('clickableImg', [
  (function() {
    return {
      restrict: 'A',
      scope: true,
      link: (function($scope, element, attrs) {
        var openPhotoSwipe, params, pictures;
        pictures = [];
        if (attrs.clickableImg) {
          params = $scope.$eval(attrs.clickableImg);
        }
        pictures.push({
          src: attrs.src,
          w: params.width,
          h: params.height
        });
        openPhotoSwipe = (function(index) {
          var gallery, options, pswpElement;
          pswpElement = document.querySelectorAll('.pswp')[0];
          options = {
            index: index,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
          };
          gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pictures, options);
          gallery.init();
        });
        element.on('click', (function() {
          var gallery, options, pswpElement;
          console.log('here');
          pswpElement = document.querySelectorAll('.pswp')[0];
          options = {
            index: 0,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
          };
          gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pictures, options);
          gallery.init();
        }));
      })
    };
  })
]);

ngModule.directive('sidebarFix', [
  (function() {
    return {
      restrict: 'A',
      scope: true,
      link: (function($scope, element, attrs) {
        var calcWidth;
        calcWidth = (function() {
          var headerHeight;
          headerHeight = $('header').innerHeight() - $('.nav').innerHeight();
          $(element).css('height', $(window).innerHeight() - headerHeight);
        });
        $(window).on('resize', calcWidth);
      })
    };
  })
]);

ngModule.directive('toggleMenu', [
  (function() {
    return {
      restrict: 'A',
      scope: true,
      link: (function($scope, element, attrs) {
        element.on('click', (function() {
          $('.nav-small-list').toggleClass('show');
        }));
        $(window).on('resize', (function() {
          if ($(window).width() > 768) {
            $('.nav-small-list').removeClass('show');
          }
        }));
      })
    };
  })
]);



},{}]},{},["./src/app/app.coffee"]);
