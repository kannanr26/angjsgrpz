/*
 function createCORSRequest(method, url) {   var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {     // XHR for Chrome/Firefox/Opera/Safari.
xhr.open(method, url, true);   } else if (typeof XDomainRequest !=
"undefined") {     // XDomainRequest for IE.     xhr = new XDomainRequest();
xhr.open(method, url);   } else {     // CORS not supported.     xhr = null;
}   return xhr; }

// Helper method to parse the title tag from the response. function
getTitle(text) {   return text.match('<title>(.*)?</title>')[1]; }

// Make the actual CORS request. function makeCorsRequest() {   // All HTML5
Rocks properties support CORS.   var url = 'http://prod1.groupz.in';

  var xhr = createCORSRequest('GET', url); if (!xhr) { alert('CORS not
  supported'); return; }

  // Response handlers.   xhr.onload = function() {     var text =
xhr.responseText;     var title = getTitle(text); alert('Response from CORS
request to ' + url + ': ' + title);   };

  xhr.onerror = function() { alert('Woops, there was an error making the
  request.'); };

  xhr.send(); }
*/
'use strict';
(function () {
	var groupz=function ($http,configuration) {

		var doLogin= function (userName, password) {
		var url=configuration.groupsWebServices+'/GroupzMobileApp/Authentication?request={"json": {"request": {"servicetype": "21","functiontype": "2019","userdata": {"username": "'+userName+'","password": "'+password+'"},"selection":true}}}';
			return $http.get(url).then(function(res) { return res.data;});
		};

		var getGeography= function (memberid, groupzcode) {
		
		var url=configuration.groupsWebServices+'/GroupzMobileApp/Geography?request={"json": {"request": {"servicetype": "21","functiontype": "2023","memberid": "'+memberid+'","groupzcode": "'+groupzcode+'"}}}';
			return $http.get(url).then(function(res) { return res.data;});
		};

		var getGreetings= function (memberid, groupzcode,groupzlist) {
	/*	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);*/
	var url=configuration.groupsWebServices+'/GroupzMobileApp/Geography?request={ "json": {"request": {"servicetype": "21","functiontype": "2021","memberid":"'+memberid+'","groupzcode": "'+groupzcode+'","date":"2016-01-11 00:00:00","country":"india","state":"_ALL", "city":"_ALL","segment":"_ALL","groupzlist":'+groupzlist+'}}}';
	
	/*var url=configuration.groupsWebServices+'/GroupzMobileApp/Geography?request={ "json": {"request": {"servicetype": "21","functiontype": "2021","memberid": 845,"groupzcode": "SN","date":"2015-12-14 00:00:00","country":"india","state":"_ALL","city":"_ALL","segment":"_ALL","groupzlist":["NSN"]}}}';*/
	/*return $http.get(url).then(function(res) { return res.data;});*/
	return $http.get('greeting.json').then(function(res) { return res.data;});
		};

		return {
			doLogin :doLogin,
			getGeography :getGeography,
			getGreetings:getGreetings
		};

	};
	var module=angular.module("groupzApp");
	module.factory("groupz",groupz);
}());