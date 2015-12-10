(function() {
    'use strict';

    angular
        .module('app')
        .factory('rates', factory);

    /* @ngInject */
    // factory.$inject = ['$resource'];
    function factory($resource, $q) {
        var config = {
            base: 'EUR',
            currencies: ['GBP'],
            dataLength: 12
        }
        var url = 'http://api.fixer.io/:date?base=:base&symbols=:currencies';
        var please = $resource(url);
        var defer;
        var results = [];
        var errors = [];

        var service = {
            get: getRates,
            setCurrencies: setCurrencies,
            setBase: setBase
        };

        return service;

        function setCurrencies(currencies) {
            config.currencies = currencies;
        }
        function setBase(base) {
            config.base = base;
        }
        function getRates() {
            defer = $q.defer();
            for (var i = config.dataLength; i > 0; i--) {
                var d = new Date();
                d.setMonth(d.getMonth() - i);
                // getMonth returns 0-11, so we have to add 1
                // also month and day must be 0 based
                var dd = [
                    d.getFullYear(),
                    ('0' + (d.getMonth() + 1)).slice(-2),
                    ('0' + d.getDate()).slice(-2),
                ].join('-');
                $resource(url).get({
                    'date': dd,
                    'base': config.base,
                    'currencies': config.currencies.join(','),
                }).$promise.then(addResult, addResult);
            }
            return defer.promise;
        }
        function addResult(res) {
            if (typeof res.rates === 'undefined') {
                errors.push(res);
            }
            else {
                results.push(res);
            }
            if (results.length + errors.length >= config.dataLength) {
                defer.resolve(results);
                results = []; errors = [];
            }
        }

    }
}());
