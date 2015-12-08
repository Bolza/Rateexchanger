(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', ctrlFunc);

    /* @ngInject */
    function ctrlFunc(rates, $scope) {
        /*jshint validthis: true */
        var vm = this;
        var currencies = ['GBP', 'USD'];
        vm.currentBase = 'EUR'
        rates.setCurrencies(currencies);
        rates.setBase(vm.currentBase);
        function activate() {
            rates.get().then(function(res) {
                var chartData = {
                    'rows': [['x'].concat(currencies)],
                    // 'columns': ['x', 'a', "b", 'c', 'd'],
                    // 'json': [],
                    'type': 'line',
                    'keys': {
                        // value: currencies
                        value: ['GBP', 'USD', 'x']
                    },
                    // 'xFormat': '%Y-%m-%d %H:%M:%S',
                    'labels': true,
                    'x': 'x'
                };
                // chartData.rows.push(currencies.concat('date'))

                for (var i = 0; i < res.length; i++) {
                    var hist = res[i];
                    chartData.rows.push([hist.date, hist.rates.GBP, hist.rates.USD]);

                    // hist.rates.x = hist.date;
                    // chartData.json[hist.date] = hist.rates;
                    // chartData.rows.push(hist.rates);
                }
                vm.currentData = chartData;
                /*
                vm.currentData = {
                    'json': chartData,
                    'labels': true,
                    // 'date': 'x',
                    // 'axis' : {
                    //     'x' : {
                    //         type: 'timeseries'
                    //     }
                    // },
                    'keys': {
                        value: currencies
                    }
                };
                */
                console.log('data', vm.currentData);
            });
        }


        activate();

    }
})();
