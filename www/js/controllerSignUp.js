angular.module('Agenvida.controllerSignUp', [])
.controller('controllerSignUp', function($scope, $state, $http ,$window, $rootScope, $ionicLoading) {

$scope.user = {}
$scope.forgot = {}
$scope.mensajeEnviado = false;

	console.log("Crear usuario");

   $scope.LoadingShow = function() {
    $ionicLoading.show({
      template: 'Cargando...'
    });
  };
  $scope.LoadingHide= function(){
    $ionicLoading.hide();
  };


	$scope.crearUsuario= function(){


 $scope.LoadingShow();
		console.log( $scope.user );
  $http.post($rootScope.doamin + 'usuario_create/', $scope.user).then(function(result){

                                                         
                                                        $window.localStorage.username = $scope.user.username; 
                                                        $scope.LoadingHide();                  
  														$state.go('signin');

                                                                               },

                                                                               function(){

                                                                               	console.log("hubo un error");
                                                                                $scope.LoadingHide();
                                                                               }




                                                                               );



	} 


$scope.resetPassword = function(){

console.log($scope.forgot.email);

$http.post($rootScope.doamin + 'auth/password/reset/', $scope.forgot).then(function(result){
  console.log("email enviado");
  $scope.mensajeEnviado = true;
})

}







	});