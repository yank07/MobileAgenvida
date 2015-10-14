angular.module('Agenvida.controllerSignUp', [])
.controller('controllerSignUp', function($scope, $state, $http ,$window, $rootScope, $ionicLoading) {

$scope.user = {}

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
  $http.post("http://agenvida.herokuapp.com/" + 'usuarios2/', $scope.user).then(function(result){

                                                        $scope.LoadingHide();  
                                                        $window.localStorage.username = $scope.user.username;                  
  														$state.go('signin');

                                                                               },

                                                                               function(){

                                                                               	console.log("hubo un error");
                                                                                $scope.LoadingHide();
                                                                               }




                                                                               );



	} 








	});