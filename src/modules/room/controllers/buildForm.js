define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.buildForm', [
        '$scope',
        'NgTableParams',
        'modules.setting.services.request',
        'app.services.httpService',
        function ($scope, NgTableParams, request, httpService) {
            var me = this;

            this.list = [];

            this.excludes = [];

            this.loadFloors = function (buildId) {
                httpService
                    .post('/buildinghotel/selectFloorHotelList', {
                        buildingId: buildId
                    })
                    .then(function (result) {
                        me.list = result;
                    });
            };

            this.floors = function (n) {
                var arr = [];
                for (var i = 1; i <= n; i++) {
                    arr.push(i);
                }
                return arr;
            };

            this.floorChange = function (num) {
                if (me.excludes.indexOf(num) >= 0) {

                }
            };
        }
    ]);
});