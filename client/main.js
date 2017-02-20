(function () {
	
	angular.module('meanApp', ['ngRoute']);
	
	function config($routeProvider, $locationProvider) {
	    $routeProvider
		    .when('/', {
		        templateUrl : 'home/home.html',
		        controller: 'homeCtrl',
		        controllerAs: 'vm'
		    })
		    .when('/register', {
		        templateUrl : 'register/register.html',
		        controller: 'registerCtrl',
		        controllerAs: 'vm'
		    })
		    .when('/login', {
		        templateUrl : 'login/login.html',
		        controller: 'loginCtrl',
		        controllerAs: 'vm'
		    })
		    .when('/profile', {
		        templateUrl : 'profile/profile.html',
		        controller: 'profileCtrl',
		        controllerAs: 'vm'
		    })
		    .otherwise({redirectTo: '/'});
	    $locationProvider.html5Mode(true);
	}
	
	function run($rootScope, $location, authentication) {
		$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
			if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
				$location.path('/');
			}
		});
	}
	
	angular
		.module('meanApp')
		.config(['$routeProvider', '$locationProvider', config])
		.run(['$rootScope', '$location', 'authentication', run]);

})();