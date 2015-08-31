var viewPlayerDetailsCtrl = function($scope,$http,$state,AuthenticationService,$animate,$rootScope,$cookieStore,$timeout,leaderBoard){
	$scope.viewPlayerDetails = viewPlayerDetails;
	$scope.players = [];
	$scope.remainingPlayers = [];
	$scope.dataLoading = false;
	var matchDetails;
	var error = {
		SERVICE_FAILURE : "Something went wrong. Please try again in sometime"
	}
	function init(){
		viewPlayerDetails();
	};
	
	//Function show error
	function errorDisplay(errorMessage){
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 1000);
		$scope.showError = true;
		$scope.errorMessage = errorMessage;	
		 $timeout(function(){
             $scope.showError = false;
         }, 5000);
	};
	function getTeamName(teamId){
		if(teamId == 1)
			return "Hurricanes";
		if(teamId == 2)
			return "Scorchers";
		if(teamId == 3)
			return "Strikers";
		if(teamId == 4)
			return "Super Stars";
	}
	function viewPlayerDetails(){
		$rootScope.fixtureMatchDetails = $cookieStore.get('fixtureMatchDetails') || {};
		matchDetails = $rootScope.fixtureMatchDetails;
		$scope.dataLoading = true;
		$scope.matchResult = matchDetails.matchResult;
		$scope.manOfTheMatch = matchDetails.manOfTheMatch;
		$scope.teamOne = getTeamName(matchDetails.teamOneId);
		$scope.teamTwo = getTeamName(matchDetails.teamTwoId);
		$scope.teamOneScore = matchDetails.teamOneScore;
		$scope.teamTwoScore = matchDetails.teamTwoScore;
		$http.get(URLBASE + "getPlayerPointsForTheMatch?matchId="+matchDetails.matchId).success(function(response, status, headers, config) {
			if(response.type == "success"){
				for(var i=0;i<response.data.length;i++){
					if(response.data[i].teamId == matchDetails.teamOneId){
						$scope.players.push(response.data[i]);
					}
					else if(response.data[i].teamId == matchDetails.teamTwoId)
						$scope.remainingPlayers.push(response.data[i]);
				}
			}
			$scope.dataLoading = false;
		}).error(function(response, status, headers, config) {
			$scope.dataLoading = false;
			errorDisplay(error.SERVICE_FAILURE);
		});
	};
	$scope.closeError = function(){
		$scope.showError = false;		
	};
	$scope.backToFixtures = function(){
		AuthenticationService.clearMatchFixtureCredentials();
		$state.go('fixtures');	
	};
	init();
}