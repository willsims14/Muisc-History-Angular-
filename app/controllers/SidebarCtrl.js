"use strict";

app.controller("SidebarCtrl", function($scope, AuthFactory, $window){

	$scope.isLoggedIn = false;


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

});




