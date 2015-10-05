angular.module('Agenvida.controllerLogin', [])
.controller('controllerLogin', function($scope, $state, $http ,$window) {

 $scope.domain = "http://agenvida.herokuapp.com/";
 //   $scope.domain = "http://localhost:8000/";

 if ( $window.localStorage.token){
  console.log($window.localStorage.token);
   $scope.message = 'Welcome Ya tengo el token';
    console.log($scope.message);
      
    $state.go('app.marcacion');

 }
  
  $scope.signIn = function(user) {
    //console.log('Sign-In', user);
    //UserService.setUser(user);
    //$state.go('home');

   // console.log("client_id=DbSojNBpAXDEQ3CARcrKOpWI3PS8mkI3osJL0jdd&grant_type=password&username="+user.username+"&password="+user.password+"&client_secret=");
    $http({
    method: 'POST',
              url:$scope.domain+"o/token/",
              headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                        },
              data:"client_id=QlLwYhQoeYx98FzV40a82amX9Ik3HjGtfPNlXHqN&grant_type=password&username="+user.username+"&password="+user.password+"&client_secret="
  })
   .then(function(result){
      //$scope.token = result.data;   
      //console.log("then");
      //TokenService.setToken($scope.token.access_token);
        $window.localStorage.token = result.data.access_token;

        $scope.message = 'Welcome hice el post y volvi';
        console.log($scope.message);
      
      
    

      $state.transitionTo('marcacion');

   },
   function (result){//Si hay algun error en la autenticacion

     // Erase the token if the user fails to log in
        delete $window.localStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
   }

   );

 //$state.go('app.marcacion');



  };

})