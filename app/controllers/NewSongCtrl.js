"use strict";

app.controller("NewSongCtrl", function($scope, $routeParams, $window, SongStorage, AuthFactory){

	$scope.title = "New Song";
	$scope.btnText = "Add Song";
	$scope.selectedItem = {};



	let user = AuthFactory.getUser();

	$scope.newSong = {
		album: "",
		artist: "",
		genre: "",
		uid: "",
		name: ""
	};


	$scope.addNewSong = function () {
		console.log("User: ", user);
		$scope.newSong.uid = user;

		console.log("ADDING NEW SONG");
        
        SongStorage.postNewSong($scope.newSong)
        .then( function(response){
        	$window.location.href = "#!/view-music";
        });
        $scope.newSong = {};
    };


});