(function () {

	angular
		.module('meanApp')
		.service('authentication', authentication);

	authentication.$inject = ['$http', '$window'];
	
	// Authentication Function
	function authentication ($http, $window) {
		
		// Store JWT Token on client's local storage
		var saveToken = function (token) {
			$window.localStorage['mean-token'] = token;
		};

		// Retrieve JWT Token from client's local storage
		var getToken = function () {
			return $window.localStorage['mean-token'];
		};
		
		// Check if JWT Token is active or expired (Boolean)
		var isLoggedIn = function() {
			var token = getToken();
			var payload;

			if(token){
				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};
		
		// Retrieve current user's data
		var currentUser = function() {
			if(isLoggedIn()){
				var token = getToken();
				var payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				return {
					email : payload.email,
					name : payload.name
				};
			}
		};
		
		// Call register API endpoint
		register = function(user) {
			return $http.post('/api/users/register', user).success(function(data){
				saveToken(data.token);
			});
		};
		
		// Call login API endpoint
		login = function(user) {
			return $http.post('/api/users/login', user).success(function(data) {
				saveToken(data.token);
			});
		};

		// Call logout API endpoint
		logout = function() {
			$window.localStorage.removeItem('mean-token');
		};

		return {
			currentUser : currentUser,
			saveToken : saveToken,
			getToken : getToken,
			isLoggedIn : isLoggedIn,
			register : register,
			login : login,
			logout : logout
		};
	}

})();