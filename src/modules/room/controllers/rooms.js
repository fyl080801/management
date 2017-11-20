define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.rooms', [
        '$scope',
        '$modal',
        'modules.manageui.factories.tableParameter',
        'modules.setting.services.request',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, tableParameter, request, httpService, popupService) {
            var me = this;

            $scope.current = null;

            this.floorParams = {
                buildingId: null
            };

            this.tableParams = new tableParameter({
                url: '/roomhotel/findRoomHotel',
                data: me.floorParams
            });

            this.select = function (build) {
                $scope.current = build;
                me.floorParams.buildingId = build.buildingId;
                me.tableParams.reload();
            };

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/RoomForm.html',
                        data: {}
                    }).result
                    .then(function (data) {

                    });
            };

            this.addRange = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/RoomRange.html',
                        data: {
                            NumberStart: 1,
                            NumberEnd: 50
                        }
                    }).result
                    .then(function (data) {

                    });
            };

            this.reset = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/rcu/Reset.html'
                    });
            };
        }
    ]);
});