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

   .state('app.sugerencias', {
      url: "/sugerencias",
      views: {
        'MainContent' :{
          templateUrl: "sugerencias.html",
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
   

    .state('app.configuracion', {
      url: '/configuracion',
       views: {
        'MainContent' :{
     templateUrl: 'configuracion.html',
      controller: 'controllerPerfil'
        }}
     
    })

   

    .state('app.contrato-pedagogico', {
      url: '/contrato-pedagogico',

         views: {
        'MainContent' :{
               templateUrl: 'contrato-pedagogico.html',
       controller: 'controllerPerfil'
        }
      }
     
     // controller: 'controllerLogin'
    })

     .state('app.evangelio', {
      url: '/evangelio',

         views: {
        'MainContent' :{
               templateUrl: 'evangelio.html',
              controller: 'controllerEvangelio'
        }
      }
     
     // controller: 'controllerLogin'
    })




    .state('signin', {
      url: '/',
      templateUrl: 'sign-in.html',
      controller: 'controllerLogin',
      onEnter: function($state){
        if(window.localStorage.token){
          console.log("Estoy en Routes SignIn");
          console.log(window.localStorage.token);

           $state.go('app.marcacion');
        }
    }
    })


    .state('signup', {
      url: '/signup',
      templateUrl: 'sign-up.html',
      controller: 'controllerSignUp'
 
    })

     .state('forgot-password', {
      url: '/forgot-password',
      templateUrl: 'forgot-password.html',
      controller: 'controllerSignUp'
 
    })

    


     

   $urlRouterProvider.otherwise('/');






})

