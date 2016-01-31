'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('groupzApp')
  .directive('location',['$location',function() {
    return {
      templateUrl:'scripts/directives/location/location.html',
      restrict: 'E',
      replace: true,
      
      controller:function($scope,$rootScope,groupz,configuration){
	  
      $scope.data = {
        countrySelected: null,
        stateSelected: null,
        citySelected: null,
        option1 : 'India'
       };
      $scope.geographyData=new Object();
      var  groupzCode=$rootScope.selecteduser.groupzdetails.groupzcode;
      var memberId=$rootScope.selecteduser.memberdetails.memberid;
        groupz.getGeography(memberId,groupzCode).then(function(response){
          if(response.json.response.statuscode=='0' && response.json.response.statusmessage=='Success'){
         $scope.geographyData = response.json.response;
           }
         });
         /* $scope.GetSelectedCountry = function (index) {
              index
                $scope.strCountry = document.getElementById("country").value;
            };*/
       
            $scope.GetSelectedCountry = function () {
              
                $scope.strCountry = document.getElementById("country").value;
            };
            $scope.GetSelectedState = function () {
                $scope.strState = document.getElementById("state").value;
            };

      }
    }
  }]);
