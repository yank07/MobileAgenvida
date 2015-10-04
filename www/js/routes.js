angular.module('Agenvida.routes', [])


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'home.html',
    controller: 'AgenvidaCtrl'

  })

  .state('facts', {
      url: '/facts',  
      templateUrl: 'facts.html'
      
    })
   .state('signin', {
      url: '/sign-in',
      templateUrl: 'sign-in.html',
      controller: 'SignInCtrl'
    })

    $urlRouterProvider.otherwise('/sign-in');






})

