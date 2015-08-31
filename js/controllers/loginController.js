
var loginCtrl = function ($scope, $rootScope, $location, AuthenticationService) {   
	$scope.login = login;
	   // reset login status
        AuthenticationService.ClearCredentials();
        function login() {
			$scope.dataLoading = true;
			AuthenticationService.Login($scope.username, $scope.password, function(response) {
				lresp = response;
				if(response.type=="success") {
					AuthenticationService.SetCredentials($scope.username, $scope.password);
					if(response.data.teamsOwned.length > 0){
						var teamId = response.data.teamsOwned[0].teamId || "";
						var teamName = response.data.teamsOwned[0].teamName || "";
						AuthenticationService.SetTeamDetails(response.data.userId,teamId,teamName);
                        AuthenticationService.SetAuthToken(response.data.authToken || "");
					}else{
						AuthenticationService.SetTeamDetails(response.data.userId,"","");
					}   
					$location.path('/');
				} else {
					$(".form-group input").addClass("border");
					$scope.dataLoading = false;
				}
			});
        };
	
	//Remove border
	$scope.removeBorder = function(){
		$(".form-group input").removeClass("border");
	}
};
