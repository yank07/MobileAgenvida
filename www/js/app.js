// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('agenvida', ['ionic','Agenvida.controllerLogin', 'Agenvida.controllerSignUp', 'Agenvida.controllerMarcacion',
 "Agenvida.routes", 'ionic-datepicker', 'DateFilters', 'Agenvida.controllerPerfil', 'Agenvida.controllerConfiguracion', 'Agenvida.LoadingCtrl'])

.run( [ '$state',  function($state){

  if(window.localStorage.token){

    console.log("en estoy en run y tengo el token");
    console.log(window.localStorage.token);
    $state.go('app.marcacion');

  }




}])



.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])


.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});




  






