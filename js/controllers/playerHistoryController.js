var playerHistoryCtrl = function($scope,$http,$state,$rootScope,$cookieStore,AuthenticationService,matchService,leaderBoard){
	$scope.getTeamPlayersHistory = getTeamPlayersHistory;
	$scope.dataLoading = false;
	var key;
	var error = {
		SERVICE_FAILURE : "Something went wrong. Please try again in sometime"
	}
    function init(){
		getTeamPlayersHistory();
    }
    init();
	
	//Function show error
	function errorDisplay(errorMessage){
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 1000);
		$scope.showError = true;
		$scope.errorMessage = errorMessage;	
		 $timeout(function(){
             $scope.showError = false;
			 $scope.captain = "captain-logo";
         }, 5000);
	};
	
	// Get User Team
   	function getTeamPlayersHistory(){
		var teamDetails = matchService.getMatchIdDetails();
		key = teamDetails.key;
		$scope.dataLoading = true;
        $http({method:'GET',url:URLBASE + "getTeamPlayersHistory",params:{teamId:teamDetails.teamId,matchId:teamDetails.matchId}}).success(function(response) {
			if(response.type == "success"){
                 var data = response.data.teamDetails;
			     $scope.fantasyTeamHistory = data;
				 $scope.dataLoading = false;
            }else{
                $scope.fantasyTeamHistory = [];
				$scope.dataLoading = false;
            }
		}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);
		});
	};
	$scope.backToHistory =function(){
		if(key)
			$state.go('historyLeader');
		else	
			$state.go('history');
	}
	$scope.closeError = function(){
		$scope.showError = false;		
	}
}
