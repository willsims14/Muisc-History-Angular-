"use strict";

app.controller("MusicListCtrl", function($scope, $location, $routeParams, AuthFactory, SongStorage){

	$scope.songs = [];

    let user = AuthFactory.getUser();

    SongStorage.getFirebaseSongs(user)
    .then( function(songCollection){
    	console.log("Songs: ", songCollection);
        $scope.songs = songCollection;





        for(var i = 0; i < $scope.songs.length; i++){
        	if($scope.songs[i].genre){
        		// console.log("HAS GENRE: ", $scope.songs[i].genre);
        	}else{
        		$scope.songs[i].genre = "N/A";
        	}
        }
    });

    $scope.selectedSong = $scope.songs.filter( function(song){
            console.log("ItemId: ", song.id);
            console.log("$RouteId: ", $routeParams.songId);
            return song.id === $routeParams.songId;
    })[0];

    $scope.deleteSong = function(songId){
        console.log("Deleting: ", songId);
    
        SongStorage.deleteSongFromFirebase(songId)
        .then( function(response){
            SongStorage.getFirebaseSongs(user)
            .then( function(songCollection){
                $scope.songs = songCollection;
            });
        });  
    };

    $scope.editSong = function(songId){
        console.log("Editing: ", $routeParams.itemId);
        console.log("SongId: ", songId);

        $location.url(`/songs/${songId}`);

    };

});