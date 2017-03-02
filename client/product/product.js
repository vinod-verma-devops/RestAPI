(function() {

	angular
		.module('meanApp')
		.controller('productCtrl', productCtrl);

	function productCtrl () {
		console.log('Product controller is running');
	}

})();