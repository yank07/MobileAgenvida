angular
  .module("Agenvida.controllerTelefono", [])
  .controller("controllerTelefono", function(
    $scope,
    $state,
    $http,
    $window,
    $rootScope,
    $ionicLoading,
    $sce,
    $cordovaSocialSharing,
    ionicMaterialMotion,
    ionicMaterialInk
  ) {
    $http.get("js/frases.json").then(function(result) {
      //console.log(result.data.frases);
      $scope.frases = result.data.frases;
      //$scope.cards = result.data.frases;
      $scope.cant_frases = result.data.frases.length;
      $scope.ramdom = Math.floor(Math.random() * $scope.cant_frases);
      //console.log($scope.ramdom);

      $scope.frase_elegida = $scope.frases[$scope.ramdom];

      ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
    });

    $scope.shareAnywhere = function() {
      $cordovaSocialSharing.share(
        "This is your message",
        "This is your subject",
        "http://agenvida.com/static/img/icono.png",
        "http://agenvida.com/"
      );
    };

    $scope.shareViaTwitter = function(message) {
      console.log(message);

      // this is the complete list of currently supported params you can pass to the plugin (all optional)
      var options = {
        message: message, // not supported on some apps (Facebook, Instagram)
        files: ["www/img/padreK.jpg"], // an array of filenames either locally or remotely,
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

    $scope.shareViaFacebook = function(message) {
      $cordovaSocialSharing
        .shareViaFacebook(message, "www/img/padreK.jpg")
        .then(
          function(result) {
            // Success!
          },
          function(err) {
            // An error occurred. Show a message to the user
          }
        );
    };

    $scope.shareViaWhatsapp = function(message) {
      console.log(message);

      $cordovaSocialSharing.shareViaWhatsApp(message, "", "").then(
        function(result) {
          // Success!
        },
        function(err) {
          // An error occurred. Show a message to the user
        }
      );
    };

    $scope.nuevaFrase = function() {
      $scope.ramdom = Math.floor(Math.random() * $scope.cant_frases);
      //console.log($scope.ramdom);

      $scope.frase_elegida = $scope.frases[$scope.ramdom];
    };
  });
