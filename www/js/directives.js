angular.module("Agenvida.focusMe", []).directive("focusMe", function($timeout) {
  return {
    link: function(scope, element, attrs) {
      if (!attrs.focusMe) {
        $timeout(function() {
          element[0].focus();
        }, 750);
      }
    }
  };
});
