var profileCtrl = function ($scope,$http,$rootScope,$cookieStore,$timeout,AuthenticationService,leaderBoard) {
	$scope.getFantasyTeamDetails = getFantasyTeamDetails;
	$scope.getUserId = getUserId;
	$scope.renameTeamLink = false;
	$scope.renamePasswordLink = false;
	$scope.showTeamName = true;
	$scope.showPassword = true;
	$scope.renameTeam = renameTeam;
	$scope.resetPassword = resetPassword;
	var userId;
	var error = {
		SUCCESS:"Password has been changed successfully",
		SERVICE_FAILURE:"Something went wrong please try again in some time"
	}
	function init(){
		getFantasyTeamDetails();
		getUserId();
		leaderBoard.getLeaderBoard().then(function(data){
          $scope.leaderBoardContent = data;  
        });
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
	$scope.closeError = function(){
		$scope.showError = false;		
	};
	
	function getUserId(){
        userId = $rootScope.teamDetails.userId;
	};
	function getFantasyTeamDetails(){
        $rootScope.teamDetails = $cookieStore.get('teamDetails') || {};
		$scope.teamName = $rootScope.teamDetails.teamName;
	};
	$scope.picUrl = "../images/man.jpg";
	$scope.teamProfilePic = "../images/man.jpg";
	$scope.checker = function(){
		console.log("$scope.picUrl",$scope.picUrl);
		$scope.profilePic = $scope.picUrl;
	};
	$scope.triggerFile = function(){
		$("input[type=file]").click();
	};
	$scope.enableRename = function(){
		$scope.renameTeamLink = true;
		$scope.showTeamName = false;
	};
	$scope.enablePasswordReset = function(){
		$scope.renamePasswordLink = true;
		$scope.showPassword = false;
	};
	//Rename fantasy team
	function renameTeam(){
		var teamId = $rootScope.teamDetails.teamId;
		if($scope.teamName != undefined && $scope.teamName != ""){
			$http({method:'POST',url:URLBASE + "renameFantasyTeam",data:{teamId:teamId,userId:userId,teamName:$scope.teamName}}).success(function(response, status, headers, config) {
				if(response.type == "success"){
					$scope.renameTeamLink = false;
					$scope.showTeamName = true;
					AuthenticationService.SetTeamDetails(userId,teamId,$scope.teamName);
				}
				else{
					errorDisplay(response.message);
				}
			}).error(function(response, status, headers, config) {
				console.log("Failed getFantasyTeam Service call");
				errorDisplay(error.SERVICE_FAILURE);	
			});
		}
		else
			errorDisplay("Please enter a valid team name");
	};
	//Rename fantasy team
	function resetPassword(){
		$http({method:'POST',url:URLBASE + "changePassword",data:{oldPass:$scope.oldPassword,newPass:$scope.newPassword,userId:userId}}).success(function(response, status, headers, config) {	
			if(response.type == "success"){
				errorDisplay(error.SUCCESS);
				$scope.renamePasswordLink = false;
				$scope.showPassword = true;
			}
			else
				errorDisplay("You have entered invalid data");
			}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);	
			});
	};
	$scope.keyPress = function(eventNew){
		if (eventNew.which==13)
    		renameTeam();
	}
	$scope.keyPressPassword = function(eventNew){
		if (eventNew.which==13)
    		resetPassword();
	}
	init();
};
