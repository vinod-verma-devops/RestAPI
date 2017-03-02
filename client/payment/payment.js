(function() {

	angular
		.module('meanApp')
		.controller('paymentCtrl', paymentCtrl);

	function paymentCtrl () {
		console.log('Payment controller is running');
	}

})();