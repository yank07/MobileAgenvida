angular.module("Agenvida.LoadingCtrl",["ionic"]).controller("LoadingCtrl",["$scope","$ionicLoading",function(n,o){n.show=function(){o.show({template:"Loading..."})},n.hide=function(){o.hide()}}]);