angular.module('Agenvida.controllerNotifications', [ ])

.controller('controllerNotifications', function($scope, $ionicPlatform , $rootScope,
 $http ,$window ,$cordovaLocalNotification,$state , ionicTimePicker) {
$ionicPlatform.ready(function () {
          if (ionic.Platform.isWebView()) {


    if(device.platform === "iOS") {
        window.plugin.notification.local.promptForPermission();
    }



     cordova.plugins.notification.local.on("click", function (notification, state) {
                    $state.go('app.marcacion');
            }, this)



                $scope.scheduleInstantNotification = function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          text: 'Instant Notification',
          title: 'Instant'
        }).then(function () {
          alert("Instant Notification set");
        });;
      };

      $scope.scheduleDelayedNotification = function () {
        var now = new Date().getTime();
        var _5SecondsFromNow = new Date(now + 5000);

        $cordovaLocalNotification.schedule({
          id: 2,
          at: _5SecondsFromNow,
          text: 'Notification After 5 Seconds Has Been Triggered',
          title: 'After 5 Seconds'
        }).then(function (result) {
          console.log('After 5 sec Notification Set');
        });
      }

      //Scheduled Every X Seconds / Minutes
      //Every Options: second, minute, hour, day, week, month, year
      $scope.scheduleEveryMinuteNotification = function (time) {
        $cordovaLocalNotification.schedule({
          id: 3,
            title: 'Hora de tu HE',
              text: 'Acordate de marcar tus propositos',
             // at: new Date(time*1000),
             every:'minute',
             
             
        }/*,
        function () {
                          $window.plugin.notification.local.update({
                                id: 3,
                                title: 'Hora de tu HE',
                                  text: 'Acordate de marcar tus propositos',
                                  every: 'minute',
                                  firstAt: new Date(time*1000)
                          });
                      }*/


        ).then(function (result) {
          console.log('Every Minute Notification Set');
        });
      };


      // Update a Scheduled Notification
      $scope.updateNotificationText = function () {
        $cordovaLocalNotification.isPresent(3).then(function (present) {
          if (present) {
            $cordovaLocalNotification.update({
              id: 3,
              title: 'Notificaton  Update',
              text: 'Notification Update Details'
            }).then(function (result) {
              console.log('Updated Notification Text');
            });
          } else {
            alert("Must Schedule Every Minute First");
          }
        });
      };

      $scope.updateNotificationEvery = function () {
        $cordovaLocalNotification.isPresent(3).then(function (present) {
          if (present) {
            $cordovaLocalNotification.update({
              id: 3,
              title: 'Hora de tu HE',
              text: 'Acordate de marcar tus propositos',
              every: 'second'

            }).then(function (result) {
              console.log('Updated Notification Every');
            });
          } else {
            alert("Must Schedule Every Minute First");
          }
        });
      };

      //Cancel a Notification
      $scope.cancelNotification = function () {
        $cordovaLocalNotification.isPresent(3).then(function (present) {
          if (present) {
            $cordovaLocalNotification.cancel(3).then(function (result) {
              console.log('Notification EveryMinute Cancelled');
              alert('Cancelled Every Minute');
               $scope.notificacion = "not_set";
                $window.localStorage.notificacion = JSON.stringify($scope.notificacion);
            });
          } else {
            alert("Must Schedule Every Minute First");
          }
        });


      };





          } /* Fin del tema de notificaciones */

          if(!$window.localStorage.notificacion){
             $scope.notificacion = "not_set";
          }
          else{
            $scope.notificacion = JSON.parse($window.localStorage.notificacion);
          }

          $scope.openTimePicker1 = function () {
    console.log("hola");
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {

            var selectedTime = new Date(val * 1000);
            console.log(selectedTime);

            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          $scope.scheduleEveryMinuteNotification(val);
          $scope.minutos = selectedTime.getUTCMinutes();

           if (selectedTime.getUTCMinutes() < 10){

            $scope.minutos = '0'+selectedTime.getUTCMinutes();
           }

           $scope.notificacion =  selectedTime.getUTCHours()+ ':' + $scope.minutos;
           $window.localStorage.notificacion = JSON.stringify($scope.notificacion);
          }
        },
        inputTime: 50400,
        format: 12,
        step: 10,
        setLabel: 'Elegir',
        closeLabel:'Cerrar'
      };
      ionicTimePicker.openTimePicker(ipObj1);
    };


/*
    $scope.cancelNotification = function (){
      $scope.notificacion = "not_set";
                $window.localStorage.notificacion = JSON.stringify($scope.notificacion);

    }*/


})





    

})/* FIN AGENVIDACTRL*/