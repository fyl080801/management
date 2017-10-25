define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomType', [
        '$scope',
        '$modal',
        '$appConfig',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.ajaxService',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, $appConfig, NgTableParams, request, ajaxService, httpService, popupService) {
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
                    .then(function (data) {
                        var bean = {};
                        bean.rmtypename = data.rmtypename;
                        bean.roomtypeEquipmentVo = data.Lines;
                        ajaxService
                            .json('/roomtype/addRoomType', JSON.stringify(bean))
                            .then(function (result) {
                                me.load();
                            });
                    });
            };

            this.edit = function (id) {
                ajaxService
                    .post('/roomtype/findRoomtypeHotel', {
                        rmtypeid: id
                    })
                    .then(function (result) {
                        $modal
                            .open({
                                templateUrl: 'views/room/manage/RoomTypeForm.html',
                                data: result[0]
                            }).result
                            .then(function (data) {
                                var bean = {};
                                bean.rmtypename = data.rmtypename;
                                bean.roomtypeEquipmentVo = data.Lines;
                                ajaxService
                                    .json('/roomtype/modifyRoomTypeHotel', JSON.stringify(bean))
                                    .then(function (result) {
                                        me.load();
                                    });
                            });
                    });
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        me.current = {};
                        ajaxService
                            .post('/roomtype/delRoomTypeHotel', {
                                id: id
                            })
                            .then(function () {
                                me.load();
                            });
                    });
            };

            this.load = function () {
                ajaxService
                    .post('/roomtype/findRoomtypeHotels', {})
                    .then(function (result) {
                        me.list = result;
                    });
            };

            this.load();
        }
    ]);
});