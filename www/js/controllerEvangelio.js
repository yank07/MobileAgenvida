angular
  .module("Agenvida.controllerEvangelio", [])
  .controller("controllerEvangelio", function(
    $scope,
    $state,
    $http,
    $window,
    $rootScope,
    $ionicLoading,
    $sce,
    $cordovaSocialSharing
  ) {
    console.log("evangelizo000000");

    $scope.texto_molesto =
      'Extraído de la Biblia: Libro del Pueblo de Dios.<br />Para recibir cada mañana el Evangelio por correo electrónico, registrarse: <a href="http://evangeliodeldia.org" target="_blank">evangeliodeldia.org</a>';

    $scope.hoy = new Date();

    $scope.hoyLetras =
      $rootScope.dias_semana[$scope.hoy.getDay()] +
      " " +
      ("0" + $scope.hoy.getDate()).slice(-2) +
      " de " +
      $rootScope.meses[$scope.hoy.getMonth()] +
      " del " +
      $scope.date.getFullYear();

    $scope.hoy =
      $scope.date.getFullYear() +
      ("0" + ($scope.hoy.getMonth() + 1)).slice(-2) +
      ("0" + $scope.hoy.getDate()).slice(-2);

    console.log($scope.hoy);

    /*

// titulo Primera Lectura

$http.get("http://feed.evangelizo.org/v2/reader.php?date="+$scope.hoy+"&type=reading_lt&lang=SP&content=FR").then(function(result){
	$scope.titulo_primera_lectura = $sce.trustAsHtml(result.data);
})


// Primera Lectura

$http.get("http://feed.evangelizo.org/v2/reader.php?date="+$scope.hoy+"&type=reading&lang=SP&content=FR").then(function(result){
	$scope.primera_lectura = $sce.trustAsHtml(result.data.replace($scope.texto_molesto,""));
})

// Titulo SEgunda Lectura

$http.get("http://feed.evangelizo.org/v2/reader.php?date="+$scope.hoy+"&type=reading_lt&lang=SP&content=SR").then(function(result){
	$scope.titulo_segunda_lectura = $sce.trustAsHtml(result.data);
})
// Segunda Lectura

$http.get("http://feed.evangelizo.org/v2/reader.php?date="+$scope.hoy+"&type=reading&lang=SP&content=SR").then(function(result){
	$scope.segunda_lectura = $sce.trustAsHtml(result.data.replace($scope.texto_molesto,""));
})

// Titulo Salmo

$http.get("http://feed.evangelizo.org/v2/reader.php?date="+$scope.hoy+"&type=reading_lt&lang=SP&content=PS").then(function(result){
	$scope.titulo_salmo = $sce.trustAsHtml(result.data);
})
// Salmo

$http.get("http://feed.evangelizo.org/v2/reader.php?date="+$scope.hoy+"&type=reading&lang=SP&content=PS").then(function(result){
	$scope.salmo = $sce.trustAsHtml(result.data.replace($scope.texto_molesto,""));
})*/
    // titulo Evangelio

    $rootScope.LoadingShow();

    $http
      .get(
        "http://feed.evangelizo.org/v2/reader.php?date=" +
          $scope.hoy +
          "&type=reading_lt&lang=SP&content=GSP"
      )
      .then(function(result) {
        $scope.titulo_evangelio = $sce.trustAsHtml(result.data);
      });

    // Evangelio

    $http
      .get(
        "http://feed.evangelizo.org/v2/reader.php?date=" +
          $scope.hoy +
          "&type=reading&lang=SP&content=GSP"
      )
      .then(
        function(result) {
          console.log(result.data);
          $scope.evangelio = result.data;
          $scope.evangelio = $scope.evangelio.replace($scope.texto_molesto, "");
          $scope.evangelio = $sce.trustAsHtml($scope.evangelio);
          $rootScope.LoadingHide();
        },

        //Si errror

        function(result) {
          $scope.evangelio =
            "Ha ocurrido un problema, favor intentelo más tarde";
          $rootScope.LoadingHide();
          $scope.palabra_de_dios = true;
        }
      );

    $scope.shareViaWhatsapp = function() {
      $cordovaSocialSharing.shareViaWhatsApp(document.getElementById("evangelio").innerText, "", "").then(
        function(result) {
          // Success!
        },
        function(err) {
          // An error occurred. Show a message to the user
        }
      );
    };

    $scope.shareViaTwitter = function() {
      // this is the complete list of currently supported params you can pass to the plugin (all optional)
      var options = {
        message: document.getElementById("evangelio").innerText, // not supported on some apps (Facebook, Instagram)
        appPackageName: "com.twitter.android"
      };

      var onSuccess = function(result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      };

      var onError = function(msg) {
        console.log("Sharing failed with message: " + msg);
      };
      window.plugins.socialsharing.shareWithOptions(
        options,
        onSuccess,
        onError
      );
    };
  });
