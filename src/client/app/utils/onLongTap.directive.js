(function () {
    'use strict';

    angular
        .module('app.utils', [])
        .directive('onLongTap', dirFunc);
    /* @ngInject */
    function dirFunc($timeout) {
        return {
            scope: {
                onLongTap: '&',
                onTouchEnd: '&'
            },
            restrict: 'A',
            link: function($scope, $elm, $attrs) {
                $elm.bind('mousedown', function(evt) {
    				$scope.longTap = true;

    				$timeout(function() {
    					if ($scope.longTap) {
    						$scope.$apply(function() {
    							$scope.onLongTap.apply(this);
    						});
    					}
    				}, 600);
    			});

    			$elm.bind('mouseup', function(evt) {
    				$scope.longTap = false;
    				if ($attrs.onTouchEnd) {
    					$scope.$apply(function() {
    						$scope.onTouchEnd.apply(this);
    					});
    				}
    			});
            }
        };
    }
})();
