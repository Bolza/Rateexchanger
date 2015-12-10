(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', ctrlFunc);

    /* @ngInject */
    function ctrlFunc(rates, $scope) {
        /*jshint validthis: true */
        var vm = this;
        var selectedCurrencies = ['GBP', 'USD'];
        vm.allCurrencies = {};
        vm.currentBase = 'EUR'
        vm.selectBase = selectBase;
        vm.onCurrencySelected = onCurrencySelected;

        function activate() {
            vm.allCurrencies = generateCurrenciesList();
            drawChart();
        }

        function drawChart() {
            rates.setCurrencies(selectedCurrencies);
            rates.setBase(vm.currentBase);

            rates.get().then(function(res) {
                setChartData(res)
            });
        }

        function setChartData(data) {
            var chartData = getCleanChartData();
            for (var i = 0; i < data.length; i++) {
                var hist = data[i];
                hist.rates.date = hist.date;
                chartData.json.push(hist.rates);
            }

            vm.currentData = chartData;
        }
        function selectBase(name) {
            vm.currentBase = name;
            activate();
        }
        function onCurrencySelected(name) {
            var selections = [];
            for (var k in vm.allCurrencies) {
                if (vm.allCurrencies[k]) {
                    selections.push(k);
                }
            }
            selectedCurrencies = selections;
            drawChart();
        }

        function generateCurrenciesList() {
            var allCurrencies = ['EUR', 'GBP', 'USD', 'AUD','BGN','BRL','CAD',
            'CHF','CNY','CZK','DKK','HKD','HRK','HUF','IDR','ILS','INR','JPY',
            'KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RUB','SEK','SGD',
            'THB','TRY','ZAR'];
            var curObj = {};
            for (var i = 0; i < allCurrencies.length; i++) {
                curObj[allCurrencies[i]] = selectedCurrencies.indexOf(allCurrencies[i]) > -1;
            }
            delete curObj[vm.currentBase];
            return curObj;
        }

        function getCleanChartData() {
            return {
                'json': [],
                'type': 'line',
                'keys': {
                    'value': selectedCurrencies,
                    'x': 'date'
                },
                'labels': true
            };
        }

        activate();

    }
})();
