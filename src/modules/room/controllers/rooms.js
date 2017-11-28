define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.rooms', [
        '$scope',
        '$modal',
        'modules.manageui.factories.tableParameter',
        'app.services.httpService',
        'app.services.ajaxService',
        'app.services.popupService',
        function ($scope, $modal, tableParameter, httpService, ajaxService, popupService) {
            var me = this;

            $scope.$controller = this;

            $scope.current = null;

            $scope.builds = [];

            this.floorParams = {
                floorid: null
            };

            this.tableParams = new tableParameter({
                url: '/roomhotel/findRoomHotel',
                data: me.floorParams
            });

            this.select = function (floor) {
                $scope.current = floor;
                me.floorParams.floorid = floor.id;
                me.tableParams.reload();
            };

            this.add = function () {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/RoomForm.html',
                        data: {
                            floorid: $scope.current.id,
                            buildingName: $scope.current.buildingName,
                            floorname: $scope.current.floorname
                        }
                    }).result
                    .then(function (data) {
                        delete data.buildingName;
                        httpService
                            .post('/roomhotel/addRoomHotel', data)
                            .then(function (result) {
                                me.tableParams.reload();
                            });
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

            this.edit = function (room) {
                $modal
                    .open({
                        templateUrl: 'views/room/manage/RoomForm.html',
                        data: $.extend({}, room)
                    }).result
                    .then(function (data) {
                        delete data.buildingName;
                        httpService
                            .post('/roomhotel/modifyRoomHotel', data)
                            .then(function (result) {
                                me.tableParams.reload();
                            });
                    });
            };

            this.drop = function (id) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        ajaxService
                            .post('/roomhotel/delRoomHotel', {
                                id: id
                            })
                            .then(function () {
                                me.tableParams.reload();
                            });
                    });
            };

            this.load = function () {
                $scope.builds = [];
                httpService
                    .post('/floor/allfloor', {})
                    .then(function (result) {
                        $.each(result, function (idx, item) {
                            var addedbuild = $.grep($scope.builds, function (value) {
                                return value.buildingId === item.buildingId;
                            });
                            if (addedbuild.length > 0) {
                                addedbuild[0].floors.push(item);
                            } else {
                                $scope.builds.push({
                                    buildingId: item.buildingId,
                                    buildingName: item.buildingName,
                                    floors: [item]
                                });
                            }
                        });
                    });
            }
        }
    ]);
});