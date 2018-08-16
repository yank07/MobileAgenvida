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
    "monospaced.elastic"
  ])

  .run(function($state, $rootScope, $ionicLoading, $window, $translate) {
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required

      StatusBar.styleDefault();
      StatusBar.backgroundColorByName("blue");
    }
    document.addEventListener("deviceready", function() {
      Keyboard.hideFormAccessoryBar(false);
    });

    if (window.localStorage.token) {
      console.log("en estoy en run y tengo el token");
      console.log(window.localStorage.token);
      $state.go("app.marcacion");
    }

    $rootScope.domain = "";

    // $rootScope.domain = "http://localhost:8000/";

    $rootScope.domain = "http://agenvida.herokuapp.com/";
    //  $rootScope.client_id = "zk31U7ywB3j5cxnEXxnRQGOdf2ksnLHDO4MMdMKe"; //desarrollo

    $rootScope.client_id = "FCMnar3EJW84jY4Lgsh9GSEgSAY9HGbIzv9vpxsr"; //Produccion

    $rootScope.dias_semana = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"];
    $rootScope.meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Agost",
      "Sept",
      "Oct",
      "Nov",
      "Dic"
    ];
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
  })

  .config([
    "$httpProvider",
    "$ionicConfigProvider",
    function($httpProvider, $ionicConfigProvider) {
      $httpProvider.defaults.withCredentials = true;
      $ionicConfigProvider.backButton.text("");
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
