angular
  .module("Agenvida.controllerMarcacion", [
    "slugifier",
    "jett.ionic.content.banner",
    "ion-floating-menu"
  ])

  .controller("controllerMarcacion", function(
    $scope,
    $rootScope,
    $http,
    $state,
    $ionicHistory,
    $ionicSideMenuDelegate,
    $filter,
    $ionicModal,
    $ionicPopup,
    $ionicActionSheet,
    $window,
    $ionicLoading,
    $translate,
    $ionicContentBanner,
    $timeout,
    ionicMaterialInk,
    ionicMaterialMotion
  ) {
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
    /**************************************************/
    /**************** VARIABLES **********************/
    /*************************************************/

    $rootScope.banner = function(
      mensajes,
      intervalo,
      autoclose,
      type,
      transition
    ) {
      $ionicContentBanner.show({
        text: mensajes,
        interval: intervalo || 2000,
        autoClose: autoclose || 6000,
        type: type || "error", //info,
        transition: transition || "fade" // 'vertical'
      });
    };

    $ionicHistory.clearHistory();

    $scope.date = new Date();
    $scope.dia = ("0" + $scope.date.getDate()).slice(-2);
    $scope.mes = ("0" + ($scope.date.getMonth() + 1)).slice(-2);
    $scope.ano = $scope.date.getFullYear();
    $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;
    $scope.vinculaciones = [
      { id: 1, nombre: "Dios" },
      { id: 2, nombre: "Conmigo" },
      { id: 3, nombre: "Con los Demás" },
      { id: 4, nombre: "Con la Naturaleza" },
      { id: 7, nombre: "Propósitos Semanales" },
      { id: 8, nombre: "Propósitos Mensuales" }
    ];
    $scope.extras = [
      { id: 7, nombre: "Proposito Semanales" },
      { id: 8, nombre: "Proposito Mensuales" }
    ];
    $scope.propositoParticular = { id: 5, nombre: "Proposito Particular" };
    $scope.weekDaysList = $rootScope.dias_semana; // esto esta definido en app.js
    $scope.monthList = $rootScope.meses; // esto esta definido en app.js

    /***************************************************/
    /* Configuracion del Calendario para elegir fechas */
    /***************************************************/
    $scope.datepickerObject = {
      titleLabel: $translate.instant("elegir_dia"), //Optional
      todayLabel: $translate.instant("hoy"), //Optional
      closeLabel: $translate.instant("cerrar"), //Optional
      setLabel: $translate.instant("ir"), //Optional
      setButtonType: "button-assertive", //Optional
      todayButtonType: "button-assertive", //Optional
      inputDate: new Date(), //Optional
      mondayFirst: false, //Optional
      weekDaysList: $rootScope.dias_semana, //Optional
      monthList: $rootScope.meses, //Optional
      templateType: "modal", //Optional
      showTodayButton: "true", //Optional
      modalHeaderColor: "bar-positive", //Optional
      modalFooterColor: "bar-positive", //Optional
      from: new Date(2012, 1, 2), //Optional
      to: new Date(2100, 8, 25), //Optional
      callback: function(val) {
        //Mandatory

        if (val) {
          $scope.dia = ("0" + val.getDate()).slice(-2);
          $scope.mes = ("0" + (val.getMonth() + 1)).slice(-2);
          $scope.ano = val.getFullYear();

          $scope.date.setDate($scope.dia);
          $scope.date.setMonth($scope.mes - 1);
          $scope.date.setFullYear($scope.ano);
          $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;
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
      $http.get($rootScope.domain + "propositos/").then(
        function(result) {
          //si el get va bien
          $scope.propositos = result.data;
          $rootScope.propositos = result.data;
          $window.localStorage.propositos = JSON.stringify(result.data);
          $scope.pps = {};
          // $scope.pps = $filter('filter')($scope.propositos, { vinculacion: $scope.propositoParticular.id , mes_ano: ano + '-'+ mes +'-'  } )[0];
          $rootScope.LoadingHide();
          $timeout(function() {
            ionicMaterialInk.displayEffect();
            ionicMaterialMotion.ripple();
          }, 100);
        },
        function(result) {
          // algo salio mal #TODO volver a registrar
          if (result.statusText == "UNAUTHORIZED") {
            $rootScope.mensaje = "No autorizado";
            delete $window.localStorage.token;

            $state.go("signin");
          } else if (
            result.detail == "Invalid token header. No credentials provided."
          ) {
            delete $window.localStorage.token;
            $state.go("signin");
          } else {
            $rootScope.banner([
              $translate.instant("net_error"),
              $translate.instant("try_again")
            ]);
          }

          $rootScope.LoadingHide();
        }
      );
    }; // FIN GET PROPOSITOS

    /*************************************************/
    /******* Busco la fecha de la marcacion  ******** */

    /*************************************************/

    function searchFecha(myArray) {
      if (!myArray) {
        return null;
      }

      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].dia === $scope.fechaTotal) {
          return myArray[i];
        }
      }
    }

    $scope.editarPerfil = function(idioma) {
      var nacimiento = deformatearNacimiento(
        new Date($scope.perfil.nacimiento)
      );
      var data = angular.copy($scope.perfil);
      data.nacimiento = nacimiento;
      if (idioma) {
        data.idioma = idioma.codigo;
        $translate.use(idioma.codigo);
      }
      $http
        .put($rootScope.domain + "userProfile/", data)
        .then(function(result) {
          result.data.nacimiento = formatearNacimiento(result.data.nacimiento);
          $scope.perfil = result.data;
          $window.localStorage.perfil = JSON.stringify($scope.perfil);
          if (idioma) {
            $window.localStorage.language = idioma.codigo;
          }
        });
    };
    $scope.mostrarFAB = true;
    window.addEventListener("keyboardWillShow", function() {
      $scope.$apply(function() {
        $scope.mostrarFAB = false;
      });
    });

    window.addEventListener("keyboardDidHide", function() {
      $scope.$apply(function() {
        $scope.mostrarFAB = true;
      });
    });

    $scope.actualizar = function(fullrefresh) {
      $scope.getPropositos();
      if (fullrefresh) {
        $http.get($rootScope.domain + "userProfile/").then(function(result) {
          result.data.nacimiento = formatearNacimiento(result.data.nacimiento);
          $scope.perfil = result.data;
          $rootScope.perfil = result.data;
          $window.localStorage.perfil = JSON.stringify($scope.perfil);
        });
      } else {
        if ($window.localStorage.perfil && $window.localStorage.user) {
          $scope.propositos = JSON.parse($window.localStorage.propositos);
          $rootScope.perfil = JSON.parse($window.localStorage.perfil);

          $timeout(function() {
            ionicMaterialInk.displayEffect();
            ionicMaterialMotion.ripple();
          }, 100);
        } else {
          $scope.actualizar(true);
        }
      }
      ionicMaterialInk.displayEffect();

      $scope.$broadcast("scroll.refreshComplete");
    };

    ionicMaterialInk.displayEffect();

    /*************************************************/
    /* MARCO LOS NUEVOS MARCACIONES DE LOS PROPOSITOS */

    /*************************************************/
    $scope.marcar = function(proposito, valorMarcacion, sectionIndex, index) {
      /* busco si ya existe una marcacion de ese proposito en esa fecha */
      marcacion = searchFecha(proposito.marcaciones);
      /* Si ya hay una maracion, entonces actualizo */

      if (marcacion) {
        if (marcacion.cumplimiento !== valorMarcacion) {
          var data = angular.copy(marcacion);
          data.cumplimiento = valorMarcacion;

          /* Corroboro que realmente haya un cambio */
          /* Si hay un cambio entonces actualizo el valor en el servidor mediante un PUT*/
          // marcacion.loading = -1;

          $scope.loading = sectionIndex + "-" + index; //pongo loading hasta que llegue la respuesta

          $http
            .put($rootScope.domain + "marcaciones/" + marcacion.id + "/", data)
            .then(
              function(result) {
                // si todo va bien
                marcacion.cumplimiento = valorMarcacion;
                $window.localStorage.propositos = JSON.stringify(
                  $scope.propositos
                );

                $scope.loading = "";
              },
              function(result) {
                // por si algo sale mal
                $scope.loading = "";
                $rootScope.banner([
                  $translate.instant("net_error"),
                  $translate.instant("try_again")
                ]);
                // marcacion.cumplimiento = null;
              }
            );
        } //endif
      } //endif

      /* Si no hay marcacion entonces creo una nueva*/
      else {
        data = {
          dia: $scope.ano + "-" + $scope.mes + "-" + $scope.dia,
          cumplimiento: valorMarcacion,
          proposito: proposito.id
        };

        $scope.loading = sectionIndex + "-" + index; //pongo loading hasta que llegue la respuesta
        $http.post($rootScope.domain + "marcaciones/", data).then(
          function(result) {
            proposito.marcaciones.push(result.data);
            $scope.loading = ""; //pongo loading hasta que llegue la respuesta
            $window.localStorage.propositos = JSON.stringify($scope.propositos);
          },
          function() {
            // por si algo sale mal
            $scope.loading = "";
            $rootScope.banner([
              $translate.instant("net_error"),
              $translate.instant("try_again")
            ]);
          }
        );
      } /* Fin else*/
    }; //Fin funcion marcar

    /*********************************************/
    /* Funcion para aumentar y disminuir un dia con flechita */
    /*********************************************/

    $scope.diaUp = function() {
      $scope.tomorrow = new Date();
      $scope.tomorrow.setTime($scope.date.getTime() + 864e5);
      $scope.dia = ("0" + $scope.tomorrow.getDate()).slice(-2);
      $scope.mes = ("0" + ($scope.tomorrow.getMonth() + 1)).slice(-2);
      $scope.ano = $scope.tomorrow.getFullYear();
      $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;
      $scope.date.setTime($scope.tomorrow.getTime());
    };

    $scope.diaDown = function() {
      $scope.tomorrow = new Date();
      $scope.tomorrow.setTime($scope.date.getTime() - 864e5);
      $scope.dia = ("0" + $scope.tomorrow.getDate()).slice(-2);
      $scope.mes = ("0" + ($scope.tomorrow.getMonth() + 1)).slice(-2);
      $scope.ano = $scope.tomorrow.getFullYear();
      $scope.fechaTotal = $scope.ano + "-" + $scope.mes + "-" + $scope.dia;
      $scope.date.setTime($scope.tomorrow.getTime());
    };

    /*********************************************/
    /* FIN Funcion  aumentar un dia con flechita */
    /*********************************************/

    /**********************************************/
    /**** Crea nuevo proposito****/
    /*********************************************/
    $scope.CreateProposito = function(proposito) {
      console.log(proposito);
      var vinculacionID = proposito.id;
      $scope.PropositoNuevo = {
        vinculacion: vinculacionID,
        mes_ano: $scope.fechaTotal
      };

      $scope.propositos.push($scope.PropositoNuevo);
      $scope.shownGroup[vinculacionID] = true;
    };

    // Verifica si se está agregando un propósito
    $scope.estaAgregando = function() {
      var agregando = false;
      angular.forEach($scope.propositos, function(item) {
        if (!item.id) {
          agregando = true;
        }
      });
      return agregando;
    };

    // Variable utilizada para el input del proposito particular nuevo
    $scope.propositoParticularNuevo = { vinculacion: 5 };

    /**
     * Editar o agregar un propósito
     * @param proposito
     */
    $scope.editarProposito = function(proposito, vinculacionID, filtered) {
      if (proposito.id) {
        var data = {};
        data.proposito = proposito.proposito;
        data.id = proposito.id;
        data.mes_ano = proposito.mes_ano;
        if (proposito.proposito && proposito.proposito.trim() !== "") {
          $http
            .put($rootScope.domain + "propositos/" + proposito.id + "/", data)
            .then(function() {
              $window.localStorage.propositos = JSON.stringify(
                $scope.propositos
              );
            });
        } else {
          // Si ya existe y borra manualmente en el input
          $http
            .delete($rootScope.domain + "propositos/" + proposito.id + "/")
            .then(function() {
              $scope.index = $scope.propositos.indexOf(proposito);
              $scope.propositos.splice($scope.index, 1);
              $window.localStorage.propositos = JSON.stringify(
                $scope.propositos
              );
              if (filtered && filtered.length === 1) {
                $scope.shownGroup[vinculacionID] = false;
              }
            });
        }
      } else {
        if (proposito.proposito && proposito.proposito.trim() !== "") {
          var dataToSend;
          var esPropositoParticular = false;
          // Si es un proposito particular
          if (
            proposito.proposito === $scope.propositoParticularNuevo.proposito
          ) {
            esPropositoParticular = true;
            dataToSend = $scope.propositoParticularNuevo;
            dataToSend.vinculacion = proposito.vinculacion;
            dataToSend.mes_ano = $scope.fechaTotal;
          } else {
            dataToSend = proposito;
          }
          $rootScope.LoadingShow();

          $http.post($rootScope.domain + "propositos/", dataToSend).then(
            function(result) {
              if (esPropositoParticular) {
                $scope.propositos.push(result.data);
              } else {
                proposito = result.data;

                for (var i in $scope.propositos) {
                  if (!$scope.propositos[i].id) {
                    $scope.propositos[i].marcaciones = result.data.marcaciones;
                    $scope.propositos[i].id = result.data.id;
                    break; //Stop this loop, we found it!
                  }
                }
              }
              $window.localStorage.propositos = JSON.stringify(
                $scope.propositos
              );
              $rootScope.LoadingHide();
              $scope.shownGroup[proposito.vinculacion] = true;
              $scope.propositoParticularNuevo = { vinculacion: 5 };
            },
            function() {
              // por si algo sale mal
              $rootScope.banner([
                $translate.instant("net_error"),
                $translate.instant("try_again")
              ]);
              $rootScope.LoadingHide();
            }
          );
        } else {
          $scope.propositos = $scope.propositos.filter(function(item) {
            return item.id !== proposito.id;
          });
          if (filtered && filtered.length === 1) {
            $scope.shownGroup[vinculacionID] = false;
          }
        }
      }
    };

    $scope.showListaVacia = function(propositos, ano, mes) {
      if (propositos) {
        var filtrados = propositos.filter(function(proposito) {
          return (
            proposito.vinculacion !== null &&
            proposito.vinculacion !== 5 &&
            proposito.mes_ano.includes(ano + "-" + mes + "-")
          );
        });
        if (filtrados.length <= 0) {
          return true;
        }
      }

      return false;
    };
    /* FIN de POPUP */
    /**************************************************************************/
    /*****Muestro las opciones de edicion de un proposito al hacer doble tab***/
    /**************************************************************************/

    $scope.showOpciones = function(proposito, sectionIndex, index) {
      // Show the action sheet
      $ionicActionSheet.show({
        buttons: [
          {
            text:
              '<span class="icon ion-checkmark-circled mas-mark"></span>' +
              $translate.instant("si")
          },
          {
            text:
              '<span class="icon ion-close-circled menos-mark"></span>' +
              $translate.instant("no")
          },
          {
            text:
              '<span class="icon ion-ios-circle-outline neutro-mark"></span>' +
              $translate.instant("no_aplica")
          }
        ],
        destructiveText: $translate.instant("delete_mssg"),
        titleText: proposito.proposito,
        cancelText: $translate.instant("cancel"),
        destructiveButtonClicked: function() {
          //Cuando hago tap en eliminar
          $http
            .delete($rootScope.domain + "propositos/" + proposito.id + "/")
            .then(function() {
              $scope.index = $scope.propositos.indexOf(proposito);
              $scope.propositos.splice($scope.index, 1);
            });

          return true;
        },
        buttonClicked: function(button) {
          //cuando hago click en editar
          // delete proposito.marcaciones;
          switch (button) {
            case 0:
              $scope.marcar(proposito, 1, sectionIndex, index);
              break;
            case 1:
              $scope.marcar(proposito, 2, sectionIndex, index);
              break;
            case 2:
              $scope.marcar(proposito, 0, sectionIndex, index);
              break;
          }
          return true;
        }
      });
    };

    $scope.showOpcionesNuevo = function(vinculacion) {
      // Show the action sheet
      $ionicActionSheet.show({
        buttons: [
          {
            text:
              '<span class="icon icon-prayinghands"></span>' +
              $translate.instant("dios")
          },
          {
            text:
              '<span class="icon ion-person"></span>' +
              $translate.instant("conmigo")
          },
          {
            text:
              '<span class="icon ion-ios-people"></span>' +
              $translate.instant("con_los_demas")
          },
          {
            text:
              '<span class="icon ion-leaf"></span>' +
              $translate.instant("con_la_naturaleza")
          },
          {
            text:
              '<span class="icon ion-compose"></span>' +
              $translate.instant("propositos_semanales")
          },
          {
            text:
              '<span class="icon ion-calendar"></span>' +
              $translate.instant("propositos_mensuales")
          }
        ],
        titleText: $translate.instant("purposes"),
        cancelText: $translate.instant("cancel"),
        buttonClicked: function(button) {
          //cuando hago click en editar
          // delete proposito.marcaciones;
          switch (button) {
            case 0:
              $scope.CreateProposito(
                $scope.vinculaciones.filter(function(value) {
                  return value.id === 1;
                })[0]
              );
              break;
            case 1:
              $scope.CreateProposito(
                $scope.vinculaciones.filter(function(value) {
                  return value.id === 2;
                })[0]
              );
              break;
            case 2:
              $scope.CreateProposito(
                $scope.vinculaciones.filter(function(value) {
                  return value.id === 3;
                })[0]
              );
              break;
            case 3:
              $scope.CreateProposito(
                $scope.vinculaciones.filter(function(value) {
                  return value.id === 4;
                })[0]
              );
              break;
            case 4:
              $scope.CreateProposito(
                $scope.vinculaciones.filter(function(value) {
                  return value.id === 7;
                })[0]
              );
              break;
            case 5:
              $scope.CreateProposito(
                $scope.vinculaciones.filter(function(value) {
                  return value.id === 8;
                })[0]
              );
              break;
          }
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

    $scope.shownGroup = [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ];

    $scope.toggleGroup = function(group) {
      console.log(group);
      $scope.isGroupShown(group);
    };

    $scope.isGroupShown = function(group) {
      if ($scope.shownGroup[group.id] === true) {
        $scope.shownGroup[group.id] = false;
      } else {
        $scope.shownGroup[group.id] = true;
      }

      // return $scope.shownGroup === group.id;
    };

    // Fin de Acorderon

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.verPerfil = function() {
      $state.go("app.perfil");
    };

    $scope.verReporte = function() {
      $state.go("app.reporte-mensual");
    };

    $scope.verNotificaciones = function() {
      $state.go("app.notificaciones");
    };

    $scope.verSugerencias = function() {
      $scope.screen_width = $window.innerWidth;

      $state.go("app.sugerencias");
    };

    $scope.verEvangelio = function() {
      $state.go("app.evangelio");
    };

    $scope.showEvangelio = function() {
      return !ionic.Platform.isIOS();
    };

    $scope.verTelefono = function() {
      $state.go("app.telefono");
    };

    $scope.verMarcacion = function() {
      $state.go("app.marcacion");
    };

    $scope.verOraciones = function() {
      $state.go("app.oraciones");
    };

    $scope.abierto = false;

    $scope.toggleVisibility = function() {
      $scope.toggleGroupVisibility = !$scope.toggleGroupVisibility;
      $scope.abierto = true;
      $scope.toggle = true;
      $scope.desplegar();
    };

    $scope.clickPropositos = function() {
      if ($scope.toggleGroupVisibility) {
        $scope.desplegar();
        $scope.toggle = !$scope.toggle;
      }
    };

    $scope.desplegar = function() {
      if ($scope.abierto === true) {
        $scope.shownGroup = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true
        ];
        $scope.abierto = false;
      } else {
        $scope.shownGroup = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ];
        $scope.abierto = true;
      }
    };
  }); /* FIN AGENVIDACTRL*/
