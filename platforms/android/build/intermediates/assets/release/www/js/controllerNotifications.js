angular.module("Agenvida.controllerNotifications",[]).controller("controllerNotifications",["$scope","$ionicPlatform","$rootScope","$http","$window","$cordovaLocalNotification","$state","ionicTimePicker",function(t,i,e,n,o,c,a,r){i.ready(function(){ionic.Platform.isWebView()&&("iOS"===device.platform&&window.plugin.notification.local.promptForPermission(),cordova.plugins.notification.local.on("click",function(t,i){a.go("app.marcacion")},this),t.scheduleInstantNotification=function(){c.schedule({id:1,text:"Instant Notification",title:"Instant"}).then(function(){alert("Instant Notification set")})},t.scheduleDelayedNotification=function(){var t=(new Date).getTime(),i=new Date(t+5e3);c.schedule({id:2,at:i,text:"Notification After 5 Seconds Has Been Triggered",title:"After 5 Seconds"}).then(function(t){})},t.scheduleEveryMinuteNotification=function(t){c.schedule({id:3,title:"Hora de tu HE",text:"Acordate de marcar tus propositos",every:"minute",firstAt:new Date(1e3*t)},function(){o.plugin.notification.local.update({id:3,title:"Hora de tu HE",text:"Acordate de marcar tus propositos",every:"minute",firstAt:new Date(1e3*t)})}).then(function(t){})},t.updateNotificationText=function(){c.isPresent(3).then(function(t){t?c.update({id:3,title:"Notificaton  Update",text:"Notification Update Details"}).then(function(t){}):alert("Must Schedule Every Minute First")})},t.updateNotificationEvery=function(){c.isPresent(3).then(function(t){t?c.update({id:3,title:"Hora de tu HE",text:"Acordate de marcar tus propositos",every:"second"}).then(function(t){}):alert("Must Schedule Every Minute First")})},t.cancelNotification=function(){c.isPresent(3).then(function(i){i?c.cancel(3).then(function(i){alert("Cancelled Every Minute"),t.notificacion="not_set",o.localStorage.notificacion=JSON.stringify(t.notificacion)}):alert("Must Schedule Every Minute First")})}),o.localStorage.notificacion?t.notificacion=JSON.parse(o.localStorage.notificacion):t.notificacion="not_set",t.openTimePicker1=function(){var i={callback:function(i){if("undefined"==typeof i);else{var e=new Date(1e3*i);t.scheduleEveryMinuteNotification(i),t.minutos=e.getUTCMinutes(),e.getUTCMinutes()<10&&(t.minutos="0"+e.getUTCMinutes()),t.notificacion=e.getUTCHours()+":"+t.minutos,o.localStorage.notificacion=JSON.stringify(t.notificacion)}},inputTime:50400,format:12,step:10,setLabel:"Elegir",closeLabel:"Cerrar"};r.openTimePicker(i)}})}]);