angular
  .module("Agenvida.controllerLogin", [])
  .controller("controllerLogin", function(
    $scope,
    $state,
    $http,
    $window,
    $rootScope,
    $ionicLoading,
    $translate
  ) {
    if ($window.localStorage.token) {
      $scope.message = "Welcome Ya tengo el token";
    }
    $scope.user = {};

    $scope.user.username = $window.localStorage.username;
    $scope.user.password = $window.localStorage.password;
    $scope.language = $window.localStorage.language;

    $rootScope.idioma = $rootScope.idiomas[1];
    angular.forEach($rootScope.idiomas, function(idioma) {
      if (idioma.codigo === $scope.language) {
        $rootScope.idioma = idioma;
        $translate.use(idioma.codigo);
      }
    });

    if (typeof $scope.user.password === "undefined") {
      $scope.user.password = "";
    }

    $scope.mensajeShow = false;

    $scope.LoadingShow = function() {
      $ionicLoading.show({
        content: "Loading Data",
        animation: "fade-in",
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500
      });
    };
    $scope.LoadingHide = function() {
      $ionicLoading.hide();
    };

    $scope.ChangeLanguage = function(language) {
      //Se guarda solo el codigo del idioma en el localstorage
      $window.localStorage.language = language.codigo;
      $translate.use(language.codigo);
    };

    $scope.signIn = function() {
      if ($scope.user.username != "" && $scope.user.password != "") {
        $scope.LoadingShow();

        $http({
          method: "POST",
          url: $rootScope.domain + "o/token/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:
            "client_id=" +
            $rootScope.client_id +
            "&grant_type=password&username=" +
            $scope.user.username +
            "&password=" +
            $scope.user.password +
            "&client_secret="
        }).then(
          function(result) {
            $window.localStorage.username = $scope.user.username;
            $window.localStorage.password = $scope.user.password;
            $window.localStorage.token = result.data.access_token;
            $window.localStorage.refresh_token = result.data.refresh_token;
            $scope.LoadingHide();
            $scope.message = $translate.instant("success_login");
            $scope.message_lindo = "";
            $scope.color_mensaje = "green";
            $scope.mensajeShow = true;
            $scope.mensajeShow = false;
            $scope.LoadingHide();
            $state.transitionTo("app.marcacion");
          },
          function(result) {
            //Si hay algun error en la autenticacion

            // Erase the token if the user fails to log in
            delete $window.localStorage.token;

            // Handle login errors here
            console.log(result);
            $scope.message = $translate.instant(result.data.error);
            $scope.message_lindo = $translate.instant("auth_error");
            $scope.color_mensaje = "red";
            $scope.mensajeShow = true;
            $scope.LoadingHide();
          }
        );
      } //endif no intrudujo ningun valor
      else {
        $scope.message_lindo = $translate.instant("user_password_message");
        $scope.color_mensaje = "red";
        $scope.mensajeShow = true;
      }
    }; /* FIN DE FUNCION signIn */

    $scope.signup = function() {
      $state.go("signup");
    };

    $scope.forgotPasword = function() {
      $state.go("forgot-password");
    };

    $scope.signIn();
  });
