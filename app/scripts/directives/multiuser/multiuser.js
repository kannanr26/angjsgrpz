'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('groupzApp')
  .directive('multiuser',['$location',function() {
    return {
      templateUrl:'scripts/directives/multiuser/multiuser.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope,$rootScope){
        $scope.multiuser= $rootScope.user.user;
        
        $scope.GetSelectedGroupzCode = function (groupzname) {
          
          alert(groupzname.groupzdetails.groupzcode);
        $rootScope.switchUser(groupzname);
        };      
      }
    }
  }]);
