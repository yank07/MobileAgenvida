angular
  .module("Agenvida.routes", [])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state("app", {
        url: "/app",
        templateUrl: "home.html",
        abstract: true,
        controller: "controllerMarcacion"
      })

      .state("app.marcacion", {
        url: "/marcacion",
        views: {
          MainContent: {
            templateUrl: "marcacion.html",
            controller: "controllerMarcacion"
          }
        }
      })

      .state("app.reporte-mensual", {
        url: "/reporte-mensual",
        views: {
          MainContent: {
            templateUrl: "reporte-mensual.html",
            controller: "controllerReporte"
          }
        }
      })

      .state("app.sugerencias", {
        url: "/sugerencias",
        views: {
          MainContent: {
            templateUrl: "sugerencias.html",
            controller: "controllerMarcacion"
          }
        }
      })

      .state("app.perfil", {
        url: "/perfil",

        views: {
          MainContent: {
            templateUrl: "perfil.html",
            controller: "controllerPerfil"
          }
        },
        params: {
          ideal: false
        }
      })

      .state("app.configuracion", {
        url: "/configuracion",
        views: {
          MainContent: {
            templateUrl: "configuracion.html",
            controller: "controllerPerfil"
          }
        }
      })
      .state("app.recordatorio-mail", {
        url: "/recordario-mail",
        views: {
          MainContent: {
            templateUrl: "recordatorio-mail.html",
            controller: "controllerPerfil"
          }
        }
      })

      .state("app.notificaciones", {
        url: "/notificaciones",
        views: {
          MainContent: {
            templateUrl: "notificaciones.html",
            controller: "controllerNotifications"
          }
        }
      })

      .state("app.contrato-pedagogico", {
        url: "/contrato-pedagogico",

        views: {
          MainContent: {
            templateUrl: "contrato-pedagogico.html",
            controller: "controllerPerfil"
          }
        }

        // controller: 'controllerLogin'
      })

      .state("app.evangelio", {
        url: "/evangelio",

        views: {
          MainContent: {
            templateUrl: "evangelio.html",
            controller: "controllerEvangelio"
          }
        }

        // controller: 'controllerLogin'
      })

      .state("app.telefono", {
        url: "/telefono",

        views: {
          MainContent: {
            templateUrl: "telefono.html",
            controller: "controllerTelefono"
          }
        }

        // controller: 'controllerLogin'
      })

      .state("app.oraciones", {
        url: "/oraciones",

        views: {
          MainContent: {
            templateUrl: "oraciones.html",
            controller: "controllerOraciones"
          }
        }

        // controller: 'controllerLogin'
      })

      .state("app.oracionDetail", {
        url: "/oracionDetail",

        views: {
          MainContent: {
            templateUrl: "oracionDetail.html",
            controller: "controllerOraciones"
          }
        }

        // controller: 'controllerLogin'
      })

      .state("signin", {
        url: "/",
        templateUrl: "sign-in.html",
        controller: "controllerLogin",
        cache: false
      })

      .state("signup", {
        url: "/signup",
        templateUrl: "sign-up.html",
        controller: "controllerSignUp"
      })

      .state("forgot-password", {
        url: "/forgot-password",
        templateUrl: "forgot-password.html",
        controller: "controllerSignUp"
      });

    $urlRouterProvider.otherwise("/");
  });
