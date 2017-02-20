(function () {
	
	angular
		.module('meanApp')
		.controller('navigationCtrl', navigationCtrl);
	
	navigationCtrl.$inject = ['$location','authentication'];
	
	function navigationCtrl($location, authentication) {
		var vm = this;
	
		vm.isLoggedIn = authentication.isLoggedIn();
	
		vm.currentUser = authentication.currentUser();
	
	}
	
})();

(function () {

	angular
		.module('meanApp')
		.directive('navigation', navigation);

	function navigation () {
		return {
			restrict: 'EA',
			templateUrl: 'nav/navigation.html',
			controller: 'navigationCtrl as navvm'
		};
	}

})();
