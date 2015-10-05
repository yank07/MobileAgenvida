angular.module('Agenvida.routes', [])


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  .state('app', {
    url: '/app',
    templateUrl: 'home.html',
    abstract: true,
    controller: 'controllerMarcacion'

  })

  .state('app.marcacion', {
      url: "/marcacion",
      views: {
        'MainContent' :{
          templateUrl: "marcacion.html",
          controller: 'controllerMarcacion'
        }
      }
})

   .state('app.reporte-mensual', {
      url: "/reporte-mensual",
      views: {
        'MainContent' :{
          templateUrl: "reporte-mensual.html",
          controller: 'controllerMarcacion'
        }
      }
})


  .state('app.perfil', {
      url: '/perfil',  

         views: {
        'MainContent' :{
            templateUrl: 'perfil.html',
      controller: 'controllerPerfil'
        }
      }
    

      
    })
   .state('signin', {
      url: '/',
      templateUrl: 'sign-in.html',
      controller: 'controllerLogin'
    })

    .state('configuracion', {
      url: '/configuracion',
      templateUrl: 'configuracion.html',
      controller: 'controllerConfiguracion'
    })

   

    .state('app.contrato-pedagogico', {
      url: '/contrato-pedagogico',

         views: {
        'MainContent' :{
               templateUrl: 'contrato-pedagogico.html',
       controller: 'controllerConfiguracion'
        }
      }
     
     // controller: 'controllerLogin'
    })

   $urlRouterProvider.otherwise('/');






})

