define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.state', [
        '$scope',
        '$modal',
        '$q',
        'modules.setting.services.request',
        'modules.room.factories.stateAdapter',
        'app.services.httpService',
        'app.services.popupService',
        function ($scope, $modal, $q, request, stateAdapter, httpService, popupService) {

            function toDoReceive(data) {
                var defer = $q.defer();
                stateAdapter
                    .connect('/h5ws')
                    .onopened(function () {
                        stateAdapter.send({
                            code: 1,
                            data: data
                        });
                    })
                    .onreceived(function (result) {
                        var jsonResult = JSON.parse(result);
                        if (jsonResult)
                            defer.resolve(jsonResult.data);
                    })
                    .onerror(function () {
                        popupService.error('房间状态服务异常');
                    });
                return defer.promise;
            }

            var me = this;

            this.rooms = [];

            this.openControl = function (id) {
                $modal
                    .open({
                        templateUrl: 'views/room/RoomControl.html',
                        size: 'lg'
                    });
            };

            this.load = function () {
                httpService
                    .post('/buildinghotel/findBuildingHotel')
                    .then(function (result) {
                        $scope.$globalStore.builds = result;
                    });
            };

            this.showComment = function (roomId) {
                $modal
                    .open({
                        templateUrl: 'views/room/Comment.html'
                    });
            };

            this.selectFloor = function (num) {
                var selectIndex = $scope.selectedFloors.indexOf(num);
                if (selectIndex >= 0) {
                    $scope.selectedFloors.splice(selectIndex, 1);
                } else {
                    $scope.selectedFloors.push(num);
                }
            };

            $scope.current = null;

            $scope.selectedFloors = [];

            var buildWatched = $scope.$watch(function () {
                return $scope.current;
            }, function (newValue) {
                if ($scope.current) {
                    toDoReceive({
                            buildingId: $scope.current.buildingId,
                            floors: $scope.selectedFloors
                        })
                        .then(function (result) {
                            me.rooms = result;
                        });
                }
                $scope.selectedFloors = [];
                me.rooms = [];
            });

            var floorWatched = $scope.$watch(function () {
                return $scope.selectedFloors.length;
            }, function (newValue) {
                if ($scope.current && newValue > 0) { // 已选择楼层
                    toDoReceive({
                            buildingId: $scope.current.buildingId,
                            floors: $scope.selectedFloors
                        })
                        .then(function (result) {
                            me.rooms = result;
                        });
                } else if (!$scope.current) {
                    toDoReceive({})
                        .then(function (result) {
                            me.rooms = result;
                        });
                }
                me.rooms = [];
            });

            $scope.$on('$destroy', function () {
                stateAdapter.close();
                if (buildWatched) buildWatched();
                if (floorWatched) floorWatched();
            });
        }
    ]);
});