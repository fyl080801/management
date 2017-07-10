define('modules.room.controllers.roles', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roles', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, NgTableParams, request, httpService, popupService) {
            var me = this;

            this.tableParams = new NgTableParams();

            this.list = [];

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/RoleForm.html'
                    }).result
                    .then(function (result) {

                    });
            };

            this.edit = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/RoleForm.html'
                    }).result
                    .then(function (result) {

                    })
            };

            this.authorize = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/personal/Authorize.html'
                    });
            };

            this.delete = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {

                    });
            };

            httpService
                .get(request.人员类别列表)
                .then(function (result) {
                    me.list = result;
                });
        }
    ]);
});