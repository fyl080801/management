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
                $scope.current.BuildId = build.Id;
                $scope.current.BuildName = build.BuildName;
                $scope.current.Floor = floor;
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