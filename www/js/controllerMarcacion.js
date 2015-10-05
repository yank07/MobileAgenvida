angular.module('Agenvida.controllerMarcacion', [])

.controller('controllerMarcacion', function($scope,  $http , $state, $ionicSideMenuDelegate, $ionicModal,$ionicPopup , $ionicActionSheet) {
  /**************************************************/
  /**************** VARIABLES **********************/
  /*************************************************/
  $scope.domain = "http://agenvida.herokuapp.com/";
  //$scope.domain = "http://localhost:8000/";
  $scope.date = new Date( );
  $scope.dia = $scope.date.getDate();
  $scope.mes = $scope.date.getMonth()+1;
  $scope.ano = $scope.date.getFullYear();
  $scope.showInput = [false, false, false, false, false] ;
  $scope.NuevoProposito = ['','','',''];
  $scope.vinculaciones = [{"id":1,"nombre":"Dios"}, {"id":2,"nombre":"Conmigo"},{"id":3,"nombre":"Con los Demás"}, {"id":4,"nombre":"Con la Naturaleza"},]

   $scope.weekDaysList = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"];
   $scope.monthList = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agost", "Sept", "Oct", "Nov", "Dic"];
  
  /***************************************************/
  /* Configuracion del Calendario para elegir fechas */
   /***************************************************/

  $scope.datepickerObject = {
    //titleLabel: 'Title',  //Optional
      todayLabel: 'Hoy',  //Optional
      closeLabel: 'Cerrar',  //Optional
      setLabel: 'Ir',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
  //  closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
  //  disabledDates: disabledDates, //Optional
    weekDaysList: $scope.weekDaysList,   //Optional
    monthList:  $scope.monthList, //Optional

      templateType: 'modal', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
       
       if (val){
           $scope.dia = ("0" + val.getDate()).slice(-2)
           $scope.mes =  ("0" + (val.getMonth() + 1)).slice(-2)
           $scope.ano =  val.getFullYear();

           $scope.date.setDate($scope.dia);
           $scope.date.setMonth($scope.mes-1);
           $scope.date.setFullYear($scope.ano);

        // console.log($scope.date);

       }
  

      }
    };

  // FIN DE CONFIGURACION DE CALENDARIO
      /*************************************************/
      /* TRAIGO TODOS LOS PROPOSITOS DEL USUARIO */ 
      /*************************************************/
      $scope.getPropositos = function() {  

  // $http.defaults.headers.common['Authorization']= 'Bearer '+TokenService.getToken();     //para colocar el token en el header
      $http.get($scope.domain + 'propositos2/').then(function(result){//si el get va bien
                                                        $scope.propositos = result.data;
                                                        },
                                                      function(){ // algo salio mar #TODO volver a registrar

                                                       } 
                                                    );

                                          }         // FIN GET PROPOSITOS


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
                  //  console.log(proposito);
                  //  console.log($scope.ano + "-" + $scope.mes + "-" + $scope.dia);
                  //  console.log( searchFecha( $scope.dia , proposito.marcaciones) );

                    /* busco si ya existe una marcacion de ese proposito en esa fecha */
                    marcacion = searchFecha( $scope.dia , proposito.marcaciones)


                    /* Si ya hay una maracion, entonces actualizo */   
                    if (marcacion){
                      console.log("hay marcacion");

                      if (marcacion.cumplimiento != valorMarcacion) /* Corroboro que realmente haya un cambio */
                        {   
                            /* Si hay un cambio entonces actualizo el valor en el servidor mediante un PUT*/
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

                      //console.log(data);
                      $http.post($scope.domain + 'marcaciones2/', data).then(function(result){

                                                                                //console.log(result);
                                                                                proposito.marcaciones.push(result.data);

                                                                               });
                    }/* Fin else*/
  }//Fin funcion marcar

/*********************************************/
/* Funcion para aumentar y disminuir un dia con flechita */
/*********************************************/

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


/*********************************************/
/* FIN Funcion  aumentar un dia con flechita */
/*********************************************/

  

 
/**********************************************/
/**** Show pop Up de Crear nuevo proposito****/
/*********************************************/
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

/* FIN de POPUP */
  /**************************************************************************/
  /*****Muestro las opciones de edicion de un proposito al hacer doble tab***/
  /**************************************************************************/

 $scope.showOpciones = function(proposito) {

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

    destructiveButtonClicked: function(){ //Cuando hago tab en eliminar
      console.log("Eliminado");
       $http.delete($scope.domain +'propositos2/' + proposito.id + "/").then(

        function(){
          console.log("Proposito eliminado");
          $scope.index = $scope.propositos.indexOf(proposito)
           $scope.propositos.splice($scope.index, 1);



            }

     );
       
     
      return true;
    },
     buttonClicked: function(index) { //cuando hago click en editar

      console.log(propositoID);
       return true;
     }
   });


 };

//FIN de botones de edicion


    /************************************
   * if given group is the selected group, deselect it
   * else, select the given group
   * Es el acordeon
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

  // Fin de Acorderon 


$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

$scope.verPerfil = function (){
  console.log("ver perfil");
  $state.go('app.perfil');
}


$scope.verReporte = function(){
   $state.go('app.reporte-mensual');
}
$scope.verMarcacion= function(){
   $state.go('app.marcacion');
}




})/* FIN AGENVIDACTRL*/



