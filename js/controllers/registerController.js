
var registerCtrl = function ($scope, $rootScope, $location, AuthenticationService) {
	$scope.errorMesssageDisplay = false;
	$scope.emailRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@(avnet)(\.com)$/i;
        // reset login status
        AuthenticationService.ClearCredentials(); 
        $scope.register  = function () { 
			if($scope.username != undefined){
				$scope.dataLoading = true;
				AuthenticationService.Register($scope.username, $scope.password, function(response) {
					rres=response;
					if(response.type=="success") {
						AuthenticationService.SetCredentials($scope.username, $scope.password);
						AuthenticationService.SetTeamDetails(response.data.userId,"","");
						AuthenticationService.SetAuthToken(response.data.authtoken || "");
						$location.path('/');
					} else {
						$scope.errorMesssageDisplay = true;
						$scope.error = response.message;
						$(".form-group input").addClass("border");
						$scope.dataLoading = false;
					}
				});
			}
			else{
				$scope.errorMesssageDisplay = true;
				$scope.error = "Invalid email!!";
			}				
        };
	//Remove border
    $scope.removeBorder = function(){
		$(".form-group input").removeClass("border");
	}
};
