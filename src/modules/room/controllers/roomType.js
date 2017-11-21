define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomType', [
        '$scope',
        '$modal',
        '$appConfig',
        'NgTableParams',
        'app.services.ajaxService',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, $appConfig, NgTableParams, ajaxService, httpService, popupService) {
            var me = this;

            this.list = [];

            this.current = {};

            this.tableParams = new NgTableParams();

            this.select = function (row) {
                ajaxService
                    .post('/roomtype/findRoomtypeHotel', {
                        rmtypeid: row.rmtypeid
                    })
                    .then(function (result) {
                        me.current = $.extend({}, result[0]);
                    });
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
                        var roomType = result[0];
                        roomType.Lines = roomType.roomtypeEquipmentVo;
                        $modal
                            .open({
                                templateUrl: 'views/room/manage/RoomTypeForm.html',
                                data: roomType
                            }).result
                            .then(function (data) {
                                var bean = {};
                                bean.rmtypeid = data.rmtypeid;
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