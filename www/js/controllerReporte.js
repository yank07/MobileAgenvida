
angular.module('Agenvida.controllerReporte', ['chart.js',])
.controller('controllerReporte', function($scope, $state, $http ,$window, $rootScope, $ionicLoading, $sce, $filter ) {




    $scope.labels = ["01", "02", "03", "04", "05", "06", "07","08","09","10",'11','12','13','14','15','16','17','18','19','20', '21','22','23','24','25','26','27','28','29','30','31'];
   

    $scope.labels2 =["Dios", "Conmigo", "Los Demas", "Naturaleza", "P.Particular"];

 
  


    console.log("reporte");
  //  console.log($rootScope.propositos);


   // console.log($scope.cantidades);

    $scope.hoy = new Date();

    $scope.vinculaciones = [ {"id":5,"nombre":"Proposito Particular"},{"id":1,"nombre":"Dios"}, 
    {"id":2,"nombre":"Conmigo"},
    {"id":3,"nombre":"Con los Demás"}, {"id":4,"nombre":"Con la Naturaleza"}, {"id":7,"nombre":"Propósitos Semanales"}, {"id":8,"nombre":"Propósitos Mensuales"},];
	$scope.mes =	("0" + ($scope.hoy.getMonth() + 1)).slice(-2);
	$scope.ano = $scope.date.getFullYear();
	console.log($scope.mes);
	console.log($scope.ano);



	 $scope.meses = {
    availableOptions:  $rootScope.meses_num,
    selectedOption: $scope.mes //This sets the default value of the select in the ui
    };

     $scope.anos = {
    availableOptions:  $rootScope.anos,
    selectedOption: $scope.ano.toString() //This sets the default value of the select in the ui
    };



	

    $scope.propositos = JSON.parse($window.localStorage.propositos); // Traigo los propositos del LocalStorage

$scope.actualizarReporte = function() {



	$scope.propositos_mes = $filter('filter')($scope.propositos, {  mes_ano: $scope.anos.selectedOption + '-'+ $scope.meses.selectedOption +'-' , }); //traigo los propositos del mes
	console.log($scope.propositos_mes);
	
	//console.log($scope.propositos_dios[1].marcaciones);

/* Ciclo que cuenta la cantidad de Propositos Positivos, Negativos y Neutros */
	for (var i = 0 ; i < $scope.propositos_mes.length ; i ++) {				
				$scope.propositos_mes[i].positivo = 0; // inicializo
				$scope.propositos_mes[i].negativo = 0; // inicializo
				$scope.propositos_mes[i].neutro = 0; // inicializo

				if ($scope.propositos_mes[i].vinculacion==1) {$scope.propositos_mes[i].vinculacion_nombre="Dios"};
				if ($scope.propositos_mes[i].vinculacion==2) {$scope.propositos_mes[i].vinculacion_nombre="Conmigo"};
				if ($scope.propositos_mes[i].vinculacion==3) {$scope.propositos_mes[i].vinculacion_nombre="Los Demas"};
				if ($scope.propositos_mes[i].vinculacion==4) {$scope.propositos_mes[i].vinculacion_nombre="Naturaleza"};
				if ($scope.propositos_mes[i].vinculacion==5) {$scope.propositos_mes[i].vinculacion_nombre="Proposito Particular"};

				
			for (var j = 0; j < $scope.propositos_mes[i].marcaciones.length; j++) {
				
				$scope.marcacion = $scope.propositos_mes[i].marcaciones[j];
			//	console.log($scope.propositos_mes[i].marcaciones[j]);
				if($scope.marcacion.cumplimiento == 1){
					$scope.propositos_mes[i].positivo = $scope.propositos_mes[i].positivo + 1;					
				}
				else if ($scope.marcacion.cumplimiento == 2){				
					$scope.propositos_mes[i].negativo = $scope.propositos_mes[i].negativo + 1;
				}
				else {
					$scope.propositos_mes[i].neutro = $scope.propositos_mes[i].neutro + 1;
				}

			};//endFor

	//	console.log($scope.propositos_mes[i].positivo);
	//	console.log($scope.propositos_mes[i].negativo);


	};


	$scope.propositos_dios = $filter('filter')($scope.propositos_mes, {  vinculacion: 1 , });
	$scope.propositos_conmigo = $filter('filter')($scope.propositos_mes, {  vinculacion: 2 , });
	$scope.propositos_losDemas = $filter('filter')($scope.propositos_mes, {  vinculacion: 3 , });
	$scope.propositos_naturaleza = $filter('filter')($scope.propositos_mes, {  vinculacion: 4 , });
   $scope.propositos_pparticular = $filter('filter')($scope.propositos_mes, {  vinculacion: 5 , });

	//console.log($scope.propositos_naturaleza);




 $scope.maxProposito = [];
 $scope.minProposito = [];
 $scope.blancoProposito = [];

 /* Calculo los maximos por vinculacion */


for (var j = 0; j < 6; j++) {


	$scope.propositos_aux =	$filter('filter')($scope.propositos_mes, {  vinculacion: j , });
	if (j == 0){
		$scope.propositos_aux = $scope.propositos_mes;
	}


			//console.log($scope.propositos_aux);
			$scope.maxProposito.push($scope.propositos_aux[0]); // el que tengo mas positivos
			$scope.minProposito.push($scope.propositos_aux[0]); // el que tengo mas negativos
			$scope.blancoProposito.push($scope.propositos_aux[0]); // el que tiene mas blanco
			 
			for (var i = 1; i < $scope.propositos_aux.length; i++) {
				
				if($scope.maxProposito[j].positivo < $scope.propositos_aux[i].positivo ){
					$scope.maxProposito[j] = $scope.propositos_aux[i];
				}

				if($scope.minProposito[j].negativo < $scope.propositos_aux[i].negativo ){
					$scope.minProposito[j] = $scope.propositos_aux[i];
				}

				$scope.totalActual= $scope.blancoProposito[j].negativo + $scope.blancoProposito[j].positivo +$scope.blancoProposito[j].neutro ;
				$scope.totalNuevo = $scope.propositos_aux[i].negativo + $scope.propositos_aux[i].positivo + $scope.propositos_aux[i].neutro
				if( $scope.totalActual >  $scope.totalNuevo ){
					

					$scope.blancoProposito[j] = $scope.propositos_aux[i];
				}
			
				
			};

		

}


	
	$scope.maxPropositoGeneral =  $scope.maxProposito.shift();
	$scope.minPropositoGeneral = $scope.minProposito.shift();

	//console.log($scope.maxPropositoGeneral);

	$scope.data2 = [[]]
	aux = 0;
	for (var i = 0; i < $scope.propositos_dios.length; i++) {
		aux  = aux + $scope.propositos_dios[i].positivo;
		
	};
	$scope.data2[0].push(aux/$scope.propositos_dios.length);
	aux = 0;
	for (var i = 0; i < $scope.propositos_conmigo.length; i++) {
		aux  = aux + $scope.propositos_conmigo[i].positivo;
		
	};
	$scope.data2[0].push(aux/$scope.propositos_conmigo.length); 
	aux = 0;
	for (var i = 0; i < $scope.propositos_losDemas.length; i++) {
		aux  = aux + $scope.propositos_losDemas[i].positivo;
		
	};
	$scope.data2[0].push(aux/$scope.propositos_losDemas.length); 
	aux = 0;
	for (var i = 0; i < $scope.propositos_naturaleza.length; i++) {
		aux  = aux + $scope.propositos_naturaleza[i].positivo;
		
	};
	$scope.data2[0].push(aux/$scope.propositos_naturaleza.length); 
	aux = 0;
	for (var i = 0; i < $scope.propositos_pparticular.length; i++) {
		aux  = aux + $scope.propositos_pparticular[i].positivo;
		
	};


	$scope.data2[0].push(aux/$scope.propositos_pparticular.length);  

	
}// Fin de actualizar Reporte

$scope.actualizarReporte();


	//console.log($scope.data2 );

	$scope.getNumber = function(num) {
    return new Array(num);   
}




	});





