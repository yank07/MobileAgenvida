
angular.module('Agenvida.controllerOraciones',[])
.controller('controllerOraciones', function($scope, $state, $http ,$window,
 $rootScope, $ionicLoading, $sce , $ionicModal, $location, ionicMaterialInk, $timeout) {


	

console.log("EStoy en oraciones");

console.log(typeof $scope.oraciones);
console.log( typeof $window.localStorage.oraciones);

if($location.path() != '/app/oracionDetail'){

	if (typeof $window.localStorage.oraciones == 'undefined') {
				//	console.log("para traer oracion");
				 $rootScope.LoadingShow();
				$http.get($rootScope.domain + 'oraciones/').then(function(result){
						$scope.oraciones = result.data;
					//	console.log(result.data);
						 $rootScope.LoadingHide();	

						 $window.localStorage.oraciones = JSON.stringify(result.data);
						 console.log($scope.oraciones.length);
						 console.log($scope.oraciones);
						  $timeout(function() {
         ionicMaterialInk.displayEffect();
    }, 50);

				},
				function(result){

					 $rootScope.LoadingHide();	
					 $state.go('app.oraciones');

				}



				);
		}
		else{
			$scope.oraciones = JSON.parse( $window.localStorage.oraciones);
		}
}

 

$scope.getOracion = function (id){
	$rootScope.oracionTitulo = "";
	$rootScope.oracionContenido ="";
	$rootScope.LoadingShow();	
	$state.go("app.oracionDetail");
	$http.get($rootScope.domain + 'oraciones/'+id+"/").then(function(result){

		$rootScope.oracionTitulo = result.data.nombre;
		$rootScope.oracionContenido = $sce.trustAsHtml(result.data.contenido);
		$rootScope.LoadingHide();	

		 $timeout(function() {
         ionicMaterialInk.displayEffect();
    }, 50);
		//console.log(result.data)
		 //$scope.modal.show();
		

	})
}




	})



