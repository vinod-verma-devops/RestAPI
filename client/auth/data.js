(function() {

	angular
	.module('meanApp')
	.service('meanData', meanData);
	
	meanData.$inject = ['$http', 'authentication'];
	
	function meanData ($http, authentication) {
	
		var getProfile = function () {
			return $http.get('/api/profileUser', {
				headers: {
					Authorization: 'Bearer '+ authentication.getToken()
				}
			});
		};
	
		return {
			getProfile : getProfile
		};
	}

})();