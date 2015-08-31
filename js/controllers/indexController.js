var indexController = function($scope,$http,$state,leaderBoard,VideoControl,$timeout,AuthenticationService){	
    $scope.videoPause = true;
	$scope.videoMute = true;
    $scope.playVideo = playVideo;
    $scope.pauseVideo = pauseVideo;    
    $scope.muteVideo = muteVideo;
    $scope.unmuteVideo = unmuteVideo;
	$scope.showLogoutOptions = false;
    function init(){
		$scope.headerOnscroll = true;
        leaderBoard.getLeaderBoard().then(function(data){
          $scope.leaderBoardContent = data;  
        });
    }
	$scope.clearHistory = function(){
		AuthenticationService.clearLeaderBoardCredentials();
		console.log("inside index");
		/*leaderBoard.getRecentMatchHistory().then(function(data){
			console.log("data",data);
          $scope.historyData = data;  
        });*/
	}
    init();
    function playVideo(){
        VideoControl.play();
		$scope.videoPause = true;
		$scope.videoPlay = false;
    };
    function pauseVideo(){
        VideoControl.pause();
		$scope.videoPause = false;
		$scope.videoPlay = true;
    };
    function muteVideo(){
		VideoControl.mute();
		$scope.videoMute = false;
		$scope.videoUnmute = true;
	};
	function unmuteVideo(){
		VideoControl.unmute();
		$scope.videoMute = true;
		$scope.videoUnmute = false;
	};
	$scope.showLogoutMenu = function(){
		 $scope.showLogoutOptions = true;
		 $timeout(function(){
             $scope.showLogoutOptions = false;
         }, 3000);
	};
};