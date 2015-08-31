var leaderCtrl = function($scope,$http,$state,leaderBoard,$rootScope,$cookieStore,AuthenticationService){
	$scope.getLeaderBoardTeamDetails = getLeaderBoardTeamDetails;
    function init(){
		$scope.dataLoading = true;
        leaderBoard.getLeaderBoard().then(function(data){
		  $scope.dataLoading = false;
          $scope.leaderBoardContent = data;  
        });
    }
	
	function getLeaderBoardTeamDetails(content){
		var teamId = content.teamId;
		var teamName = content.teamName;
		AuthenticationService.SetLeaderBoardTeamDetails(teamId,teamName);
		$rootScope.leaderBoardTeamDetails = $cookieStore.get('leaderBoardTeamDetails') || {};
		$state.go('historyLeader');
	}
    init();
}
