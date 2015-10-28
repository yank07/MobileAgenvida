// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('agenvida', ['ionic','ionic.service.core','ngCordova',
  
  'ionic.service.push','Agenvida.controllerLogin', 'Agenvida.controllerSignUp', 'Agenvida.controllerMarcacion',
 "Agenvida.routes", 'ionic-datepicker', 'DateFilters', 'Agenvida.controllerPerfil', 
 'Agenvida.controllerConfiguracion', 'Agenvida.LoadingCtrl', 'Agenvida.Notifications', 'Agenvida.controllerEvangelio', 'ngSanitize'])

.run( [ '$state', '$rootScope',  function($state,  $rootScope){

  if(window.localStorage.token){

    console.log("en estoy en run y tengo el token");
    console.log(window.localStorage.token);
    $state.go('app.marcacion');

  }
  $rootScope.domain = "";

  //$rootScope.domain = "http://localhost:8000/";


    $rootScope.domain = "http://agenvida.herokuapp.com/"
  //$rootScope.client_id = "DbSojNBpAXDEQ3CARcrKOpWI3PS8mkI3osJL0jdd"; //desarrollo

  $rootScope.client_id = "FCMnar3EJW84jY4Lgsh9GSEgSAY9HGbIzv9vpxsr"; //Produccion

  




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
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: 'de9da7f3',
    api_key: 'f8ff324d5d3685d0ffc8f95198e44f9c1716935b1e60037e',
    dev_push: true
  });
}])



  






