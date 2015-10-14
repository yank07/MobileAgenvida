angular.module('Agenvida.controllerPerfil', [])
.controller('controllerPerfil', function($scope, $state, $http ,$window, $ionicHistory){

 $scope.domain = "http://agenvida.herokuapp.com/";

$scope.goMarcacion = function(){
	$state.go('marcacion');

};

$scope.goConfiguracion = function() {
	console.log("go configuracion");
	$state.go('app.configuracion');
};


$scope.goContratoPedagogico = function(){
	
	console.log("contrato-pedagogico");
	$state.go('app.contrato-pedagogico');

};

$scope.cerraSesion = function (){

	delete $window.localStorage.token;
	$state.go('signin');


}


//console.log($ionicHistory.viewHistory());





})