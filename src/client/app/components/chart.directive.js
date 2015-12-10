(function () {
    'use strict';

    angular
        .module('app.chart', [])
        .directive('chart', dirFunc);
    /* @ngInject */

    function getChartConfig(newData) {
        return {
            'data': newData,
            'padding': {
                top: 40, bottom: 40,
            },
            'axis': {
                'x': {
                    type : 'timeseries',
                    tick : { format : "%Y-%m" }
                },
                'y': {
                    tick : { format : d3.format('.2g')}
                }
            },
        }
    }

    function difference(base, cmp) {
        var old = base.keys.value;
        var young = cmp.keys.value;
        var removed = _.filter(old, function(e) {
            return young.indexOf(e) === -1;
        });
        return removed;
    }

    function dirFunc($compile) {
        return {
            scope: {
                chartData: '='
            },
            restrict: 'E',
            template: '',
            link: function(scope, element, attrs) {
                var chart;
                scope.$watch('chartData', function(newData, oldData) {
                    if (!newData) return;
                    if (!chart) {
                        chart = c3.generate(getChartConfig(newData));
                    }
                    else {
                        var removed = difference(oldData, newData);
                        newData.unload = removed;
                        chart.load(newData);
                    }
                });
            }
        };
    }
})();
