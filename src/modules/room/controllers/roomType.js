define([
    'modules/room/module'
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

            this.list = [];

            this.current = {};

            this.tableParams = new NgTableParams();

            this.select = function (row) {
                me.current = $.extend({}, row);
            };

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/RoomTypeForm.html',
                        data: {
                            Lines: []
                        }
                    }).result
                    .then(function () {

                    });
            };

            this.edit = function (id) {
                httpService
                    .get(request.房间类型)
                    .then(function (result) {
                        $modal
                            .open({
                                templateUrl: 'views/room/manage/RoomTypeForm.html',
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