// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var agenvidaApp = angular
  .module("agenvida", [
    "ionic",

    "ngCordova",
    "Agenvida.controllerLogin",
    "Agenvida.controllerSignUp",
    "Agenvida.controllerMarcacion",
    "Agenvida.routes",
    "ionic-datepicker",
    "DateFilters",
    "Agenvida.controllerPerfil",
    "Agenvida.controllerConfiguracion",
    "Agenvida.controllerNotifications",
    "Agenvida.LoadingCtrl",
    "Agenvida.controllerEvangelio",
    "Agenvida.controllerReporte",
    "Agenvida.controllerTelefono",
    "Agenvida.controllerOraciones",
    "Agenvida.focusMe",
    "pascalprecht.translate", // Translate
    "ngSanitize",
    "ionic-material",
    "ionic-timepicker",
    "monospaced.elastic",
    "ion-floating-menu"
  ])

  .run(function($state, $rootScope, $ionicLoading, $window, $translate, $http) {
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required

      StatusBar.styleDefault();
      StatusBar.backgroundColorByName("blue");
    }
    document.addEventListener("deviceready", function() {
      Keyboard.hideFormAccessoryBar(false);
      //Keyboard.KeyboardResizeMode('ionic');
    });

    // $rootScope.domain = "http://localhost:8000/";

    $rootScope.domain = "http://agenvida.com/";
    //  $rootScope.client_id = "zk31U7ywB3j5cxnEXxnRQGOdf2ksnLHDO4MMdMKe"; //desarrollo

    $rootScope.client_id = "FCMnar3EJW84jY4Lgsh9GSEgSAY9HGbIzv9vpxsr"; //Produccion

    $rootScope.meses_num = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    var hoy = new Date();
    var anhoInicio = 2014;
    var anhoActual = hoy.getFullYear();
    $rootScope.anos = [];
    while (anhoInicio <= anhoActual) {
      $rootScope.anos.push(anhoInicio.toString());
      anhoInicio += 1;
    }

    /* Posibles Idiomas */
    $rootScope.idiomas = [
      {
        name: "Español",
        codigo: "es"
      },
      {
        name: "English",
        codigo: "en"
      },
      {
        name: "Deutsch",
        codigo: "de"
      },
      {
        name: "Italiano",
        codigo: "it"
      }
    ];

    var lenguage = $window.localStorage.language;
    if (lenguage) {
      $translate.use(lenguage);
    }

    $rootScope.LoadingShow = function() {
      $ionicLoading.show({
        template:
          '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
      });
    };
    $rootScope.LoadingHide = function() {
      $ionicLoading.hide();
    };

    $rootScope.$on("$translateChangeSuccess", function() {
      console.log("IDIOMA CAMBIADO");
      loadVariables();
    });

    $rootScope.updateTranslations = loadVariables;
    $rootScope.updateTranslationsSuccess = function(translations) {
      $rootScope.meses = [
        translations.enero,
        translations.febrero,
        translations.marzo,
        translations.abril,
        translations.mayo,
        translations.junio,
        translations.julio,
        translations.agosto,
        translations.septiembre,
        translations.octubre,
        translations.noviembre,
        translations.diciembre
      ];
    };

    loadVariables($rootScope.updateTranslationsSuccess);

    function loadVariables(updateTranslationsSuccess) {
      $translate([
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ]).then(updateTranslationsSuccess, function(translationIds) {
        console.log(translationIds);
      });

      $rootScope.dias_semana = [
        $translate.instant("domingo").substring(0, 3),
        $translate.instant("lunes").substring(0, 3),
        $translate.instant("martes").substring(0, 3),
        $translate.instant("miercoles").substring(0, 3),
        $translate.instant("jueves").substring(0, 3),
        $translate.instant("viernes").substring(0, 3),
        $translate.instant("sabado").substring(0, 3)
      ];
    }
  })

  .config([
    "$httpProvider",
    "$ionicConfigProvider",
    function($httpProvider, $ionicConfigProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
      //delete $httpProvider.defaults.xsrfHeaderName;
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $ionicConfigProvider.backButton.text("");

      //$ionicConfigProvider.scrolling.jsScrolling(false);
    }
  ])

  .factory("authInterceptor", function($rootScope, $q, $window, $injector) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
          config.headers.Authorization = "Bearer " + $window.localStorage.token;
        }
        return config;
      },
      response: function(response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
          delete $window.localStorage.token;
          delete $window.localStorage.password;
          $injector
            .get("$ionicHistory")
            .clearCache()
            .then(function() {
              $injector.get("$state").go("signin");
            });
        }
        return response || $q.when(response);
      }
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  })

  .filter("capitalize", function() {
    return function(input) {
      return input
        ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase()
        : "";
    };
  });
