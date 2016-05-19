angular.module('Agenvida.controllerMarcacion', ["slugifier", "jett.ionic.content.banner",
 'ion-floating-menu'])

.controller('controllerMarcacion', function($scope, $rootScope, $http , $state, 
  $ionicHistory, $ionicSideMenuDelegate,$filter, $ionicModal,$ionicPopup , 
  $ionicActionSheet,$window,$ionicLoading,   $translate , $ionicContentBanner, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  /**************************************************/
  /**************** VARIABLES **********************/
  /*************************************************/



$rootScope.banner = function(mensajes, intervalo, autoclose, type, transition){

  $ionicContentBanner.show(
  {text: mensajes ,
          interval: intervalo || 2000,
          autoClose: autoclose ||  6000,
          type:  type || "error", //info,
          transition: transition || 'fade' // 'vertical'
        });

 } 



  $ionicHistory.clearHistory();
  console.log($ionicHistory.viewHistory());
  //$rootScope.domain = "http://agenvida.herokuapp.com/";
  //$rootScope.domain = "http://localhost:8000/";
  $scope.date = new Date( );
  $scope.dia = ("0" + $scope.date.getDate()).slice(-2);
  $scope.mes = ("0" + ($scope.date.getMonth() + 1)).slice(-2);
  $scope.ano = $scope.date.getFullYear();
  $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;
  console.log( $scope.dia + '-' +  $scope.mes + '-' + $scope.ano);
  $scope.showInput = [false, false, false, false, false] ;
  $scope.NuevoProposito = ['','','',''];
  $scope.vinculaciones = [{"id":1,"nombre":"Dios"}, {"id":2,"nombre":"Conmigo"},{"id":3,"nombre":"Con los Demás"}, {"id":4,"nombre":"Con la Naturaleza"},{"id":7,"nombre":"Propósitos Semanales"}, {"id":8,"nombre":"Propósitos Mensuales"},]
  $scope.extras = [{"id":7,"nombre":"Proposito Semanales"}, {"id":8,"nombre":"Proposito Mensuales"}]
  $scope.propositoParticular = {"id":5, "nombre":"Proposito Particular"}
  $scope.weekDaysList = $rootScope.dias_semana; // esto esta definido en app.js
  $scope.monthList = $rootScope.meses; // esto esta definido en app.js
  
  /***************************************************/
  /* Configuracion del Calendario para elegir fechas */
   /***************************************************/
  $scope.datepickerObject = {
    titleLabel: 'Elegir día',  //Optional
      todayLabel: 'Hoy',  //Optional
      closeLabel: 'Cerrar',  //Optional
      setLabel: 'Ir',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
  //  closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: false,    //Optional
  //  disabledDates: disabledDates, //Optional
    weekDaysList: $scope.weekDaysList,   //Optional
    monthList:  $scope.monthList, //Optional

      templateType: 'modal', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 1, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
       
       if (val){
           $scope.dia = ("0" + val.getDate()).slice(-2)
           $scope.mes =  ("0" + (val.getMonth() + 1)).slice(-2)
           $scope.ano =  val.getFullYear();

           $scope.date.setDate($scope.dia);
           $scope.date.setMonth($scope.mes-1);
           $scope.date.setFullYear($scope.ano);
           $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;

        // console.log($scope.date);

       }
  

      }
    };


 




  // FIN DE CONFIGURACION DE CALENDARIO
      /*************************************************/
      /* TRAIGO TODOS LOS PROPOSITOS DEL USUARIO */ 
      /*************************************************/
      $scope.getPropositos = function() {  

      $rootScope.LoadingShow();

  // $http.defaults.headers.common['Authorization']= 'Bearer '+TokenService.getToken();     //para colocar el token en el header
      $http.get($rootScope.domain + 'propositos/').then(function(result){//si el get va bien
                                                        $scope.propositos = result.data;
                                                        $rootScope.propositos = result.data;
                                                        $window.localStorage.propositos = JSON.stringify(result.data) ;
                                                        console.log( $scope.propositos);
                                                        $scope.pps = {};
                                                       // $scope.pps = $filter('filter')($scope.propositos, { vinculacion: $scope.propositoParticular.id , mes_ano: ano + '-'+ mes +'-'  } )[0];
                                                      //  console.log($scope.pps);
                                                        $rootScope.LoadingHide();
                                                          $timeout(function() {
                                                         ionicMaterialInk.displayEffect();
                                                         ionicMaterialMotion.ripple();
                                                    }, 100);



                                                      
                                                        },
                                                      function(result){ // algo salio mal #TODO volver a registrar
                                                              console.log("algo salio mal");
                                                              if(result.statusText=="UNAUTHORIZED"){
                                                                $rootScope.mensaje = "No autorizado";
                                                                console.log("no estas autorizado");
                                                                delete $window.localStorage.token;

                                                                $state.go("signin");


                                                                
                                                              }



                                                              else if (result.detail=="Invalid token header. No credentials provided."){
                                                                delete $window.localStorage.token;
                                                                console.log("Invalid Token");
                                                                 $state.go("signin");


                                                              }
                                                              else{
                                                                $rootScope.banner([$translate.instant("net_error"),$translate.instant("try_again") ])
                                                                console.log(result);
                                                              }

                                                              $rootScope.LoadingHide();


                                                              
                                                       } 
                                                    );

                                          }         // FIN GET PROPOSITOS


      /*************************************************/
      /******* Busco la fecha de la marcacion  ******** */ 
      /*************************************************/

        function searchFecha(myArray){
          console.log(myArray);
          console.log($scope.ano + "-" + $scope.mes + "-" + $scope.dia);
              for (var i=0; i < myArray.length; i++) {

                  if (myArray[i].dia === $scope.fechaTotal) {
                      console.log(myArray[i].dia)
                      return myArray[i];
                  }
              }
          }



$scope.actualizar = function(fullrefresh){

  console.log("estoy en actualizar");
  console.log(fullrefresh);
 

  if(fullrefresh == true) {
  

  
      console.log("no tengo nada");
       $scope.getPropositos();



       console.log("no tengo nada");
      

     $http.get($rootScope.domain + "userProfile/").then(function(result){
      $rootScope.perfil = result.data;
      $window.localStorage.perfil = JSON.stringify($scope.perfil);
      });

    


  }
  else {
      if ($window.localStorage.perfil && $window.localStorage.user ){

    $scope.propositos =  JSON.parse($window.localStorage.propositos);
    $rootScope.perfil = JSON.parse($window.localStorage.perfil);

    $timeout(function() {
         ionicMaterialInk.displayEffect();
         ionicMaterialMotion.ripple();
    }, 100);
      
  }
  else{
    $scope.actualizar(true);
  }
    

  }
    ionicMaterialInk.displayEffect();
  
  $scope.$broadcast('scroll.refreshComplete');



   

}

  ionicMaterialInk.displayEffect();

           

   

      /*************************************************/
     /* MARCO LOS NUEVOS MARCACIONES DE LOS PROPOSITOS */ 
     /*************************************************/
    $scope.marcar = function( proposito, valorMarcacion,  sectionIndex, index){
                  //  console.log(proposito);
                  //  console.log($scope.ano + "-" + $scope.mes + "-" + $scope.dia);
                  //  console.log( searchFecha( $scope.dia , proposito.marcaciones) );

                    /* busco si ya existe una marcacion de ese proposito en esa fecha */
                    marcacion = searchFecha(proposito.marcaciones);

                 


                    /* Si ya hay una maracion, entonces actualizo */   
                    if (marcacion){
                      


                      if (marcacion.cumplimiento != valorMarcacion) /* Corroboro que realmente haya un cambio */
                        {   
                          /* Si hay un cambio entonces actualizo el valor en el servidor mediante un PUT*/
                          console.log("hay marcacion y hay un cambio");
                         // marcacion.loading = -1; 
                          
                          $scope.loading = sectionIndex + '-' + index; //pongo loading hasta que llegue la respuesta
                          console.log($scope.loading);
                           
                          $http.put($rootScope.domain +'marcaciones/' + marcacion.id + "/", marcacion).then(
                            function(result){ // si todo va bien
                              console.log("volvi");
                              console.log(result); 
                              marcacion.cumplimiento = valorMarcacion;
                              $window.localStorage.propositos = JSON.stringify($scope.propositos);

                              $scope.loading = "";
                             marcacion.cumplimiento = valorMarcacion;
                            },
                            function(result){ // por si algo sale mal
                              $scope.loading = "";
                              console.log(result);
                               $rootScope.banner([$translate.instant("net_error"),$translate.instant("try_again") ])
                             // marcacion.cumplimiento = null;
                            }

                            );

                         } //endif
                     
                    }//endif

                    /* Si no hay marcacion entonces creo una nueva*/ 

                    else{
                      console.log(" NO hay marcacion");
                      data = { 
                              "dia": $scope.ano + "-" + $scope.mes + "-" + $scope.dia,
                              "cumplimiento": valorMarcacion,
                              "proposito": proposito.id
                      }
                      
                      //console.log(data);
                      $scope.loading = sectionIndex + '-' + index; //pongo loading hasta que llegue la respuesta
                      $http.post($rootScope.domain + 'marcaciones/', data).then(
                        function(result){

                            //console.log(result);
                            proposito.marcaciones.push(result.data);
                            //$scope.loading(proposito.id);
                            $scope.loading = ""; //pongo loading hasta que llegue la respuesta
                            $window.localStorage.propositos = JSON.stringify($scope.propositos);
                           },
                        function (result){ // por si algo sale mal
                          console.log("algo salio mal en No hay marcacion");
                           $scope.loading = "";
                            $rootScope.banner([$translate.instant("net_error"),$translate.instant("try_again") ])
                        }

                                                                               );
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

  console.log($scope.dia);

  $scope.ano= $scope.tomorrow.getFullYear();

  $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;
  
  $scope.date.setTime($scope.tomorrow.getTime());


  }

  $scope.diaDown = function(){

  $scope.tomorrow = new Date();
   
  $scope.tomorrow.setTime($scope.date.getTime() - 864e5);

  $scope.dia = ("0" + $scope.tomorrow.getDate()).slice(-2);
  $scope.mes =  ("0" + ($scope.tomorrow.getMonth() + 1)).slice(-2);

  $scope.ano= $scope.tomorrow.getFullYear();

  console.log($scope.dia);

  $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;


  $scope.date.setTime($scope.tomorrow.getTime());

  }


/*********************************************/
/* FIN Funcion  aumentar un dia con flechita */
/*********************************************/

  /*********************************************/
/* TRAigo mis datos personales */
/*********************************************/


 

 
/**********************************************/
/**** Show pop Up de Crear nuevo proposito****/
/*********************************************/
$scope.CreateProposito = function(vinculacionID) {
   $scope.PropositoNuevo = {vinculacion: vinculacionID , mes_ano:$scope.fechaTotal} ;

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="PropositoNuevo.proposito">',
     title: $translate.instant('create_p'),
     subTitle:   $translate.instant('add_p_message') ,
     scope: $scope,
     buttons: [
       { text: $translate.instant('cancel') },
       
        {
         text: '<b>'+ $translate.instant('save') +'</b>',
         type: 'button-positive',
         onTap: function(e) {
              if($scope.PropositoNuevo.proposito == ""){
                  e.preventDefault();              

              }
              else {

                console.log($scope.PropositoNuevo);
                $rootScope.LoadingShow();

                $http.post($rootScope.domain +'propositos/', $scope.PropositoNuevo).then(
                                      function(result){
                                        console.log(result);
                                        $scope.propositos.push(result.data);
                                        $window.localStorage.propositos = JSON.stringify($scope.propositos);
                                        $rootScope.LoadingHide();

                                      },
                                      function(result){ // por si algo sale mal
                                         $rootScope.banner([$translate.instant("net_error"),$translate.instant("try_again") ])
                                        $rootScope.LoadingHide();
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
       { text: '<b>'+$translate.instant('edit')+'</b>' },
      
     ],
     destructiveText: $translate.instant('delete_mssg') ,
     titleText: $translate.instant('edit_p'),
     cancelText: $translate.instant('cancel'),
     cancel: function() {
          // add cancel code..
          //console.log(propositoID);
          return true;
        },

    destructiveButtonClicked: function(){ //Cuando hago tab en eliminar
      console.log("Eliminado");
       $http.delete($rootScope.domain +'propositos/' + proposito.id + "/").then(

        function(){
          console.log("Proposito eliminado");
          $scope.index = $scope.propositos.indexOf(proposito)
           $scope.propositos.splice($scope.index, 1);



            }

     );
       
     
      return true;
    },
     buttonClicked: function() { //cuando hago click en editar
      console.log(proposito);
     // delete proposito.marcaciones;
      $scope.editProposito = {}

      console.log(proposito);
      $scope.editProposito.id = proposito.id;
      $scope.editProposito.proposito = proposito.proposito;
      $scope.editProposito.mes_ano = proposito.mes_ano;

    var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="editProposito.proposito">',
     title: $translate.instant('create_p'),
     subTitle: $translate.instant('add_p_message'),
     scope: $scope,
     buttons: [
       { text: $translate.instant('cancel') },
       
        {
         text: '<b>'+$translate.instant('save') +'</b>',
         type: 'button-positive',
         onTap: function(e) {
              if(proposito.proposito == ""){
                  e.preventDefault();              

              }
              else {

                
                $http.put($rootScope.domain +'propositos/'+$scope.editProposito.id + "/", $scope.editProposito).then(
                                                                                        function(result){
                                                                                          console.log(result);
                                                                                          proposito.proposito = result.data.proposito;
                                                                                        //  $scope.propositos.push(result.data);

                                                                                        }
                  )

              }
              
         }
       },
     ]
   }); 
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

  
 /* $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group.id;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group.id;
  };



  */

$scope.shownGroup = [true,true, true, true, true, true, true, true, true, true, true,  ];




  $scope.toggleGroup = function(group) {
   $scope.isGroupShown(group);
     
  };
  

  $scope.isGroupShown = function(group) {
    if( $scope.shownGroup[group.id] == true ){
        $scope.shownGroup[group.id] = false;
    }
    else {
        $scope.shownGroup[group.id] = true;

    }

   // return $scope.shownGroup === group.id;
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


$scope.verNotificaciones = function(){
   $state.go('app.notificaciones');
}

$scope.verSugerencias = function(){
  $scope.screen_width = $window.innerWidth;
  console.log($scope.screen_width);

   $state.go('app.sugerencias');
}

$scope.verEvangelio = function(){
  

   $state.go('app.evangelio');
}



$scope.verTelefono = function(){
  

   $state.go('app.telefono');
}

$scope.verMarcacion= function(){
   $state.go('app.marcacion');
}

$scope.verOraciones= function(){
   $state.go('app.oraciones');
}





$scope.abierto = false;

$scope.desplegar = function(){

 if ($scope.abierto == true){

  $scope.shownGroup = [true,true, true, true, true, true, true, true, true, true, true,  ];
  console.log($scope.shownGroup);
  $scope.abierto =  false;
 }

 else{

$scope.shownGroup = [false, false,false,false,false,false,false,false,];
console.log($scope.shownGroup);
 $scope.abierto =  true;

 }
}



})/* FIN AGENVIDACTRL*/



