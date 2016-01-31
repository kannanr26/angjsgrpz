'use strict';
/**
 * @ngdoc function
 * @name groupzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the groupzApp
 */
angular.module('groupzApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.bar = {
	    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
		series: ['Series A', 'Series B'],

		data: [
		   [65, 59, 80, 81, 56, 55, 40],
		   [28, 48, 40, 19, 86, 27, 90]
		]
    	
    };


    $scope.bar1 = {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        series: ['Series A', 'Series B'],

        data: [
           [65, 59, 80, 81, 56, 55, 40],
           [28, 48, 40, 19, 86, 27, 90]
        ]
        
    };

}]);