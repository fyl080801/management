define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.eventRoom', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'modules.setting.services.request',
        'app.services.httpService',
        function ($scope, tableParameter, request, httpService) {
            var me = this;

            this.roomQueries = {
                warntype: '', //事件类型
                warnStartTime: '',
                warnEndTime: '',
                buildingName: '' //楼栋名称
            };

            this.list = [];

            this.tableParams = new tableParameter({});

            this.queryRoomEvent = function () {

            };

            this.loadRoomEvent = function () {
                httpService
                    .post('/warning/findWarningList', me.roomQueries)
                    .then(function (result) {
                        me.list = result;
                    });
            };

            httpService
                .post('/buildinghotel/findBuildingHotel', {})
                .then(function (result) {
                    $scope.$globalStore.builds = result;
                });
        }
    ]);
});