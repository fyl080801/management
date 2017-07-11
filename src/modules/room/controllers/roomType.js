define('modules.room.controllers.roomType', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomType', [
        '$scope',
        '$modal',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, NgTableParams, request, httpService, popupService) {
            var me = this;

            this.list = []

            this.current = {};

            this.tableParams = new NgTableParams();

            this.select = function (row) {
                me.current = $.extend({}, row);
            };

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/RoomTypeForm.html'
                    }).result
                    .then(function () {

                    });
            };

            this.edit = function (id) {

            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        me.current = {};
                    });
            };

            httpService
                .get(request.房间类型列表)
                .then(function (result) {
                    me.list = result.Data;
                });
        }
    ]);
});