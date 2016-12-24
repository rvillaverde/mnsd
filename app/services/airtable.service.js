module.exports = ['$localStorage', '$q', function($localStorage, $q) {
  const cacheExpirationMilis = 15 * (60 * 1000);
  const API_KEY = 'keyNYtF8xtuTRnxkC';
  // DEV DB
  // const BASE_KEY = 'app6Zbo3SoOwWzvLZ';
  // PROD DV
  const BASE_KEY = 'appmZ8qSLjtQ5uevV';

  var airtable = require('airtable');
  airtable.configure({ apiKey: API_KEY });
  var base = airtable.base(BASE_KEY);

  function tableCached(table) {
    return false;
    if ($localStorage[table] && $localStorage[table].cachedAt) {
      var diff = Math.abs(new Date().getTime() - $localStorage[table].cachedAt);
      return cacheExpirationMilis > diff;
    } else {
      return false;
    }
  }

  function cacheTable(table, items) {
    //console.log('caching items from table: ' + table);
    $localStorage[table] = {};
    $localStorage[table].items = items;
    $localStorage[table].cachedAt = new Date().getTime();
  }

  var factory = {};

  factory.select = function(table, view, fields, sortBy) {
    if (tableCached(table)) {
      //console.log(table + ' cache ok');
      var defer = $q.defer();
      defer.resolve($localStorage[table].items);
      return defer.promise;
    } else {
      //console.log(table + ' not cached');
      return new Promise(function(resolve, reject) {
        var items = [];
        base(table).select({view: view, sort: sortBy}).eachPage(function(records, fetchNextPage) {
          records.forEach(function(record) {
            var item = _.reduce(fields, function(i, field) {i[field] = record.get(field); return i}, {});
            item.internalId = record.id;
            items.push(item);
          });
          fetchNextPage();
        },function() {
          cacheTable(table, items);
          resolve(items);
        });
      });
    }
  };

  factory.find = function(table, id, fields) {
    return new Promise(function(resolve, reject) {
      var item = {};
      base(table).find(id, function(error, record) {
        if (error) {
          console.log(error);
        } else {
          fields.forEach(function(field) { item[field] = record.get(field) });
        }
      },function() {
        resolve(item);
      });
    });
  };

  return factory;
}];
