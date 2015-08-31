var playerCtrl = function($scope,$http,$state,$stateParams,AuthenticationService,$animate,$rootScope,$cookieStore,$timeout,leaderBoard){
	$scope.getUserTeamProfile = getUserTeamProfile;
	$scope.subView  = 'playerController';
	$scope.getUserFantasyTeam = getUserFantasyTeam;
	$scope.errorDisplay = errorDisplay;
	$scope.showError = false;
	$scope.dataLoading = false;
    var fantastyTeamDetails = {};
	var error = {
		SERVICE_FAILURE : "Something went wrong. Please try again in sometime"
	}
    function init(){
		$rootScope.teamDetails = $cookieStore.get('teamDetails') || {};
		fantastyTeamDetails.teamId = $rootScope.teamDetails.teamId;
		fantastyTeamDetails.teamName = $rootScope.teamDetails.teamName;
		$scope.getUserTeamProfile();
    }
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
	// Get User Team
   	function getUserFantasyTeam(){
        var teamId = fantastyTeamDetails.teamId;
        $http({method:'GET',url:URLBASE + "getUserFantasyTeam",params:{teamId:teamId}}).success(function(response) {
			if(response.type == "success"){
                 var data = response.data.teamDetails;
			     $scope.fantasyTeam = data;
				 $scope.dataLoading = false;
            }else{
                $scope.fantasyTeam = [];
				$scope.dataLoading = false;
            }
		}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);
		});
	};
    	// Get profile details
	function getUserTeamProfile(){
        var teamId = fantastyTeamDetails.teamId;
		$scope.dataLoading = true;
        $http({method:'GET',url:URLBASE + "getUserTeamProfile",params:{teamId:teamId}}).success(function(response, status) {
			if(response.type=="success"){
				 $scope.getUserFantasyTeam();
			     $scope.teamProfile = response.data.profileDetails;
                 if($scope.teamProfile != null){
			         if($scope.teamProfile.rank == "Not rated yet")
				        $scope.teamProfile.rank = "-";
                     $scope.dataLoading = false;
                 }else{
                     errorDisplay("There is no team profile to display, pls refresh!!");  
                 }
			}else{
               $scope.teamProfile = []; 
			   $scope.dataLoading = false;
            }
		}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);
		});
	};
    init();
	//Change Squad
	$scope.changeSquad = function(){
		$state.go('home');
	};
	$scope.closeError = function(){
		$scope.showError = false;		
	}
}
