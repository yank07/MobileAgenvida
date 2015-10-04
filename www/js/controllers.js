angular.module('Agenvida.controllers', [])

.controller('AgenvidaCtrl', function($scope, $ionicModal, $http ,$ionicSideMenuDelegate, TokenService, $ionicPopup , $ionicActionSheet) {


    $scope.domain = "http://agenvida.herokuapp.com/";
    //$scope.domain = "http://localhost:8000/";
  $scope.date = new Date( );
  $scope.dia = $scope.date.getDate();
  $scope.mes = $scope.date.getMonth()+1;
  $scope.ano = $scope.date.getFullYear();

  $scope.showInput = [false, false, false, false, false] ;

  $scope.NuevoProposito = ['','','',''];
  $scope.vinculaciones = [{"id":1,"nombre":"Dios"}, {"id":2,"nombre":"Conmigo"},{"id":3,"nombre":"Con los Demás"}, {"id":4,"nombre":"Con la Naturaleza"},]




  $scope.datepickerObject = {
    //  titleLabel: 'Title',  //Optional
      todayLabel: 'Hoy',  //Optional
     closeLabel: 'Cerrar',  //Optional
      setLabel: 'Ir',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
     // closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      //disabledDates: disabledDates, //Optional
      //weekDaysList: weekDaysList,   //Optional
     // monthList: monthList, //Optional

      templateType: 'modal', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
       // datePickerCallback(val);
       if (val){
       $scope.dia = ("0" + val.getDate()).slice(-2)
       $scope.mes =  ("0" + (val.getMonth() + 1)).slice(-2)
       $scope.ano =  val.getFullYear();

       $scope.date.setDate($scope.dia);
       $scope.date.setMonth($scope.mes-1);
       $scope.date.setFullYear($scope.ano);

       console.log($scope.date);



       }
  

      }
    };

  
      /*************************************************/
      /* TRAIGO TODOS LOS PROPOSITOS DEL USUARIO */ 
      /*************************************************/
      $scope.getPropositos = function() {  

     // $http.defaults.headers.common['Authorization']= 'Bearer '+TokenService.getToken();     



      $http.get($scope.domain + 'propositos2/').then(function(result){
                                                        $scope.propositos = result.data;
                                                        },
                                        function(){ } 
                                     );

                              }// FIN GET PROPOSITOS


      /*************************************************/
      /******* Busco la fecha de la marcacion  ******** */ 
      /*************************************************/

        function searchFecha(dia, myArray){
              for (var i=0; i < myArray.length; i++) {
                  if (myArray[i].dia === $scope.ano + "-" + $scope.mes + "-" + $scope.dia) {
                      console.log(myArray[i].dia)
                      return myArray[i];
                  }
              }
          }


     $scope.getPropositos();

           

   

      /*************************************************/
     /* MARCO LOS NUEVOS MARCACIONES DE LOS PROPOSITOS */ 
     /*************************************************/
    $scope.marcar = function( proposito, valorMarcacion){
                    console.log(proposito);
                    console.log($scope.ano + "-" + $scope.mes + "-" + $scope.dia);
                    console.log( searchFecha( $scope.dia , proposito.marcaciones) );

                    /* busco si ya existe una marcacion de ese proposito en esa fecha */
                    marcacion = searchFecha( $scope.dia , proposito.marcaciones)


                    /* Si ya hay una maracion, entonces actualizo */   
                    if (marcacion){
                      console.log("hay marcacion");

                      if (marcacion.cumplimiento != valorMarcacion) /* Corroboro que realmente haya un cambio */
                        {   

                           marcacion.cumplimiento = valorMarcacion;
                          $http.put($scope.domain +'marcaciones2/' + marcacion.id + "/", marcacion).then(function(){console.log("volvi")});

                         }
                     
                    }

                    /* Si no hay marcacion entonces creo una nueva*/ 

                    else{
                      console.log(" NO hay marcacion");
                      data = { 
                              "dia": $scope.ano + "-" + $scope.mes + "-" + $scope.dia,
                              "cumplimiento": valorMarcacion,
                              "proposito": proposito.id
                      }

                      console.log(data);
                      $http.post($scope.domain + 'marcaciones2/', data).then(function(result){

                                                                                console.log(result);
                                                                                proposito.marcaciones.push(result.data);

                                                                               });
                    }/* Fin else*/
  }//Fin funcion marcar


  $scope.diaUp = function(){

   $scope.tomorrow = new Date();
   
   $scope.tomorrow.setTime($scope.date.getTime()+ 864e5);

      $scope.dia = ("0" + $scope.tomorrow.getDate()).slice(-2);
       $scope.mes =  ("0" + ($scope.tomorrow.getMonth() + 1)).slice(-2);




   $scope.ano= $scope.tomorrow.getFullYear();
  
   $scope.date.setTime($scope.tomorrow.getTime());





  }

  $scope.diaDown = function(){

    $scope.tomorrow = new Date();
   
   $scope.tomorrow.setTime($scope.date.getTime() - 864e5);

    $scope.dia = ("0" + $scope.tomorrow.getDate()).slice(-2);
    $scope.mes =  ("0" + ($scope.tomorrow.getMonth() + 1)).slice(-2);


   $scope.ano= $scope.tomorrow.getFullYear();


   $scope.date.setTime($scope.tomorrow.getTime());





  }

  $scope.addInput = function(vinculacionID){
    console.log(vinculacionID);


      $scope.showInput[vinculacionID] = true ;
      console.log($scope.showInput);

  }

  /************************************///
  // Create our modal
  /************************************///
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  /************************************///
  // ACCIONES 
  /************************************///
 

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }; 

  /***************/
/**** Show pop Up****/
/*******************/
$scope.CreateProposito = function(vinculacionID) {
   $scope.PropositoNuevo = {vinculacion: vinculacionID , mes_ano:$scope.ano + '-'+ $scope.mes + '-' + $scope.dia} ;

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="PropositoNuevo.proposito">',
     title: 'Crear nuevo Proposito',
     subTitle: 'Escribe el nombre del proposito',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       
        {
         text: '<b>Guardar</b>',
         type: 'button-positive',
         onTap: function(e) {
              if($scope.PropositoNuevo.proposito == ""){

                  e.preventDefault();
                  

              }
              else {

                console.log($scope.PropositoNuevo);
                $http.post($scope.domain +'propositos2/', $scope.PropositoNuevo).then(
                                                                                        function(result){
                                                                                          console.log(result);
                                                                                          $scope.propositos.push(result.data);

                                                                                        }


                  )

              }
              
         }
       },
     ]
   }); }


 // Triggered on a button click, or some other target
 $scope.show = function(proposito) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Editar</b>' },
      
     ],
     destructiveText: 'Eliminar',
     titleText: 'Editar  Proposito',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
          //console.log(propositoID);
          return true;
        },

    destructiveButtonClicked: function(){
      console.log("Eliminado");
       $http.delete($scope.domain +'propositos2/' + proposito.id + "/").then(

        function(){
          console.log("Proposito eliminado");
          $scope.index = $scope.propositos.indexOf(proposito)
           $scope.propositos.splice($scope.index, 1);



            }

     );
       
      // console.log($scope.propositos.indexOf(proposito));
       //console.log($scope.propositos);
      



      return true;
    },
     buttonClicked: function(index) {

      console.log(propositoID);
       return true;
     }
   });


 };




    /************************************
   * if given group is the selected group, deselect it
   * else, select the given group
   *************************************/

  
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };



})/* FIN AGENVIDACTRL*/


.controller('SignInCtrl', function($scope, $state, $http , TokenService,$window) {

 $scope.domain = "http://agenvida.herokuapp.com/";
 //   $scope.domain = "http://localhost:8000/";

 if ( $window.localStorage.token){
  console.log($window.localStorage.token);
   $state.go('home');

 }
  
  $scope.signIn = function(user) {
    //console.log('Sign-In', user);
    //UserService.setUser(user);
    //$state.go('home');

    console.log("client_id=DbSojNBpAXDEQ3CARcrKOpWI3PS8mkI3osJL0jdd&grant_type=password&username="+user.username+"&password="+user.password+"&client_secret=");
    $http({
    method: 'POST',
              url:$scope.domain+"o/token/",
              headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                        },
              data:"client_id=QlLwYhQoeYx98FzV40a82amX9Ik3HjGtfPNlXHqN&grant_type=password&username="+user.username+"&password="+user.password+"&client_secret="
  })
   .then(function(result){
      //$scope.token = result.data;   
      //console.log("then");
      //TokenService.setToken($scope.token.access_token);
        $window.localStorage.token = result.data.access_token;

        $scope.message = 'Welcome';
     
      
    

      $state.go('home');

   },
   function (result){//Si hay algun error en la autenticacion

     // Erase the token if the user fails to log in
        delete $window.localStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
   }

   );

// $state.go('home');

  };


  
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});


