'use strict';
/**
 * @ngdoc function
 * @name groupzApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the groupzApp
 */
 /*.controller('loginCtrl', ['$scope', '$timeout', function ($scope, $timeout) {*/
angular.module('groupzApp')
  .controller('loginCtrl', ['$scope','groupz', 'visor', '$rootScope', '$cookieStore','configuration', function ($scope,groupz, visor, $rootScope, $cookieStore,configuration) {


$rootScope.switchUser = function (selecteduser) {
      var selectedUserObj = selecteduser;
      $rootScope.selecteduser=selectedUserObj;
      var selectedUser=new Object();
      var groupzDetails= selectedUserObj.groupzdetails;
      var memberDetails=  selectedUserObj.memberdetails;
      selectedUser.chartEnable=true;
      selectedUser.dashboardEnable=true;
      var  groupzCode=selectedUserObj.groupzdetails.groupzcode;
      var memberId=selectedUserObj.memberdetails.memberid;
      visor.setAuthenticated( selectedUserObj);
      
  };
 $scope.login = function () {
        var memberId;
        var groupzCode;
        if($scope.email!=null && $scope.password !=null){
          groupz.doLogin($scope.email,$scope.password).then(function(response){
          if(response.json.response.statuscode=='0' && response.json.response.statusmessage=='Success'){
            var userLength = response.json.response.user.length;
            $rootScope.user = response.json.response;
            $rootScope.functiontype=response.json.response.functiontype;
            $rootScope.servicetype=response.json.response.servicetype;
              if(userLength>1){
                $rootScope.multiuser=true;
              }else{
                  $rootScope.multiuser=false;
                 
                }
                  $rootScope.switchUser($rootScope.user.user[0]);

          }else{
            alert(" Login fails "+response.json.response.statusmessage);
          }
        });
      }
    };
}]);