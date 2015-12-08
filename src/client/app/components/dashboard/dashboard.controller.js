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
                var chartData = getCleanChartData();
                for (var i = 0; i < res.length; i++) {
                    var hist = res[i];
                    hist.rates.date = hist.date;
                    chartData.json.push(hist.rates);
                }
                vm.currentData = chartData;
            });
        }

        function getCleanChartData() {
            return {
                'json': [],
                'type': 'line',
                'keys': {
                    'value': currencies,
                    'x': 'date'
                },
                'labels': true
            };
        }

        activate();

    }
})();
