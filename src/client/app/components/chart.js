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
                // console.log(scope, element, attrs);
                scope.$watch('chartData', function(newData) {
                    if (!newData) return;
                    c3.generate({
                        'bindto': element[0],
                        'axis': {
                            'x': {
                                type: 'category',
                                multiline: false
                            }
                        },
                        'data': newData
                    });
                });
            }
        };
    }
})();
