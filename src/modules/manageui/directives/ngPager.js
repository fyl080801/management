define('modules.manageui.directives.ngPager', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('ngPager', [
        function () {
            return {
                scope: {
                    ngPager: '='
                },
                replace: true,
                template: '<div class="container-fluid"> <div class="ng-table-counts pagination btn-group pull-right"> <button ng-repeat="count in ngPager.settings().counts" type="button" ng-class="{\'active\':ngPager.count()==count}" ng-click="ngPager.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="ngPager.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="ngPager.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="ngPager.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="ngPager.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="ngPager.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="ngPager.page(page.number)" href="">&raquo;</a> </li> </ul> </div>',
                controller: ['$scope', 'ngTableEventsChannel', function ($scope, ngTableEventsChannel) {
                    ngTableEventsChannel.onAfterReloadData(function (pubParams) {
                        $scope.pages = $scope.ngPager.generatePagesArray();
                    });
                }]
            };
        }
    ]);
});