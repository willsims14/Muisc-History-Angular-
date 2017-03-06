"use strict";

app.factory("SongStorage", function(FBCreds, AuthFactory, $q, $http){

	let getFirebaseSongs = function(){
		let songs = [];
		let user = AuthFactory.getUser();

		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/songs.json?orderBy="uid"&equalTo="${user}"`)
			.then((songObject) => {
				let songCollection = songObject.data;
				Object.keys(songCollection).forEach((key) => {
					songCollection[key].id = key;
					songs.push(songCollection[key]);
				});
				console.log("Songs: ", songs);
				resolve(songs);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let getSingleSong = function(songId){
		return $q(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/songs/${songId}.json`)
			.then( function(songObj){
				resolve(songObj.data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let postNewSong = (newSong) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/songs.json`, JSON.stringify(newSong))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let deleteSongFromFirebase = (songId) => {
		console.log("DELETING: ", songId);

		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/songs/${songId}.json`)
			.then((objectFromFirebase) => {
				resolve(objectFromFirebase);
			});
		});

	};

	let updateSong = (songId, editedSong) => {

		console.log("AngularJSON:    ", angular.toJson(editedSong));
		console.log("JSON.Stringify: ", JSON.stringify(editedSong));

		return $q(function(resolve, reject){
			$http.patch(`${FBCreds.databaseURL}/songs/${songId}.json`, 
				angular.toJson(editedSong))
			.then( function(ObjectFromFirebase){
				resolve(ObjectFromFirebase);
			})
			.catch( function(error){
				reject(error);
			});
		});
	};




	return {getFirebaseSongs, getSingleSong, postNewSong, deleteSongFromFirebase, updateSong};

});