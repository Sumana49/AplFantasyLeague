
// Controller Registration

// Initial screen controller
aplapp.controller("indexController",['$scope','$http','$state','leaderBoard','VideoControl','$timeout', 'AuthenticationService', indexController]);

// LeaderBoard Controller
aplapp.controller("leaderController",['$scope','$http','$state','leaderBoard','$rootScope', '$cookieStore', 'AuthenticationService',leaderCtrl]);

// Home Controller
aplapp.controller("homeController",['$scope','$http','$state','AuthenticationService','$filter','$animate', '$rootScope', '$cookieStore', 'VideoControl','$timeout','leaderBoard', homeCtrl]);

// Player Controller
aplapp.controller("playerController",['$scope','$http','$state','$stateParams','AuthenticationService','$animate', '$rootScope', '$cookieStore','$timeout','leaderBoard', playerCtrl]);


// View  Player Details Controller
aplapp.controller("viewPlayerDetailsController",['$scope','$http','$state','AuthenticationService','$animate', '$rootScope', '$cookieStore','$timeout','leaderBoard', viewPlayerDetailsCtrl]);


// Fixture Controller
aplapp.controller("fixtureController",['$scope','$http','$state','$rootScope','$cookieStore','leaderBoard','AuthenticationService', fixtureCtrl]);

// How to play Controller
aplapp.controller("howToPlay",['$scope','$http', '$rootScope', '$cookieStore', 'AuthenticationService','$timeout', howToPlayCtrl]);


// Login Controller
aplapp.controller("loginController",['$scope', '$rootScope', '$location', 'AuthenticationService', loginCtrl]);

// Register Controller
aplapp.controller("registerController",['$scope', '$rootScope', '$location', 'AuthenticationService', registerCtrl]);

// Profile Controller
aplapp.controller("profileController",['$scope','$http','$rootScope','$cookieStore','$timeout', 'AuthenticationService','leaderBoard', profileCtrl]);

// History Controller
aplapp.controller("historyController",['$scope','$http','$state','$rootScope','$cookieStore', 'AuthenticationService','matchService','leaderBoard', historyCtrl]);

// Player History Controller
aplapp.controller("playerHistoryController",['$scope','$http','$state','$rootScope','$cookieStore', 'AuthenticationService','matchService','leaderBoard', playerHistoryCtrl]);

aplapp
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push(['$q', '$location','$cookieStore','$rootScope', function($q, $location,$cookieStore,$rootScope) {
            return {
                'request': function (config) {
                    $rootScope.authToken = $cookieStore.get('authToken') || {};
                    var token = $rootScope.authToken.authToken;
                    config.headers = config.headers || {};
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        }]); 
});
                                     

aplapp.filter('playerFilter', function () {
	function playerSpecification(type,team,impact,filterCategory){
		var flag = false;
		var specification = {allrounder:false, bat:false, bowl:false, team1:false, team2:false, team3: false, team4: false, impact: false};
		if(filterCategory.allrounder)
			specification.allrounder = APL.FILTER_ALL;
		if(filterCategory.bat)
			specification.bat = APL.FILTER_BAT;
		if(filterCategory.bowl)
			specification.bowl = APL.FILTER_BOWL;
		
		if(filterCategory.team1)
			specification.team1 = APL.FILTER_TEAM1;
		if(filterCategory.team2)
			specification.team2 = APL.FILTER_TEAM2;
		if(filterCategory.team3)
			specification.team3 = APL.FILTER_TEAM3;
		if(filterCategory.team4)
			specification.team4 = APL.FILTER_TEAM4;
		
		if(filterCategory.impact)
			specification.impact = APL.FILTER_IMPACT;
		
		if(type == specification.allrounder){
			if(!specification.impact && !impact)
				flag = true;
			else if(specification.impact && !impact)
				flag = true;
		}
		else if(type == specification.bat){
			if(!specification.impact && !impact)
				flag = true;
			else if(specification.impact && !impact)
				flag = true;
		}
		else if(type == specification.bowl){
			if(!specification.impact && !impact)
				flag = true;
			else if(specification.impact && !impact)
				flag = true;
		}
		if(impact && specification.impact)
			flag = true;
		if(flag){
			return flag;
		}
		else{
			if(team == specification.team1)
				flag = true;
			else if(team == specification.team2)
				flag = true;
			else if(team == specification.team3)
				flag = true;
			else if(team == specification.team4)
				flag = true;	
		}
		return flag;
		
	}
    return function (items,filterCategory) {
        var filtered = [];
        angular.forEach(items, function(item) {
			var type,team,impact;
			type=item.playerTypeId;
			team=item.playerAplTeamId;
			impact = item.isImpact;
			var flag = playerSpecification(type,team,impact,filterCategory);
			if(!flag){
				filtered.push(item);
			}
        });
        return filtered;
    };

});
aplapp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
	$stateProvider
	.state('home',{
		url:'/home',
		controller: 'homeController',
		templateUrl: 'pages/home.html'
	})
    .state('dashboard',{
		url:'/',
		controller: 'homeController',
		templateUrl: 'pages/home.html'
	})
	.state('leaderBoard',{
		url:'/leaderBoard',
		controller: 'leaderController',
		templateUrl: 'pages/leaderBoard.html'
	})
	.state('players',{
		url:'/players',
		controller: 'playerController',
		templateUrl: 'pages/players.html',
	})
    .state('login',{
		url:'/login',
		controller: 'loginController',
		templateUrl: 'pages/login.html',
	})
    .state('register',{
		url:'/register',
		controller: 'registerController',
		templateUrl: 'pages/register.html',
	})
	.state('fixtures',{
		url:'/fixtures',
		controller: 'fixtureController',
		templateUrl: 'pages/fixtures.html'
	})
	.state('history',{
		url:'/history',
		controller: 'historyController',
		templateUrl: 'pages/history.html'
	})
	.state('historyLeader',{
		url:'/historyLeader',
		controller: 'historyController',
		templateUrl: 'pages/history.html'
	})
	.state('playerHistory',{
		url:'/playerHistory',
		controller: 'playerHistoryController',
		templateUrl: 'pages/playerHistory.html'
	})
	.state('viewPlayerDetails',{
		url:'/viewPlayerDetails',
		controller: 'viewPlayerDetailsController',
		templateUrl: 'pages/viewPlayerDetails.html'
	})
	.state('howToPlay',{
		url:'/howToPlay',
		controller: 'howToPlay',
		templateUrl: 'pages/howToPlay.html'
	})
	.state('profile',{
		url:'/profile',
		controller: 'profileController',
		templateUrl: 'pages/profile.html'
	});
});

aplapp.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser && $location.path() != '/register') {
                $location.path('/login');
            }
        });
    }]);