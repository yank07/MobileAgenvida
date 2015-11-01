
angular.module('Agenvida.controllerOraciones',[])
.controller('controllerOraciones', function($scope, $state, $http ,$window, $rootScope, $ionicLoading, $sce , $ionicModal) {


 $rootScope.LoadingShow();	

console.log("EStoy en oraciones");
$http.get($rootScope.domain + 'oraciones/').then(function(result){
		$scope.oraciones = result.data;
		console.log(result.data);
		 $rootScope.LoadingHide();	

});



 

$scope.getOracion = function (id){

	$http.get($rootScope.domain + 'oraciones/'+id+"/").then(function(result){

		$rootScope.oracionTitulo = result.data.nombre;
		$rootScope.oracionContenido = $sce.trustAsHtml(result.data.contenido);
		//console.log(result.data)
		 //$scope.modal.show();
		$state.go("app.oracionDetail");

	})
}




	})



