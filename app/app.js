"use strict";

var app = angular.module("MyApp", ["ngRoute"]);

// TODO:
// 	* Filters
// 	* Login/Logout Buttons
// 	* Edit Songs
// 	* MP3s








let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
	console.log("running isAuth");
	AuthFactory.isAuthenticated()
	.then ( (userExists) => {
		console.log("userExists", userExists);
		if (userExists){
      		console.log("Authenticated, go ahead.");
			resolve();
		}else {
      		console.log("Authentication rejected, go away.");
			reject();
		}
	});
});


app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
    }).
    when('/view-music', {
      templateUrl: 'partials/music-list.html',
      controller: 'MusicListCtrl',
      resolve: {isAuth}
    }).
    when('/new-song', {
    	templateUrl: 'partials/new-song.html',
    	controller: "NewSongCtrl",
    	resolve: {isAuth}
    }).
    when('/songs/:songId', {
      templateUrl: 'partials/new-song.html',
      controller: 'EditSongCtrl'
    }).
    otherwise('/');
});

app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
});