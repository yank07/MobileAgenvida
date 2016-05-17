
angular.module('Agenvida.controllerTelefono',[])
.controller('controllerTelefono', function($scope, $state, $http ,$window, 
	$rootScope, $ionicLoading, $sce,$cordovaSocialSharing, ionicMaterialMotion , ionicMaterialInk) {

$http.get('js/frases.json').then(function(result){
	//console.log(result.data.frases);
	$scope.frases = result.data.frases;
	//$scope.cards = result.data.frases;
	 $scope.cant_frases = result.data.frases.length;
	 $scope.ramdom = Math.floor((Math.random() * $scope.cant_frases) );
	 //console.log($scope.ramdom);

	 $scope.frase_elegida = $scope.frases[$scope.ramdom ];

	 ionicMaterialInk.displayEffect();

});

$scope.shareAnywhere = function() {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "http://agenvida.com/static/img/icono.png", "http://agenvida.com/");
    }
 
$scope.shareViaTwitter = function(message, image, link) {
$cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
    $cordovaSocialSharing.shareViaTwitter(message, image, link);
}, function(error) {
    alert("Cannot share on Twitter");
});
}



$scope.shareViaFacebook =  function(message, image, link) {


$cordovaSocialSharing.shareViaFacebook("mensaje", "http://agenvida.com/static/img/icono.png", "http://agenvida.com/")
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

}



$scope.shareViaWhatsapp =  function(message, image, link) { 

 $cordovaSocialSharing
    .shareViaWhatsApp("mensaje", "http://agenvida.com/static/img/icono.png", "http://agenvida.com/")
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });


}

 

$scope.nuevaFrase = function(){

	$scope.ramdom = Math.floor((Math.random() * $scope.cant_frases) );
	 //console.log($scope.ramdom);

	 $scope.frase_elegida = $scope.frases[$scope.ramdom ];


}





	})



