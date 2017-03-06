"use strict";

app.controller("UserCtrl", function($scope, $location, $window, SongStorage, AuthFactory){

	$scope.isLoggedIn = false;

	//run these when controller loads
	$scope.account = {
		email: "",
		password: ""
	};

	firebase.auth().onAuthStateChanged( function(user){
		if (user) {
			$scope.isLoggedIn = true;
			console.log("currentUser logged in", user.j, $scope.isLoggedIn);
			$scope.$apply();
		}else{
			$scope.isLoggedIn = false;
			console.log("currentUser logged in", $scope.isLoggedIn);
			$window.location.href = "#!/login";
		}
	});

	let logout = () => {
		console.log("logout clicked");
		// $scope.isLoggedIn = false;
		AuthFactory.logoutUser()
		.then(function(data){
			console.log("logged out?", data);
			$window.location.url = "#!/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

	//when first loaded, make sure no one is logged in
	if(AuthFactory.isAuthenticated()){
		logout();
	}

	$scope.getSongs = function(SongStorage){
		SongStorage.getFirebaseSongs()
		.then( function(x){
			console.log("X: ", x);
		});
	};

		//setup functions to be available to the app for register, login email/password, and google
	$scope.register = () => {
    	console.log("you clicked register");
	    AuthFactory.createUser({
	    	email: $scope.account.email,
	    	password: $scope.account.password
	    })
	    .then( (userData) => {
	    	console.log("UserCtrl newUser:", userData );
	    	$scope.login();
	    }, (error) => {
	        console.log("Error creating user:", error);
	    });
  	};

  	$scope.login = () => {
    	console.log("you clicked login");
    	AuthFactory
	    .loginUser($scope.account)
	    .then( () => {
	        $window.location.href = "#!/view-music";
	    });
	};

	$scope.loginGoogle = () => {
		console.log("you clicked login with Google");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    	var user = result.user.uid;
	    	console.log("logged in user:", user);
	    	
	    	$scope.$apply();

	    	$location.path("/view-music");
	    	$scope.$apply();
	  	}).catch(function(error) {
	    	// Handle the Errors.
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	var email = error.email;
	    	var credential = error.credential;
	  	});
	};

});