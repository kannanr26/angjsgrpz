'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('groupzApp')
  .directive('birthday',['$location',function() {
    return {
      templateUrl:'scripts/directives/birthday/birthday.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope,$rootScope,groupz,configuration){
	  
      $scope.greetingData=new Object();
      var memberid=$rootScope.selecteduser.memberdetails.memberid;
      var groupzcode=$rootScope.selecteduser.groupzdetails.groupzcode;
      var grolist='["'+$rootScope.selecteduser.memberdetails.selection.groupzlist[0].groupzcode+'"]';
         groupz.getGreetings(memberid,groupzcode,grolist).then(function(response){
          if(response.json.response.statuscode=='0' && response.json.response.statusmessage=='Success'){
            $scope.greetingData =response.json.response;
          }else{
              alert(" Greetings fails "+response.json.response.statusmessage);
          }
        });
    /*
            $scope.GetSelectedCountry = function (index) {
              index
                $scope.strCountry = document.getElementById("country").value;
            };
            $scope.GetSelectedState = function () {
                $scope.strState = document.getElementById("state").value;
            };
*/
      }
    }
  }]);
