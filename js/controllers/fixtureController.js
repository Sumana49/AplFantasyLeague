var fixtureCtrl = function($scope,$http,$state,$rootScope,$cookieStore,leaderBoard,AuthenticationService){
	AuthenticationService.clearMatchFixtureCredentials();
	$scope.getFixtures = getFixtures;
	$scope.lightSlider = lightSlider;
	$scope.getLeadingPlayers = getLeadingPlayers;
	$scope.viewPlayerDetails = viewPlayerDetails;
	$scope.dataLoading = false;
	var error = {
		SERVICE_FAILURE : "Something went wrong. Please try again in sometime"
	}
    function init(){
    	$scope.getFixtures();
		$scope.getLeadingPlayers();
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
	 
    // Get all Fixtures
    function getFixtures(){
		$scope.dataLoading = true;
        $http.get(URLBASE + "getFixtures").success(function(response, status, headers, config) {
			if(response.type == "success"){
				$scope.dataLoading = false;
				$scope.fixtureVenue = response.data[0].matchLocation;
				$scope.fixtureDate = response.data[0].matchDate;
				$scope.fixtureData = response.data;
			}
			else{
				$scope.dataLoading = false;
				$scope.fixtureVenue = "Location";
				$scope.fixtureDate = "Date";
				$scope.fixtureData = [];
			}
		}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);
		});
	};
	
	//Get Leading Players
	function getLeadingPlayers(){
		$http.get(URLBASE + "getLeadingPlayers").success(function(response, status, headers, config) {
			if(response.type == "success"){
				$scope.leadingPlayers = response.data;
			}
			else{
				$scope.leadingPlayers = [];
			}
			lightSlider();
		}).error(function(response, status, headers, config) {
				errorDisplay(error.SERVICE_FAILURE);
		});
	};
	function lightSlider(){
		var slider = $('#scroller-div').lightSlider({
			autoWidth: true,
			loop: true,
			cssEasing: 'ease',
			easing: 'linear',
			speed: 1000
		});
		slider.play();
	};
	
	//Page redirect
	function viewPlayerDetails(content){
		AuthenticationService.storeFixturesMatchDetails(content);
		$state.go('viewPlayerDetails');
	}
    init();
	$scope.closeError = function(){
		$scope.showError = false;		
	};
}

