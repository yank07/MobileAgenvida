angular
  .module("Agenvida.controllerSignUp", [])
  .controller("controllerSignUp", function(
    $scope,
    $state,
    $http,
    $window,
    $rootScope,
    $ionicLoading
  ) {
    $scope.user = {};
    $scope.forgot = {};
    $scope.mensajeEnviado = false;
    $scope.usuarioExiste = false;

    console.log("Crear usuario");

    $scope.LoadingShow = function() {
      $ionicLoading.show({
        template: "{{'loading' |translate}}"
      });
    };
    $scope.LoadingHide = function() {
      $ionicLoading.hide();
    };

    $scope.crearUsuario = function() {
      $scope.LoadingShow();
      console.log($scope.user);
      $http.post($rootScope.domain + "usuario_create/", $scope.user).then(
        function(result) {
          $window.localStorage.username = $scope.user.username;
          $scope.LoadingHide();
          $state.go("signin");
        },

        function(result) {
          console.log(result);
          if ("username" in result.data) {
            $scope.usuarioExiste = true;
          }
          console.log("hubo un error");
          $scope.LoadingHide();
        }
      );
    };

    $scope.clearData = function() {
      $scope.usuarioExiste = false;
    }

    $scope.resetPassword = function() {
      console.log($scope.forgot.email);

      $http
        .post($rootScope.domain + "auth/password/reset/", $scope.forgot)
        .then(function(result) {
          console.log("email enviado");
          $scope.mensajeEnviado = true;
        });
    };
  });
