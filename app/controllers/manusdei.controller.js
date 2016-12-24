module.exports = ['$scope', '$http', '$translate', 'newsService',
  function($scope, $http, $translate, newsService) {

    $scope.loadingNews = true;
    newsService.getNews()
    .then(function(news) {
      $scope.news = news;
      console.log(news);
      $scope.loading = true;
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    });

    $scope.supportedLanguages = {
      es: 'Español',
      en: 'English',
      it: 'Italiano'
    };

    $scope.selectedLanguage = $translate.use();

    $scope.changeLanguage = function(key) {
      console.log('changeLanguage');
      $translate.use(key);
      $scope.selectedLanguage = key;
    };

    $scope.contact = {};

    $scope.validateEmail = function() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test($scope.contact.email);
    }

    $scope.validateContact = function() {
      return !!$scope.contact.name
        && !!$scope.contact.email
        && $scope.validateEmail()
        && !!$scope.contact.message;
    }

    $scope.sendContactEmail = function() {
      console.log('sendContactEmail');

      if(!$scope.validateContact()) {
        console.log('invalid contact');
        return;
      }

      var req = {
        method: 'POST',
        url: '/send',
        data: $scope.contact,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      $http(req).
      then(function success(resp) {
        $(".success-message").fadeIn(200);
        $(".error-message").hide();
      }, function error(resp) {
        $(".error-message").fadeIn(200);
        $(".success-message").hide();
      });
    }

}];
