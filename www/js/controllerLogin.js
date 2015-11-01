angular.module('Agenvida.controllerLogin', [])
.controller('controllerLogin', function($scope, $state, $http ,$window, $rootScope,$ionicLoading) {

 //$rootScope.domain = "http://agenvida.herokuapp.com/";
 //   $scope.domain = "http://localhost:8000/";

 if ( $window.localStorage.token){
  console.log($window.localStorage.token);
   $scope.message = 'Welcome Ya tengo el token';
    console.log($scope.message);
      
   // $state.go('app.marcacion');

 }
 $scope.user = {};

$scope.user.username = $window.localStorage.username;
$scope.user.password = $window.localStorage.password;
if (typeof $scope.user.password === 'undefined'){
  $scope.user.password = '';

}
 $scope.mensajeShow=false;

 //console.log($rootScope.mensaje );

   

  $scope.LoadingShow = function() {
    $ionicLoading.show({
      content: 'Loading Data',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 500
  });
  };
  $scope.LoadingHide = function(){
    $ionicLoading.hide();
  };

  
  
  $scope.signIn = function() {
    //console.log('Sign-In', user);
    //UserService.setUser(user);
    //$state.go('home');
    console.log($scope.user.password );
   
    if($scope.user.username!='' && $scope.user.password != '' ){
    $scope.LoadingShow();
    
   // console.log("client_id=DbSojNBpAXDEQ3CARcrKOpWI3PS8mkI3osJL0jdd&grant_type=password&username="+user.username+"&password="+user.password+"&client_secret=");
    $http({
    method: 'POST',
              url:$rootScope.domain+"o/token/",
              headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                        },
              data:"client_id="+ $rootScope.client_id+"&grant_type=password&username="+$scope.user.username+"&password="+$scope.user.password+"&client_secret="
  })
   .then(function(result){
      //$scope.token = result.data;   
      //console.log("then");
      //TokenService.setToken($scope.token.access_token);
      $window.localStorage.username = $scope.user.username;
    $window.localStorage.password = $scope.user.password;
       $window.localStorage.token = result.data.access_token;
       $window.localStorage.refresh_token = result.data.refresh_token;
       $scope.LoadingHide();
       $scope.message = 'Login Exitoso';
       $scope.message_lindo = ''
       $scope.color_mensaje = "green";
       $scope.mensajeShow=true;

        console.log($scope.message);
      
      $scope.mensajeShow=false;
    
        $scope.LoadingHide();

      $state.transitionTo('app.marcacion');

   },
   function (result){//Si hay algun error en la autenticacion

     // Erase the token if the user fails to log in
        delete $window.localStorage.token;

        // Handle login errors here
        console.log(result);
        $scope.message = result.data.error_description;
        $scope.message_lindo = 'Ocurrió un error de autenticación, favor intertalo nuevamente.'
        $scope.color_mensaje = "red";
        $scope.mensajeShow=true;
        $scope.LoadingHide();


   }
   );
 //$state.go('app.marcacion');
  }//endif
  else{
        $scope.message_lindo = 'Ingresá tu usuario y contraseña';
        $scope.color_mensaje = "red";
        $scope.mensajeShow=true;

  }
};

  $scope.signIn();

  $scope.signup = function(){
    $state.go('signup');
  };

  $scope.forgotPasword = function(){
    $state.go("forgot-password");
  }
});



// TODO REFRESH TOKEN
/*
.
run(function($http, $window) { // instance-injector
  // This is an example of a run block.
  // You can have as many of these as you want.
  // You can only inject instances (not Providers)
  // into run blocks

  $http({
    method: 'POST',
              url:"http://agenvida.herokuapp.com/"+"o/token/",
              headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                        },
              data:"client_id=QlLwYhQoeYx98FzV40a82amX9Ik3HjGtfPNlXHqN&grant_type=refresh_token&refresh_token="+$window.localStorage.refresh_token+"&token_type=Bearer"
  })
  .then(function(result){
      //$scope.token = result.data;   
      //console.log("then");
      //TokenService.setToken($scope.token.access_token);
        $window.localStorage.token = result.data.access_token;
         $window.localStorage.refresh_token = result.data.refresh_token;

//        $scope.message = 'Welcome hice el post y volvi';
       // console.log($scope.message);
      
      
    

     // $state.transitionTo('app.marcacion');

   });


  console.log("estoy en RUn de LOGing");
});*/



