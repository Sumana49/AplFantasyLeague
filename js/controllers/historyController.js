var historyCtrl = function($scope,$http,$state,$rootScope,$cookieStore,AuthenticationService,matchService,leaderBoard){
	$scope.getRecentMatchHistory = getRecentMatchHistory;
	$scope.getLeaderBoardCredentials = getLeaderBoardCredentials;
	$scope.dataLoading = false;
	$scope.isFromLeaderBoard = false;
	var leaderBoardCredentials,teamId,key;
	var error = {
		SERVICE_FAILURE : "Something went wrong. Please try again in sometime"
	}
    function init(){
		getRecentMatchHistory();
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
	function getLeaderBoardCredentials(){
		$rootScope.leaderBoardTeamDetails = $cookieStore.get('leaderBoardTeamDetails') || {};
		leaderBoardCredentials = $rootScope.leaderBoardTeamDetails;
	}
	
	function getRecentMatchHistory(){
		getLeaderBoardCredentials();
		if(Object.keys(leaderBoardCredentials).length == 0){
			$rootScope.teamDetails = $cookieStore.get('teamDetails') || {};
        	teamId = $rootScope.teamDetails.teamId || "";
			$scope.teamName = $rootScope.teamDetails.teamName || "";
			key = false;
		}
		else{
			teamId = leaderBoardCredentials.teamId;
			$scope.teamName = leaderBoardCredentials.teamName || "";
			$scope.isFromLeaderBoard = true;
			key = true;
		}
		$scope.dataLoading = true;
		$http.get(URLBASE + "getRecentMatchHistory?teamId="+teamId).success(function(response) {
            if(response.type == "success"){
				$scope.historyData = response.data;
				$scope.dataLoading = false;
			}
			else{
				$scope.historyData = [];
				$scope.dataLoading = false;
			}
		}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);
		});
	};
	$scope.viewPlayerHistory = function(content){
		matchService.putMatchIdDetails(content.matchId,teamId,key);
		$state.go('playerHistory');
	};
	$scope.backToLeaderBoard = function(){
		AuthenticationService.clearLeaderBoardCredentials();
		$state.go('leaderBoard');
	}
	$scope.closeError = function(){
		$scope.showError = false;		
	};
}
