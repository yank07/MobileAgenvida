angular.module("DateFilters",[]).filter("CeroDate",function(){return function(e){return 10>e?"0"+e:e}});