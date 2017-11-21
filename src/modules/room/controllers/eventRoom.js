define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.eventRoom', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        function ($scope, tableParameter, httpService) {
            var me = this;

            this.roomQueries = {
                warntype: null, //事件类型
                warnStartTime: null,
                warnEndTime: null,
                buildingName: null //楼栋名称
            };

            this.list = [];

            this.tableParams = new tableParameter({
                url: '/warning/findWarningList',
                data: me.roomQueries
            });

            this.queryRoomEvent = function () {

            };

            // this.loadRoomEvent = function () {
            //     var query = $.extend({
            //         page: {
            //             page: 0,
            //             rows: 10
            //         }
            //     }, me.roomQueries);
            //     httpService
            //         .post('/warning/findWarningList', query)
            //         .then(function (result) {
            //             me.list = result.resultlst;
            //         });
            // };

            httpService
                .post('/buildinghotel/findBuildingHotel', {})
                .then(function (result) {
                    $scope.$globalStore.builds = result;
                });
        }
    ]);
});