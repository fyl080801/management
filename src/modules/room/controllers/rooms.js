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
            $scope.current = {};

            this.tableParams = new tableParameter({});

            this.select = function (build, floor) {
                $scope.current.BuildId = build.buildingId;
                $scope.current.BuildName = build.buildingName;
                $scope.current.Floor = floor;
                httpService
                    .post('/roomhotel/findRoomHotel', {
                        floorid: build.buildingId
                    })
                    .then(function (result) {

                    });
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