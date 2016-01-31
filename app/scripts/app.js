'use strict';
/**
 * @ngdoc overview
 * @name groupzApp
 * @description
 * # groupzApp
 *
 * Main module of the application.
 */
angular
  .module('groupzApp', [
    'oc.lazyLoad',
	'visor',
    'ui.router',
	'ngCookies',
    'ui.bootstrap',
    'angular-loading-bar',
	'services.config'
  ])
  .config(['visorProvider','$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','configuration',function (visorProvider,$stateProvider,$urlRouterProvider,$ocLazyLoadProvider,configuration) {
    visorProvider.authenticate = function ($cookieStore, $q, $rootScope) {
			var user = $cookieStore.get("user");
			if (user) {
				$rootScope.user = user;
				return $q.when(user);
			} else {
				return $q.reject(null);
			}
		};
	visorProvider.doOnNotAuthorized = function ($state, restrictedUrl) {
		$state.go("access_denied", {prevUrl: restrictedUrl});
	}
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'groupzApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/multiuser/multiuser.js',
                    'scripts/directives/location/location.js', 
                    'scripts/directives/birthday/birthday.js',
                    'scripts/directives/chart/chart.js'                    ]
                }),
                
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
       /* controller: 'ChartCtrl',*/
        templateUrl:'views/dashboard/home.html',
		restrict: function (user) {
					return !!user
				},
          resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'groupzApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
          }
      })
  .state("access_denied", {
                    templateUrl: "views/access_denied.html",
                    controller: function ($scope, $stateParams) {
                        $scope.prevUrl = $stateParams.prevUrl;
                    },
                    url: "/access_denied?prevUrl"
                })
      
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
        controller:'loginCtrl',
        restrict: function (user) {
          return user === undefined;
        },resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'groupzApp',
                files:['scripts/controllers/loginContoller.js']
            })
          }
          }
    })  
      /*.state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'groupzApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        },
		restrict: function (user) {
					return !!user
				}
    })
*/      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons',
		restrict: function (user) {
					return !!user
				}
    })
      
  }])
  .controller("MainCtrl", function ($scope, $cookieStore, $state, $rootScope, visor) {
            $scope.logout = function () {
                $cookieStore.remove("user");
                $rootScope.user = undefined;
                visor.setUnauthenticated();
                $state.go("login");
            }
        }).run(function ($state, $rootScope) {
            $rootScope.$state = $state;
        });
