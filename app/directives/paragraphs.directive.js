module.exports = function() {
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
            element.append('<p class="' + scope.classname + '">' + paragraph + '</p>');
          });
        }
      });
    }
  }
}
