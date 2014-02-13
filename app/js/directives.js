'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text('hello');
            };
    }])
    .directive('txiGridTest', [function() {
         return {
            restrict: 'E',
            template: '<div class="gridStyle" ng-grid="gridB" style="height: 400px"></div>'
        };

    }])
    .directive('txiGrid', function() {
        return {
            restrict: 'E',
            template: '<div class="gridStyle" ng-grid="gridB" style="height: 400px"></div>',
            scope : { items : '=', cols : '=', selectedItems : '=', customOptions : '='},
            replace : true,
            transclude : false,
            controller : gridController
        };
        function gridController($scope, $attrs) {
            $scope.selectedItems = [];

            var customOptions = $scope.customOptions;

            var fixedOptions = {
                columnDefs  : 'cols',
                data        : 'items'
            };

            var defaultOptions = {
                selectedItems         : $scope.selectedItems,
                showSelectionCheckbox : true,
                showFooter            : true,
                filterOptions         : {
                    filterText        : '',
                    useExternalFilter : false
                }
            };

            $scope.options = {};

            angular.extend($scope.options, defaultOptions);
            angular.extend($scope.options, customOptions);
            angular.extend($scope.options, fixedOptions);

            $scope.$watch('search', function(value) {
              $scope.options.filterOptions.filterText = value;
            });
        };
    });

