'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', function($scope) {
        $scope.dataA = [{'A': 1543, 'B': 'Customer A', 'C': 'Location A', 'D': 1},
                            {'A': 1566, 'B': 'Customer B', 'C': 'Location B', 'D': 5},
                            {'A': 1754, 'B': 'Customer A', 'C': 'Location C', 'D': 9},
                            {'A': 1841, 'B': 'Customer C', 'C': 'Location D',  'D': 6},
                            {'A': 1345, 'B': 'Customer A', 'C': 'Location E', 'D': 3}
                        ];
        $scope.dataB = [{'A': 1543, 'B': 'Customer A', 'C': 'Location A', 'D': 'Acknowledged', 'E': 15},
                            {'A': 1566, 'B': 'Customer B', 'C': 'Location B', 'D': 'Acknowledged', 'E': 12},
                            {'A': 1754, 'B': 'Customer A', 'C': 'Location C', 'D': 'Acknowledged', 'E': 36},
                            {'A': 1841, 'B': 'Customer C', 'C': 'Location D', 'D': 'Acknowledged',  'E': 24},
                            {'A': 1345, 'B': 'Customer A', 'C': 'Location E', 'D': 'Acknowledged', 'E': 32}
                        ];

        $scope.gridA = { data : 'dataA',
                        columnDefs: [{field:'A', displayName: 'Order #'},
                                    {field:'B', displayName: 'Customer'},
                                    {field:'C', displayName: 'Location'},
                                    {field:'D', displayName: 'Priority', cellTemplate: '<div ng-class="{highPriority: row.getProperty(col.field) < 5}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'}
                                    ],
                        enablePaging: true,
                        showFooter: true,
                        totalServerItems: 'totalServerItemsA',
                        pagingOptions: $scope.pagingOptionsA,
                        filterOptions: $scope.filterOptionsA,
                        showColumnMenu: true,
                        showSelectionCheckbox: true,
                        selectWithCheckboxOnly: true,
                        displaySelectionCheckbox: true,
                        keepLastSelected: false,
                        enableColumnResize: true,
                        enableColumnReordering: true,
                        toggleSelectAll: false,
                        allSelected: false,
                        tabIndex: 0
                        };

        $scope.gridB = { data : 'dataB',
                        columnDefs: [{field:'A', displayName: 'Order #', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'B', displayName: 'Customer', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'C', displayName: 'Location', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'D', displayName: 'Status', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'E', displayName: 'Minutes', cellTemplate: '<div title="{{row.getProperty(col.field)}}" ng-class="{highPriority: row.getProperty(col.field) > 30}"><div title="{{row.getProperty(col.field)}}" class="ngCellText">{{row.getProperty(col.field)}}</div></div>'}
                                    ],
                        enablePaging: true,
                        showFooter: true,
                        totalServerItems: 'totalServerItemsB',
                        pagingOptions: $scope.pagingOptionsB,
                        filterOptions: $scope.filterOptionsB,
                        showColumnMenu: true,
                        enableColumnResize: true,
                        tabIndex: 1};

        $scope.filterOptionsA = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItemsA = 0;
        $scope.pagingOptionsA = {
            pageSizes: [250, 500, 1000],
            pageSize: 250,
            currentPage: 1
        };

        $scope.setPagingDataA = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.dataA = pagedData;
            $scope.totalServerItemsA = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsyncA = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    /*$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingDataA(data,page,pageSize);
                    });*/
                } else {
                    /*$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        $scope.setPagingDataA(largeLoad,page,pageSize);
                    });*/
                }
            }, 100);
        };

        $scope.getPagedDataAsyncA($scope.pagingOptionsA.pageSize, $scope.pagingOptionsA.currentPage);

        $scope.$watch('pagingOptionsA', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
              $scope.getPagedDataAsyncA($scope.pagingOptionsA.pageSize, $scope.pagingOptionsA.currentPage, $scope.filterOptionsA.filterText);
            }
        }, true);
        $scope.$watch('filterOptionsA', function (newVal, oldVal) {
            if (newVal !== oldVal) {
              $scope.getPagedDataAsyncA($scope.pagingOptionsA.pageSize, $scope.pagingOptionsA.currentPage, $scope.filterOptionsA.filterText);
            }
        }, true);

        $scope.filterOptionsB = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItemsB = 0;
        $scope.pagingOptionsB = {
            pageSizes: [250, 500, 1000],
            pageSize: 250,
            currentPage: 1
        };

        $scope.setPagingDataB = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.dataB = pagedData;
            $scope.totalServerItemsB = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsyncB = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    /*$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingDataB(data,page,pageSize);
                    });*/
                } else {
                    /*$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        $scope.setPagingDataB(largeLoad,page,pageSize);
                    });*/
                }
            }, 100);
        };

        $scope.getPagedDataAsyncB($scope.pagingOptionsB.pageSize, $scope.pagingOptionsB.currentPage);

        $scope.$watch('pagingOptionsB', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
              $scope.getPagedDataAsyncB($scope.pagingOptionsB.pageSize, $scope.pagingOptionsB.currentPage, $scope.filterOptionsB.filterText);
            }
        }, true);
        $scope.$watch('filterOptionsB', function (newVal, oldVal) {
            if (newVal !== oldVal) {
              $scope.getPagedDataAsyncB($scope.pagingOptionsB.pageSize, $scope.pagingOptionsB.currentPage, $scope.filterOptionsB.filterText);
            }
        }, true);


  }])
  .controller('MyCtrl2', ['$scope'/*, 'gridSettingsService'*/, function($scope/*, gridSettingsService*/) {
        $scope.titleA = "Dispatches";

                  /*$scope.gridSettings = function () {
            gridSettingsService.showModal();
        };*/

        $scope.dataA = [{'A': 1543, 'B': 'Customer A', 'C': 'Location A', 'D': 1},
                            {'A': 1566, 'B': 'Customer B', 'C': 'Location B', 'D': 5},
                            {'A': 1754, 'B': 'Customer A', 'C': 'Location C', 'D': 9},
                            {'A': 1841, 'B': 'Customer C', 'C': 'Location D',  'D': 6},
                            {'A': 1345, 'B': 'Customer A', 'C': 'Location E', 'D': 3}
                        ];
        $scope.dataB = [{'A': 1543, 'B': 'Customer A', 'C': 'Location A', 'D': 'Acknowledged', 'E': 15},
                            {'A': 1566, 'B': 'Customer B', 'C': 'Location B', 'D': 'Acknowledged', 'E': 12},
                            {'A': 1754, 'B': 'Customer A', 'C': 'Location C', 'D': 'Acknowledged', 'E': 36},
                            {'A': 1841, 'B': 'Customer C', 'C': 'Location D', 'D': 'Acknowledged',  'E': 24},
                            {'A': 1345, 'B': 'Customer A', 'C': 'Location E', 'D': 'Acknowledged', 'E': 32}
                        ];

        $scope.gridA = { data : 'dataA',
                        columnDefs: [{field:'A', displayName: 'Order #'},
                                    {field:'B', displayName: 'Customer'},
                                    {field:'C', displayName: 'Location'},
                                    {field:'D', displayName: 'Priority', cellTemplate: '<div ng-class="{highPriority: row.getProperty(col.field) < 5}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'}
                                    ],
                        showColumnMenu: true,
                        showSelectionCheckbox: true,
                        selectWithCheckboxOnly: true,
                        displaySelectionCheckbox: true,
                        keepLastSelected: false,
                        enableColumnResize: true,
                        enableColumnReordering: true,
                        toggleSelectAll: false,
                        allSelected: false,
                        tabIndex: 0,
                        enablePaging: true,
                        showFooter: false,
                        totalServerItems: 'totalServerItemsA',
                        pagingOptions: $scope.pagingOptionsA,
                        filterOptions: $scope.filterOptionsA
                        };

        $scope.gridB = { data : 'dataB',
                        columnDefs: [{field:'A', displayName: 'Order #', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'B', displayName: 'Customer', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'C', displayName: 'Location', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'D', displayName: 'Status', cellTemplate: '<div class="ngCellText" title="{{row.getProperty(col.field)}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'},
                                    {field:'E', displayName: 'Minutes', cellTemplate: '<div title="{{row.getProperty(col.field)}}" ng-class="{highPriority: row.getProperty(col.field) > 30}"><div title="{{row.getProperty(col.field)}}" class="ngCellText">{{row.getProperty(col.field)}}</div></div>'}
                                    ],
                        showColumnMenu: true,
                        enableColumnResize: true,
                        tabIndex: 1};

        var grid = $scope.gridA;

        $scope.totalServerItems = grid.data.length;

        $scope.maxRows = function () {
            var ret = Math.max($scope.totalServerItems, grid.data.length);
            return ret;
        };

        $scope.multiSelect = (grid.enableRowSelection && grid.multiSelect);
        $scope.selectedItemCount = grid.selectedItemCount;
        $scope.maxPages = function () {
            return Math.ceil($scope.maxRows() / $scope.pagingOptions.pageSize);
        };

        $scope.pageForward = function() {
            var page = $scope.pagingOptions.currentPage;
            if ($scope.totalServerItems > 0) {
                $scope.pagingOptions.currentPage = Math.min(page + 1, $scope.maxPages());
            } else {
                $scope.pagingOptions.currentPage++;
            }
        };

        $scope.pageBackward = function() {
            var page = $scope.pagingOptions.currentPage;
            $scope.pagingOptions.currentPage = Math.max(page - 1, 1);
        };

        $scope.pageToFirst = function() {
            alert('hello');
            $scope.pagingOptions.currentPage = 1;
        };

        $scope.pageToLast = function() {
            var maxPages = $scope.maxPages();
            $scope.pagingOptions.currentPage = maxPages;
        };

        $scope.cantPageForward = function() {
            var curPage = $scope.pagingOptions.currentPage;
            var maxPages = $scope.maxPages();
            if ($scope.totalServerItems > 0) {
                return curPage >= maxPages;
            } else {
                return grid.data.length < 1;
            }

        };
        $scope.cantPageToLast = function() {
            if ($scope.totalServerItems > 0) {
                return $scope.cantPageForward();
            } else {
                return true;
            }
        };

        $scope.cantPageBackward = function() {
            var curPage = $scope.pagingOptions.currentPage;
            return curPage <= 1;
        };

        $scope.filterOptionsA = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItemsA = $scope.dataA.length;
        $scope.pagingOptionsA = {
            pageSizes: [250, 500, 1000],
            pageSize: 250,
            currentPage: 1,
            numPages: 1,
            numRecords: 5
        };

        $scope.setPagingDataA = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.dataA = pagedData;
            $scope.totalServerItemsA = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsyncA = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    /*$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingDataA(data,page,pageSize);
                    });*/
                } else {
                    /*$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                        $scope.setPagingDataA(largeLoad,page,pageSize);
                    });*/
                }
            }, 100);
        };

        $scope.getPagedDataAsyncA($scope.pagingOptionsA.pageSize, $scope.pagingOptionsA.currentPage);

        $scope.$watch('pagingOptionsA', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
              $scope.getPagedDataAsyncA($scope.pagingOptionsA.pageSize, $scope.pagingOptionsA.currentPage, $scope.filterOptionsA.filterText);
            }
        }, true);
        $scope.$watch('filterOptionsA', function (newVal, oldVal) {
            if (newVal !== oldVal) {
              $scope.getPagedDataAsyncA($scope.pagingOptionsA.pageSize, $scope.pagingOptionsA.currentPage, $scope.filterOptionsA.filterText);
            }
        }, true);



  }])
.controller('NavBar', ['$scope', '$location', function($scope, $location) {
    $scope.viewsAvailable = [{'url':'#/view1', 'description':'View 1'},
                {'url':'#/view2', 'description':'View 2'}];
    $scope.settingsAvailable = {'general': [{'url':'#/settings1', 'description':'Settings 1'},
                {'url':'#/settings2', 'description':'Settings 2'}],
                'useradmin': [{'url':'#/logout', 'description':'Logout'}]};
    $scope.$on('$routeChangeSuccess', function() {
      $scope.pageTitle = $location.path();
    });


  }])
/*.controller('GridSettings', ['$scope', '$modal', function($scope, $modal) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
  }])
.controller('txiController', ['$scope', function($scope) {
    $scope.persons = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.columnDefs= [{field: 'name', displayName: 'Name'}, {field:'age', displayName:'Age'}];
    $scope.gridOptions = {
      showColumnMenu : true,
      showGroupPanel : true
    };
}])*/;


