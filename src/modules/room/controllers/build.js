define('modules.room.controllers.build', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.build', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, $modal, NgTableParams, request, popupService, httpService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/BuildForm.html',
                        data: {}
                    }).result
                    .then(function (data) {

                    });
            };

            this.edit = function (id) {
                httpService
                    .get(request.楼栋明细 + '?id=' + id)
                    .then(function (result) {
                        $modal
                            .open({
                                templateUrl: 'views/room/manage/BuildForm.html',
                                data: result
                            }).result
                            .then(function (data) {

                            });
                    });
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {

                    });
            };

            httpService
                .get(request.楼栋列表)
                .then(function (result) {
                    $scope.$globalStore.builds = result.Data;
                });
        }
    ]);
});