(function() {

	angular
		.module('meanApp')
		.controller('checkoutCtrl', checkoutCtrl);

	function checkoutCtrl () {
		console.log('Checkout controller is running');
	}

})();