(function () {

	angular
		.module('meanApp')
		.directive('endfooter', endfooter);

	function endfooter () {
		return {
			restrict: 'EA',
			templateUrl: 'footer/footer.html'
		};
	}

})();
