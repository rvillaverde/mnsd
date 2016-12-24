module.exports = function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      text: '=',
      classname: '@'
    },
    link: function(scope, element, attributes) {
      scope.$watch('text', function() {
        if(scope.text) {
          element.empty();
          var paragraphs = scope.text.split('\n');
          paragraphs.forEach(function(paragraph) {
            var paragraph = angular.element('<marked class="' + scope.classname + '">' + paragraph + '</marked>');
            element.append(paragraph);
            $compile(paragraph)(scope);
          });
        }
      });
    }
  }
}
