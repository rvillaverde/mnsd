module.exports = ['airtableService', function(airtableService) {
  const fields = ['id', 'fecha', 'lang', 'titulo', 'texto', 'mostrar'];
  const sortBy = [{field: 'fecha', direction: 'desc'}];

  function filterNews(news) {
    return news.mostrar;
  }

  function requestNews() {
    return airtableService.select('Noticias', 'Web', fields, sortBy)
    .then(function(entries) {
      return _.filter(entries, 
        function(news) { return filterNews(news); });
    });
  }

  var factory = {};

  factory.getNews = function() {
    return requestNews();
  }

  factory.getNewsById = function(id) {
    return factory.getNews().then(function(news) {
      return _.find(news, { id: id });
    });
  }

  return factory;
}];
