angular.module("Agenvida.controllerMarcacion",["slugifier","jett.ionic.content.banner","ion-floating-menu"]).controller("controllerMarcacion",["$scope","$rootScope","$http","$state","$ionicHistory","$ionicSideMenuDelegate","$filter","$ionicModal","$ionicPopup","$ionicActionSheet","$window","$ionicLoading","$translate","$ionicContentBanner","$timeout","ionicMaterialInk","ionicMaterialMotion",function(o,t,e,i,n,a,r,s,p,c,l,d,u,m,g,f,h){function b(t){for(var e=0;e<t.length;e++)if(t[e].dia===o.fechaTotal)return t[e]}t.banner=function(o,t,e,i,n){m.show({text:o,interval:t||2e3,autoClose:e||6e3,type:i||"error",transition:n||"fade"})},n.clearHistory(),o.date=new Date,o.dia=("0"+o.date.getDate()).slice(-2),o.mes=("0"+(o.date.getMonth()+1)).slice(-2),o.ano=o.date.getFullYear(),o.fechaTotal=o.ano+"-"+o.mes+"-"+o.dia,o.showInput=[!1,!1,!1,!1,!1],o.NuevoProposito=["","","",""],o.vinculaciones=[{id:1,nombre:"Dios"},{id:2,nombre:"Conmigo"},{id:3,nombre:"Con los Demás"},{id:4,nombre:"Con la Naturaleza"},{id:7,nombre:"Propósitos Semanales"},{id:8,nombre:"Propósitos Mensuales"}],o.extras=[{id:7,nombre:"Proposito Semanales"},{id:8,nombre:"Proposito Mensuales"}],o.propositoParticular={id:5,nombre:"Proposito Particular"},o.weekDaysList=t.dias_semana,o.monthList=t.meses,o.datepickerObject={titleLabel:"Elegir día",todayLabel:"Hoy",closeLabel:"Cerrar",setLabel:"Ir",setButtonType:"button-assertive",todayButtonType:"button-assertive",inputDate:new Date,mondayFirst:!1,weekDaysList:o.weekDaysList,monthList:o.monthList,templateType:"modal",showTodayButton:"true",modalHeaderColor:"bar-positive",modalFooterColor:"bar-positive",from:new Date(2012,1,2),to:new Date(2018,8,25),callback:function(t){t&&(o.dia=("0"+t.getDate()).slice(-2),o.mes=("0"+(t.getMonth()+1)).slice(-2),o.ano=t.getFullYear(),o.date.setDate(o.dia),o.date.setMonth(o.mes-1),o.date.setFullYear(o.ano),o.fechaTotal=o.ano+"-"+o.mes+"-"+o.dia)}},o.getPropositos=function(){t.LoadingShow(),e.get(t.domain+"propositos/").then(function(e){o.propositos=e.data,t.propositos=e.data,l.localStorage.propositos=JSON.stringify(e.data),o.pps={},t.LoadingHide(),f.displayEffect()},function(o){"UNAUTHORIZED"==o.statusText?(t.mensaje="No autorizado",delete l.localStorage.token,i.go("signin")):"Invalid token header. No credentials provided."==o.detail?(delete l.localStorage.token,i.go("signin")):t.banner([u.instant("net_error"),u.instant("try_again")]),t.LoadingHide()})},o.actualizar=function(i){1==i?(o.getPropositos(),e.get(t.domain+"userProfile/").then(function(e){t.perfil=e.data,l.localStorage.perfil=JSON.stringify(o.perfil)})):l.localStorage.perfil&&l.localStorage.user?(o.propositos=JSON.parse(l.localStorage.propositos),t.perfil=JSON.parse(l.localStorage.perfil),g(function(){f.displayEffect()},50)):actualizar(!0),f.displayEffect(),o.$broadcast("scroll.refreshComplete")},f.displayEffect(),o.marcar=function(i,n,a,r){marcacion=b(i.marcaciones),marcacion?marcacion.cumplimiento!=n&&(o.loading=a+"-"+r,e.put(t.domain+"marcaciones/"+marcacion.id+"/",marcacion).then(function(t){marcacion.cumplimiento=n,l.localStorage.propositos=JSON.stringify(o.propositos),o.loading="",marcacion.cumplimiento=n},function(e){o.loading="",t.banner([u.instant("net_error"),u.instant("try_again")])})):(data={dia:o.ano+"-"+o.mes+"-"+o.dia,cumplimiento:n,proposito:i.id},o.loading=a+"-"+r,e.post(t.domain+"marcaciones/",data).then(function(t){i.marcaciones.push(t.data),o.loading="",l.localStorage.propositos=JSON.stringify(o.propositos)},function(e){o.loading="",t.banner([u.instant("net_error"),u.instant("try_again")])}))},o.diaUp=function(){o.tomorrow=new Date,o.tomorrow.setTime(o.date.getTime()+864e5),o.dia=("0"+o.tomorrow.getDate()).slice(-2),o.mes=("0"+(o.tomorrow.getMonth()+1)).slice(-2),o.ano=o.tomorrow.getFullYear(),o.fechaTotal=o.ano+"-"+o.mes+"-"+o.dia,o.date.setTime(o.tomorrow.getTime())},o.diaDown=function(){o.tomorrow=new Date,o.tomorrow.setTime(o.date.getTime()-864e5),o.dia=("0"+o.tomorrow.getDate()).slice(-2),o.mes=("0"+(o.tomorrow.getMonth()+1)).slice(-2),o.ano=o.tomorrow.getFullYear(),o.fechaTotal=o.ano+"-"+o.mes+"-"+o.dia,o.date.setTime(o.tomorrow.getTime())},o.CreateProposito=function(i){o.PropositoNuevo={vinculacion:i,mes_ano:o.fechaTotal};p.show({template:'<input type="text" ng-model="PropositoNuevo.proposito">',title:u.instant("create_p"),subTitle:u.instant("add_p_message"),scope:o,buttons:[{text:u.instant("cancel")},{text:"<b>"+u.instant("save")+"</b>",type:"button-positive",onTap:function(i){""==o.PropositoNuevo.proposito?i.preventDefault():(t.LoadingShow(),e.post(t.domain+"propositos/",o.PropositoNuevo).then(function(e){o.propositos.push(e.data),l.localStorage.propositos=JSON.stringify(o.propositos),t.LoadingHide()},function(o){t.banner([u.instant("net_error"),u.instant("try_again")]),t.LoadingHide()}))}}]})},o.showOpciones=function(i){c.show({buttons:[{text:"<b>"+u.instant("edit")+"</b>"}],destructiveText:u.instant("delete_mssg"),titleText:u.instant("edit_p"),cancelText:u.instant("cancel"),cancel:function(){return!0},destructiveButtonClicked:function(){return e["delete"](t.domain+"propositos/"+i.id+"/").then(function(){o.index=o.propositos.indexOf(i),o.propositos.splice(o.index,1)}),!0},buttonClicked:function(){o.editProposito={},o.editProposito.id=i.id,o.editProposito.proposito=i.proposito,o.editProposito.mes_ano=i.mes_ano;p.show({template:'<input type="text" ng-model="editProposito.proposito">',title:u.instant("create_p"),subTitle:u.instant("add_p_message"),scope:o,buttons:[{text:u.instant("cancel")},{text:"<b>"+u.instant("save")+"</b>",type:"button-positive",onTap:function(n){""==i.proposito?n.preventDefault():e.put(t.domain+"propositos/"+o.editProposito.id+"/",o.editProposito).then(function(o){i.proposito=o.data.proposito})}}]});return!0}})},o.shownGroup=[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],o.toggleGroup=function(t){o.isGroupShown(t),h.ripple({selector:"#listaproposito"})},o.isGroupShown=function(t){1==o.shownGroup[t.id]?o.shownGroup[t.id]=!1:o.shownGroup[t.id]=!0},o.toggleLeft=function(){a.toggleLeft()},o.verPerfil=function(){i.go("app.perfil")},o.verReporte=function(){i.go("app.reporte-mensual")},o.verSugerencias=function(){o.screen_width=l.innerWidth,i.go("app.sugerencias")},o.verEvangelio=function(){i.go("app.evangelio")},o.verTelefono=function(){i.go("app.telefono")},o.verMarcacion=function(){i.go("app.marcacion")},o.verOraciones=function(){i.go("app.oraciones")},o.abierto=!1,o.desplegar=function(){1==o.abierto?(o.shownGroup=[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],o.abierto=!1):(o.shownGroup=[!1,!1,!1,!1,!1,!1,!1,!1],o.abierto=!0)}}]);