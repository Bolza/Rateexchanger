(function () {
    'use strict';

    angular
        .module('app.chart', [])
        .directive('chart', dirFunc);
    /* @ngInject */
    function dirFunc($compile) {
        return {
            scope: {
                chartData: '='
            },
            restrict: 'E',
            template: '',
            link: function(scope, element, attrs) {
                scope.$watch('chartData', function(newData) {
                    if (!newData) return;
                    c3.generate({
                        'bindto': element[0],
                        'padding': {
                            top: 40,
                            // right: 100,
                            bottom: 40,
                            // left: 100,
                        },
                        'axis': {
                            'x': {
                                type : 'timeseries',
                                tick : {
                                  format : "%Y-%m"
                                }
                            }
                        },
                        'data': newData
                    });
                });
            }
        };
    }
})();
