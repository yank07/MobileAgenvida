angular.module('Agenvida.controllers', [])

.controller('AgenvidaCtrl', function($scope, $timeout, $ionicModal, Projects, $http ,$ionicSideMenuDelegate) {


//$http.defaults.headers.common['Authorization']= 'Bearer Am1yFBvVNeLmYkPQdpkdIvzdbvGoBY';

$http.defaults.headers.common['Authorization']= 'Bearer 0QbSxsPGIZGuA1DdSaseyOloIkXBoN';

  $scope.dia = 25;
  $scope.mes = "09";
  $scope.ano = "2015";
  $scope.showInput = [true, true, true, true] ;
  $scope.NuevoProposito = ['','','',''];
  $scope.vinculaciones = [{"id":1,"nombre":"Dios"}, {"id":2,"nombre":"Conmigo"},{"id":3,"nombre":"Con los Demás"}, {"id":4,"nombre":"Con la Naturaleza"},]
   //$scope.propositos = [{"id":1,"usuario":"rodrigo","vinculacion":1,"proposito":"Amarle a gi","mes_ano":"2015-09-25","marcaciones":[{"id":2,"dia":"2015-09-25","cumplimiento":1,"proposito":1}]},{"id":2,"usuario":"rodrigo","vinculacion":1,"proposito":"Ti amu","mes_ano":"2015-09-25","marcaciones":[{"id":1,"dia":"2015-09-25","cumplimiento":1,"proposito":2}]},{"id":3,"usuario":"rodrigo","vinculacion":1,"proposito":"Sos un capo","mes_ano":"2015-09-25","marcaciones":[{"id":3,"dia":"2015-09-25","cumplimiento":0,"proposito":3}]},{"id":4,"usuario":"rodrigo","vinculacion":1,"proposito":"Rezar","mes_ano":"2014-09-25","marcaciones":[{"id":5,"dia":"2014-09-25","cumplimiento":2,"proposito":4}]},{"id":5,"usuario":"rodrigo","vinculacion":1,"proposito":"rosario","mes_ano":"2014-09-25","marcaciones":[{"id":4,"dia":"2014-09-25","cumplimiento":1,"proposito":5}]},{"id":6,"usuario":"rodrigo","vinculacion":1,"proposito":"Migracion ok","mes_ano":"2015-09-25","marcaciones":[{"id":6,"dia":"2015-09-25","cumplimiento":2,"proposito":6}]}];


      /*************************************************/
      /* TRAIGO TODOS LOS PROPOSITOS DEL USUARIO */ 
      /*************************************************/
	    getPropositos = function() {        

      $http.get('http://localhost:8000/propositos2/').then(function(result){
                                                        $scope.propositos = result.data;
                                                        },
                                        function(){ } 
                                     );

                              }

        getPropositos();

        function searchFecha(dia, myArray){
              for (var i=0; i < myArray.length; i++) {
                  if (myArray[i].dia === $scope.ano + "-" + $scope.mes + "-" + $scope.dia) {
                      console.log(myArray[i].dia)
                      return myArray[i];
                  }
              }
          }
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
                          $http.put('http://localhost:8000/marcaciones2/' + marcacion.id + "/", marcacion).then(function(){console.log("volvi")});

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
                      $http.post('http://localhost:8000/marcaciones2/', data).then(function(result){

                                                                                console.log(result);
                                                                                proposito.marcaciones.push(result.data);

                                                                               });
                    }/* Fin else*/
  }//Fin funcion marcar

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

/************************************///
  // LOGIN
  /************************************///
  $scope.login = function(username,password){

  	console.log(username + password);
  	$scope.taskModal.hide();
  	
  	
  }

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



});