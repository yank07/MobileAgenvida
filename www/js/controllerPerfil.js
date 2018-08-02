angular
  .module("Agenvida.controllerPerfil", [])
  .controller("controllerPerfil", function(
    $scope,
    $rootScope,
    $state,
    $http,
    $window,
    $ionicHistory,
    $ionicPopup,
    $translate,
    ionicMaterialInk,
    ionicMaterialMotion,
    $timeout
  ) {
    // $rootScope.domain = "http://agenvida.herokuapp.com/";
    var formatearNacimiento = function(nacimiento) {
      if (nacimiento !== null) {
        var nacimientoFormateado = nacimiento.split("-");
        return new Date(
          nacimientoFormateado[0],
          nacimientoFormateado[1] - 1,
          nacimientoFormateado[2]
        );
      } else {
        return new Date(1990, 10, 18);
      }
    };

    var deformatearNacimiento = function(nacimiento) {
      if (nacimiento !== null) {
        return (
          nacimiento.getFullYear() +
          "-" +
          (nacimiento.getMonth() + 1) +
          "-" +
          nacimiento.getDate()
        );
      } else {
        return "1990-10-18";
      }
    };

    $scope.goMarcacion = function() {
      $state.go("marcacion");
    };

    $scope.goConfiguracion = function() {
      console.log("go configuracion");
      $state.go("app.configuracion");
    };

    $scope.goContratoPedagogico = function() {
      console.log("contrato-pedagogico");
      $state.go("app.contrato-pedagogico");
    };

    $scope.cerraSesion = function() {
      delete $window.localStorage.token;
      delete $window.localStorage.password;
      $ionicHistory.clearCache().then(function() {
        $state.go("signin");
      });
    };

    $scope.verRecordatorioMail = function() {
      console.log("recordatorio-mail");

      $state.go("app.recordatorio-mail");
    };

    $scope.verNotificaciones = function() {
      console.log("verNotificaciones");

      $state.go("app.notificaciones");
    };

    $scope.language = $window.localStorage.language;

    $rootScope.idioma = $rootScope.idiomas[1];

    angular.forEach($rootScope.idiomas, function(idioma) {
      if (idioma.codigo === $scope.language) {
        $rootScope.idioma = idioma;
        $translate.use(idioma.codigo);
      }
    });

    $scope.actualizar = function(fullrefresh) {
      if (fullrefresh) {
        $rootScope.LoadingShow();

        $http.get($rootScope.domain + "userProfile/").then(
          function(result) {
            result.data.nacimiento = formatearNacimiento(
              result.data.nacimiento
            );
            $scope.perfil = result.data;
            $window.localStorage.perfil = JSON.stringify($scope.perfil);

            $timeout(function() {
              ionicMaterialInk.displayEffect();
              ionicMaterialMotion.blinds();
            }, 100);
          },

          function(result) {
            // si algo va mal.
            console.log(result);
            $rootScope.banner([
              $translate.instant("net_error"),
              $translate.instant("try_again")
            ]);

            $rootScope.LoadingHide();
            $timeout(function() {
              ionicMaterialInk.displayEffect();
              ionicMaterialMotion.blinds();
            }, 100);
          }
        );

        $http.get($rootScope.domain + "users/").then(
          function(result) {
            $scope.user = result.data;

            console.log($scope.user);

            $window.localStorage.user = JSON.stringify($scope.user);

            $rootScope.LoadingHide();
          },
          function() {
            // si algo va mal.
            $rootScope.LoadingHide();
            $rootScope.banner([
              $translate.instant("net_error"),
              $translate.instant("try_again")
            ]);
          }
        );

        $scope.$broadcast("scroll.refreshComplete");
      } else {
        // no full refresh
        if ($window.localStorage.perfil && $window.localStorage.user) {

          var perfil = JSON.parse($window.localStorage.perfil);
          perfil.nacimiento = new Date(perfil.nacimiento);

          $scope.perfil = perfil;
          $scope.user = JSON.parse($window.localStorage.user);
          $timeout(function() {
            ionicMaterialInk.displayEffect();
            ionicMaterialMotion.ripple();
          }, 100);
        } else {
          $scope.actualizar(true);
        }
      }
    };

    $scope.editarUsuario = function() {
      $http
        .put($rootScope.domain + "users/", $scope.user)
        .then(function(result) {
          $scope.user = result.data;
          $window.localStorage.user = JSON.stringify($scope.user);
        });
    };

    $scope.editarPerfil = function() {
      var nacimiento = deformatearNacimiento($scope.perfil.nacimiento);
      var data = angular.copy($scope.perfil);
      data.nacimiento = nacimiento;
      $http
        .put($rootScope.domain + "userProfile/", data)
        .then(function(result) {
          result.data.nacimiento = formatearNacimiento(result.data.nacimiento);
          $scope.perfil = result.data;
          $window.localStorage.perfil = JSON.stringify($scope.perfil);
        });
    };

    $scope.editarPassword = function(campo) {
      $scope.password = {};
      $scope.password.new_password = "";
      $scope.password.current_password = "";

      $scope.template =
        '<input type="' +
        "password" +
        '" ng-model="password.current_password" placeholder="Contraseña Actual"><br><input type="' +
        "password" +
        '" ng-model="password.new_password" placeholder="Nueva Contraseña">';

      var myPopup = $ionicPopup.show({
        template: $scope.template,
        title: "Editar ",
        subTitle: "",
        scope: $scope,
        buttons: [
          { text: "Cancelar" },

          {
            text: "<b>Guardar</b>",
            type: "button-positive",
            onTap: function(e) {
              console.log($scope.user);

              $http
                .post($rootScope.domain + "auth/password/", $scope.password)
                .then(function(result) {
                  //$scope.perfil = result.data;
                });
            }
          }
        ]
      });
    };

    $scope.editarIdioma = function(idioma) {
      $scope.perfil.idioma = idioma.codigo;
      var data = angular.copy($scope.perfil);
      data.nacimiento = deformatearNacimiento($scope.perfil.nacimiento);
      $http
        .put($rootScope.domain + "userProfile/", data)
        .then(function(result) {
          result.data.nacimiento = formatearNacimiento(result.data.nacimiento);
          $scope.perfil = result.data;

          $window.localStorage.language = idioma.codigo;
        });

      $translate.use(idioma.codigo);
    };
  });
