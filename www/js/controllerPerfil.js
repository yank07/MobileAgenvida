angular.module('Agenvida.controllerPerfil', [])
.controller('controllerPerfil', function($scope,$rootScope, $state, $http ,$window, $ionicHistory, $ionicPopup){

// $rootScope.domain = "http://agenvida.herokuapp.com/";




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
    delete $window.localStorage.password;
	$state.go('signin');


}

$scope.verRecordatorioMail = function(){
  console.log("recordatorio-mail");

   $state.go('app.recordatorio-mail');
}

$scope.verNotificaciones = function(){
  console.log("verNotificaciones");

   $state.go('app.notificaciones');
}


$rootScope.LoadingShow();

$http.get($rootScope.domain + "userProfile/").then(function(result){

	$scope.perfil = result.data;


});


$http.get($rootScope.domain + "users/").then(function(result){

	$scope.user = result.data;

	console.log($scope.user);

    $rootScope.LoadingHide();


});

/**********************************************/
/**** Show pop Up de Crear nuevo proposito****/
/*********************************************/
$scope.editar = function(campo) {

	console.log(campo);
 	if (campo == "nacimiento"){
 		$scope.inputType = "date";
 		console.log($scope.perfil.nacimiento);
        if($scope.perfil.nacimiento!=null){

    $scope.nacimiento = $scope.perfil.nacimiento.split("-");
        console.log($scope.nacimiento[0]);
        console.log($scope.nacimiento[1]);
        console.log($scope.nacimiento[2]);
        $scope.nacimiento = new Date($scope.nacimiento[0],$scope.nacimiento[1]-1,$scope.nacimiento[2]);



        }else{
            $scope.nacimiento = new Date(1990,10,18);
        }

        
 	
 		$scope.perfil.nacimiento = $scope.nacimiento;
 		

 	}else{
 		$scope.inputType = "text"
 	}

 		if (campo== "reafirmar" || campo == "adquirir" || campo== "liberar"){

         		$scope.template =   '<textarea ng-model="perfil.'+campo+'" rows="4"></textarea>'

         	}
         	else{
         		$scope.template = '<input type="'+ $scope.inputType  +'" ng-model="perfil.'+ campo +'">'
         	}




   var myPopup = $ionicPopup.show({
     template: $scope.template,
     title: 'Editar ',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       
        {
         text: '<b>Guardar</b>',
         type: 'button-positive',
         onTap: function(e) {

         	if (campo == 'nacimiento'){

         		 $scope.nacimiento = $scope.perfil.nacimiento.getFullYear() + "-" + ($scope.perfil.nacimiento.getMonth()+1) + "-" +  $scope.perfil.nacimiento.getDate(); 
         		// $scope.perfil.nacimiento = $scope.nacimiento ;
         		// console.log($scope.perfil.nacimiento);
         		 data = {nacimiento: $scope.nacimiento  }

         		 $http.put($rootScope.domain + "userProfile/", data).then(function(result){

         		 		$scope.perfil = result.data;
         		 })
         	}


         	else {

         		$http.put($rootScope.domain + "userProfile/", $scope.perfil).then(function(result){

         		 		$scope.perfil = result.data;
         		 })

         	}
            
              
         }
       },
     ]
   }); 

};


$scope.editarUser  = function(campo){
	console.log(campo);

		$scope.template = '<input type="'+ "text" +'" ng-model="user.'+ campo +'">'

	 var myPopup = $ionicPopup.show({
     template: $scope.template,
     title: 'Editar ',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       
        {
         text: '<b>Guardar</b>',
         type: 'button-positive',
         onTap: function(e) {

         	console.log($scope.user);
         

         		$http.put($rootScope.domain + "users/", $scope.user).then(function(result){

         		 		$scope.perfil = result.data;
         		 })

         	
            
              
         }
       },
     ]
   }); 




};


$scope.editarPassword = function(campo){



	$scope.password = {}
	$scope.password.new_password ="";
	$scope.password.current_password ="";


		$scope.template = '<input type="'+ "password" +'" ng-model="password.current_password" placeholder="Contraseña Actual"><br><input type="'+ "password" +'" ng-model="password.new_password" placeholder="Nueva Contraseña">'

	 var myPopup = $ionicPopup.show({
     template: $scope.template,
     title: 'Editar ',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       
        {
         text: '<b>Guardar</b>',
         type: 'button-positive',
         onTap: function(e) {

         	console.log($scope.user);
         

         		$http.post($rootScope.domain + "auth/password/", $scope.password).then(function(result){

         		 		//$scope.perfil = result.data;
         		 })

         	
            
              
         }
       },
     ]
   }); 

}







})