
angular.module('Agenvida.controllerTelefono',[])
.controller('controllerTelefono', function($scope, $state, $http ,$window, $rootScope, $ionicLoading, $sce ) {

$http.get('js/frases.json').then(function(result){
	//console.log(result.data.frases);
	$scope.frases = result.data.frases;
	//$scope.cards = result.data.frases;
	 $scope.cant_frases = result.data.frases.length;
	 $scope.ramdom = Math.floor((Math.random() * $scope.cant_frases) );
	 //console.log($scope.ramdom);

	 $scope.frase_elegida = $scope.frases[$scope.ramdom ];

});



 

$scope.nuevaFrase = function(){

	$scope.ramdom = Math.floor((Math.random() * $scope.cant_frases) );
	 //console.log($scope.ramdom);

	 $scope.frase_elegida = $scope.frases[$scope.ramdom ];


}





	})



