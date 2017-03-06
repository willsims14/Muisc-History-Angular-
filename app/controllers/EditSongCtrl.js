"use strict";

app.controller("EditSongCtrl", function($scope, $routeParams, $location, SongStorage, AuthFactory){
	let user = AuthFactory.getUser();

	$scope.title = "Edit Song";
	$scope.btnText = "Edit Song";
	$scope.selectedItem = {};

	SongStorage.getSingleSong($routeParams.songId)
	.then( function(songDetails){
		console.log("SongDetails: ", songDetails);
		$scope.newSong = songDetails;
	});


	$scope.addNewSong = function(){
		SongStorage.updateSong($routeParams.songId, $scope.newSong)
		.then( function(){
			console.log("UPDATED SONG");
			$location.url('/view-music');
		});
	};






});